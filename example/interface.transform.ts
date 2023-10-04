import { IsString, IsArray, IsOptional, IsNumber, IsBoolean } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
export class AdvertisementBaseDto {
    @ApiProperty()
    @IsString()
    public dtoName: string;
    
    @ApiProperty()
    @IsString()
    public id: string;
    
    @ApiProperty()
    @IsString()
    public origin: string;
    
    @ApiProperty()
    @IsString()
    public project: string;
    
    @ApiProperty({ type: String, isArray: true })
    @IsArray()
    @IsString({ each: true })
    public projects: string[];
    
    //TODO: Unknown type ObjectKeyword
    @ApiPropertyOptional()
    @IsOptional()
    @IsArray()
    public extra?: Array<object>;
    
    @ApiProperty()
    @IsNumber()
    public category: number;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    public state?: number;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    public businessState?: number;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    public createdAt?: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    public updatedAt?: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    public imageId?: string;
    
    @ApiPropertyOptional({ type: String, isArray: true })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    public imageIds?: Array<string>;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    public userId?: string;
    
    @ApiPropertyOptional({ type: String, isArray: true })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    public userIds?: Array<string>;
    
    @ApiProperty()
    @IsString()
    public locationId: string;
    
    @ApiPropertyOptional({ type: String, isArray: true })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    public locationIds?: Array<string>;
    
    //TODO: Unknown type ObjectKeyword
    @ApiPropertyOptional()
    @IsOptional()
    public geoPoint?: object;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    public parentId?: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    public unitPrice?: number;
    
    @ApiProperty()
    @IsNumber()
    public transaction: number;
    
    @ApiProperty()
    @IsString()
    public title: string;
    
    @ApiProperty()
    @IsString()
    public description: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    public price?: number;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    public internalNoteToPrice?: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    public internalNote?: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    public publishUp?: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    public availability?: number;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    public externalId?: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    public publishDown?: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    public top?: boolean;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    public topTo?: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    public highlight?: boolean;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    public highlightTo?: string;
    
    @ApiPropertyOptional({ type: String, isArray: true })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    public videoUrl?: Array<string>;
    
    @ApiPropertyOptional({ type: String, isArray: true })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    public fileIds?: Array<string>;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    public priceLocal?: number;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    public priceCurrent?: number;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    public unitPriceLocal?: number;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    public unitPriceCurrent?: number;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    public quantity?: number;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    public userSubjectType?: number;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    public sourceId?: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    public sourceType?: number;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    public photosCount?: number;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    public topFrom?: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    public highlightFrom?: string;
    
    @ApiPropertyOptional({ type: Number, isArray: true })
    @IsOptional()
    @IsArray()
    @IsNumber()
    public categoriesAll?: Array<number>;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    public updatedBy?: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    public street?: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    public sourceImportId?: string;
    
    @ApiPropertyOptional({ type: Number, isArray: true })
    @IsOptional()
    @IsArray()
    @IsNumber()
    public categoriesSecondary?: Array<number>;
    
    @ApiPropertyOptional({ type: Number, isArray: true })
    @IsOptional()
    @IsArray()
    @IsNumber()
    public validationState?: Array<number>;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    public clientCreatedAt?: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    public clientUpdatedAt?: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    public unitPriceFrom?: number;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    public unitPriceTo?: number;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    public sortPublish?: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    public sortTop?: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    public sortHighlight?: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    public finalPrice?: number;
    
    @ApiPropertyOptional({ type: Number, isArray: true })
    @IsOptional()
    @IsArray()
    @IsNumber()
    public tags?: Array<number>;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    public note?: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    public premium?: boolean;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    public premiumFrom?: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    public premiumTo?: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    public sortPremium?: string;
    
    @ApiPropertyOptional({ type: Number, isArray: true })
    @IsOptional()
    @IsArray()
    @IsNumber()
    public userSubjectTypes?: Array<number>;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    public scoreQuality?: number;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    public advertiserIsOwner?: boolean;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    public forSale?: number;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    public scoreQualityPercent?: number;
    
    @ApiPropertyOptional({ type: String, isArray: true })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    public wasPublished?: Array<string>;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    public finalPriceDate?: string;
    
    @ApiPropertyOptional({ type: String, isArray: true })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    public parentIds?: Array<string>;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    public colored?: boolean;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    public coloredFrom?: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    public coloredTo?: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    public sticker1?: boolean;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    public sticker1From?: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    public sticker1To?: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    public sticker2?: boolean;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    public sticker2From?: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    public sticker2To?: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    public redTop?: boolean;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    public redTopFrom?: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    public redTopTo?: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    public sortRedTop?: string;
    
}
