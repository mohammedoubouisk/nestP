import { IsString, IsDateString, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class EmployeDto {
  @IsString()
  matricule: string;

  @IsString()
  nom: string;

  @IsString()
  prenom: string;

  @IsString()
  fonction: string;
}

export class CreateFluxRetourDto {
  @IsString()
  archive_id: string;

  @IsDateString()
  date_retoure: string;

  @IsObject()
  @ValidateNested()
  @Type(() => EmployeDto)
  employe: EmployeDto;
}