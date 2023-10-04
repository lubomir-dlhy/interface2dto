import * as ts from "typescript";
import * as fs from "fs";
import { ApiPropertyOptions } from "@nestjs/swagger";
import { isObject, isArray } from "lodash";
import { Command } from "commander";

const imports = new Map<string, ts.ImportDeclaration>();

const importFromModule = (module: string, namedProperty: string) => {
  if (!imports.has(module)) {
    const importNestSwagger = ts.factory.createImportDeclaration(
      undefined,
      ts.factory.createImportClause(
        false,
        undefined,
        ts.factory.createNamedImports([
          ts.factory.createImportSpecifier(
            false,
            undefined,
            ts.factory.createIdentifier(namedProperty)
          ),
        ])
      ),
      ts.factory.createStringLiteral(module),
      undefined
    );
    imports.set(module, importNestSwagger);
  } else {
    const importDeclaration = imports.get(module);
    const namedBindings = importDeclaration.importClause.namedBindings;
    if (ts.isNamedImports(namedBindings)) {
      const importExists = namedBindings.elements.find(
        (item) => item.name?.escapedText === namedProperty
      );
      if (!importExists) {
        const updatedBindings = ts.factory.updateNamedImports(namedBindings, [
          ...namedBindings.elements,
          ts.factory.createImportSpecifier(
            false,
            undefined,
            ts.factory.createIdentifier(namedProperty)
          ),
        ]);
        const updatedImportClause = ts.factory.updateImportClause(
          importDeclaration.importClause,
          false,
          undefined,
          updatedBindings
        );
        const updatedImportDeclaration = ts.factory.updateImportDeclaration(
          importDeclaration,
          importDeclaration.modifiers,
          updatedImportClause,
          importDeclaration.moduleSpecifier,
          importDeclaration.assertClause
        );
        imports.set(module, updatedImportDeclaration);
      }
    }
  }
};

const createDecorator = (
  name: string,
  importModule?: string,
  args?: any[] | any
) => {
  const decorator = ts.factory.createDecorator(
    ts.factory.createCallExpression(
      ts.factory.createIdentifier(name),
      undefined,
      !!args && isArray(args)
        ? args.map((arg) => {
            if (isObject(arg)) {
              return ts.factory.createObjectLiteralExpression(
                Object.entries(arg).map(([key, value]) =>
                  ts.factory.createPropertyAssignment(
                    ts.factory.createIdentifier(key),
                    ts.factory.createIdentifier(String(value).valueOf())
                  )
                ),
                false
              );
            }
            return ts.factory.createIdentifier(arg);
          })
        : undefined
    )
  );
  if (importModule) {
    importFromModule(importModule, name);
  }
  return decorator;
};

const addClassValidatorDecorator = (name: string, args?: any[] | any) => {
  return createDecorator(name, "class-validator", args);
};

const processType = (
  node: ts.TypeNode,
  apiPropertyOpts: ApiPropertyOptions,
  decorators: ts.Decorator[],
  arrayItemType: boolean = false
) => {
  switch (node.kind) {
    case ts.SyntaxKind.StringKeyword:
      decorators.push(
        addClassValidatorDecorator(
          "IsString",
          arrayItemType && [{ each: true }]
        )
      );
      if (arrayItemType) {
        apiPropertyOpts.type = String.name;
      }
      break;
    case ts.SyntaxKind.NumberKeyword:
      decorators.push(
        addClassValidatorDecorator(
          "IsNumber",
          arrayItemType ?? [undefined, { each: true }]
        )
      );
      if (arrayItemType) {
        apiPropertyOpts.type = Number.name;
      }
      break;
    case ts.SyntaxKind.BooleanKeyword:
      decorators.push(
        addClassValidatorDecorator(
          "IsBoolean",
          arrayItemType && [{ each: true }]
        )
      );
      if (arrayItemType) {
        apiPropertyOpts.type = Boolean.name;
      }
      break;
    case ts.SyntaxKind.UnionType:
      const unionNode = node as ts.UnionTypeNode;
      const nullableType = unionNode.types.find(
        (type) =>
          type.kind === ts.SyntaxKind.NullKeyword ||
          (ts.isLiteralTypeNode(type) &&
            type.literal.kind === ts.SyntaxKind.NullKeyword)
      );
      const remainingTypes = unionNode.types.filter(
        (item) => item !== nullableType
      );
      if (remainingTypes.length === 1 && nullableType) {
        apiPropertyOpts.nullable = true;
      }
      break;
    case ts.SyntaxKind.TypeReference:
      const typeRefNode = node as ts.TypeReferenceNode;
      const typeName = typeRefNode.typeName["escapedText"];
      const typeArgs = typeRefNode.typeArguments;
      if (typeName === "Array" && typeArgs.length === 1) {
        // Array
        decorators.push(addClassValidatorDecorator("IsArray"));
        processType(typeArgs[0], apiPropertyOpts, decorators, true);
        apiPropertyOpts.isArray = true;
      } else if (typeName.startsWith("E")) {
        // Enum
        decorators.push(
          addClassValidatorDecorator(
            "IsEnum",
            arrayItemType && [typeName, { each: true }]
          )
        );
        apiPropertyOpts.enum = typeName;
      } else {
        throw new Error(`TODO: Unknown type ${ts.SyntaxKind[node.kind]}`);
      }
      break;
    default:
      throw new Error(`TODO: Unknown type ${ts.SyntaxKind[node.kind]}`);
  }
};

const transform: ts.TransformerFactory<ts.SourceFile> = (context) => {
  return (file) => {
    const n = ts.visitEachChild(file, visit, context);
    const uf = ts.factory.updateSourceFile(n, [
      ...Array.from(imports.values()),
      ...n.statements,
    ]);
    return uf;
    function visit(node: ts.Node): ts.VisitResult<ts.Node> {
      switch (node.kind) {
        case ts.SyntaxKind.InterfaceDeclaration:
          return visitFunction(node as ts.InterfaceDeclaration, file);
        default:
          return ts.visitEachChild(node, visit, context);
      }
    }
  };
  function visitFunction(node: ts.InterfaceDeclaration, file: ts.SourceFile) {
    const className = node.name.escapedText.toString();
    const members: ts.PropertyDeclaration[] = node.members.map((member) => {
      const isOptional = member["questionToken"];
      const modifiers = member["modifiers"] || [];
      const type = member["type"];

      const publicModifier = ts.factory.createModifier(
        ts.SyntaxKind.PublicKeyword
      );

      const validatorDecorators: ts.Decorator[] = [];
      let apiDecorator;
      if (isOptional) {
        apiDecorator = "ApiPropertyOptional";
        validatorDecorators.push(addClassValidatorDecorator("IsOptional"));
      } else {
        apiDecorator = "ApiProperty";
      }

      const apiPropertyOpts: ApiPropertyOptions = {};

      let comment = undefined;
      try {
        processType(type, apiPropertyOpts, validatorDecorators);
      } catch (error) {
        comment = error.message;
      }

      const decorator = createDecorator(
        apiDecorator,
        "@nestjs/swagger",
        apiPropertyOpts
      );

      const newProperty = ts.factory.createPropertyDeclaration(
        [decorator, ...validatorDecorators, publicModifier, ...modifiers],
        member["name"]["escapedText"],
        member["questionToken"],
        type,
        undefined
      );
      if (comment) {
        ts.addSyntheticLeadingComment(
          newProperty,
          ts.SyntaxKind.SingleLineCommentTrivia,
          comment,
          true
        );
      }
      return newProperty;
    });
    return ts.factory.createClassDeclaration(
      [ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
      className,
      [],
      [],
      members.flatMap((member) => {
        return [member, ts.factory.createIdentifier("\n") as any];
      })
    );
  }
};

const main = (filePath: string, outputPath: string) => {
  const printer = ts.createPrinter();

  const fileOutputName = `${filePath.split(".ts")[0]}.transform.ts`;
  const fileContent = fs.readFileSync(filePath);

  const sourceFile = ts.createSourceFile(
    filePath,
    fileContent.toString(),
    ts.ScriptTarget.ESNext,
    true
  );
  const transformerFactory: ts.TransformerFactory<ts.SourceFile> = transform;

  // transform the source file
  const transformationResult = ts.transform(sourceFile, [transformerFactory], {
    strict: true,
    noEmitOnError: true,
    target: ts.ScriptTarget.ESNext,
  });

  // log the diagnostics if they exist
  if (
    transformationResult.diagnostics &&
    transformationResult.diagnostics.length
  ) {
    console.log(transformationResult.diagnostics);
  }

  fs.writeFileSync(
    outputPath || fileOutputName,
    printer.printFile(transformationResult.transformed[0])
  );
};

const program = new Command();
program
  .description("Tool for converting interfaces to DTOs for @nestjs")
  .argument("<input-interface-file>")
  .argument("[output-path]")
  .action((input_file, output_path) => {
    if (!fs.existsSync(input_file)) {
      throw new Error(`File ${input_file} does not exist.`);
    }
    main(input_file, output_path);
  })
  .parse(process.argv);
