import { IsString, IsDateString } from 'class-validator';

export class CreateFluxSortantDto {
  @IsString()
  archive_id: string;

  @IsDateString()
  date_sortie: string;

  @IsString()
  site_destination: string;
}