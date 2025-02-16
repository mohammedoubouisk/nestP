import { IsString, IsArray, IsDate, IsOptional, IsUUID, IsEnum, ValidateNested, IsUrl, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class LocationDto {
  @IsString()
  @IsNotEmpty()
  site: string;

  @IsString()
  @IsNotEmpty()
  locale: string;

  @IsString()
  @IsNotEmpty()
  armoires: string;

  @IsString()
  @IsNotEmpty()
  etageres: string;
}

export class MetadataDto {
  @IsString()
  @IsNotEmpty()
  auteur: string;

  @IsNotEmpty()
  duree_conservation_ans: number;
}

export class ClassificationDto {
  @IsString()
  @IsNotEmpty()
  serie: string;

  @IsString()
  @IsNotEmpty()
  dossier: string;

  @IsString()
  @IsNotEmpty()
  sous_dossier: string;

  @IsString()
  @IsNotEmpty()
  entite_source: string;
}


//this the parent 

export class CreateArchiveDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsString({ each: true })
  keywords: string[];

  @IsDate()
  date_created: Date;

  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;

  @IsOptional()
  @IsUrl()
  file_url?: string;

  @IsString()
  @IsNotEmpty()
  code_barre: string;

  @ValidateNested()
  @Type(() => MetadataDto)
  metadata: MetadataDto;

  @ValidateNested()
  @Type(() => ClassificationDto)
  classification: ClassificationDto;

  @IsEnum(['public', 'restreint', 'confidentiel'])
  access_restriction: 'public' | 'restreint' | 'confidentiel';
}