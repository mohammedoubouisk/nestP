// import { ProductsService } from './products.service';


// import { Controller, Get, Body, Post, HttpCode, HttpStatus, Param, Put, ParseIntPipe, Delete } from '@nestjs/common';
// import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';
// import { ConfigService } from '@nestjs/config';

// @Controller('api/products')
// export class ProductsController {
//     constructor(
//         private productsService: ProductsService
//     ) {}

//     @Get()
//     getAllProducts() {
//         return this.productsService.AllProduct();
//     }


//     @HttpCode(HttpStatus.OK)
//     @Post()
//     public CreateNewProd(@Body()
//     body:CreateProductDto){
//         return this.productsService.CreateNewProd(body)
        
//     }

//     @Get(':id')
//     public SignleProd(@Param("id",ParseIntPipe) id:number){
//        return this.productsService.SignleProd(id)
//     }
    
//     @Put(':id')
//     public UpdateData(@Param('id',ParseIntPipe) id:number, @Body() body:UpdateProductDto){
//         return this.productsService.UpdateProd(id,body)
//     }


//     @Delete(':id')
//     public DeleteProduct(@Param("id", ParseIntPipe) id:number){
//         return this.productsService.DeleteProd(id)
//     }
    

// }
