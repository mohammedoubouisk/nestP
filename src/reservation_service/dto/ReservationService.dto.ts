import { IsOptional, IsString, IsDateString } from 'class-validator';

export class ReservationQueryDto {
  @IsOptional()
  @IsString()
  utilisateur_id?: string;

  @IsOptional()
  @IsDateString()
  date_debut?: string;

  @IsOptional()
  @IsDateString()
  date_fin?: string;
}