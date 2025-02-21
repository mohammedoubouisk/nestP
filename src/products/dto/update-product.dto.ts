// // update-product.dto.ts
// import { IsString, IsNumber, IsOptional,Min } from 'class-validator';

// export class UpdateProductDto {
//     @IsOptional()  // This makes the field optional
//     @IsString()
//     title?: string;

//     @IsString()
//     @IsOptional()
//     description:string;

//     @IsOptional()
//     @Min(0,{message:"price should not be less then zero"})
//     @IsNumber()
//     price?: number;
// }