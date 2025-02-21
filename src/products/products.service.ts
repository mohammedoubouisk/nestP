
// import { BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
// import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';
// import { InjectRepository } from '@nestjs/typeorm';
// import { ProductEntit } from './products.entity';
// import { Repository } from 'typeorm';


// @Injectable()
// export class ProductsService {

//     constructor(
//         @InjectRepository(ProductEntit)
//         private readonly productRepository:Repository<ProductEntit>
//     ){}
    

//     public async AllProduct(){
//         return await this.productRepository.find()
      
//     }



//     public async CreateNewProd(dto:CreateProductDto){
//         const newProd = this.productRepository.create(dto)
//         return await this.productRepository.save(newProd)
//     }


//     public async SignleProd(ids:number){
//         const product = await this.productRepository.findOne({where:{id:ids}})
//         if(!product)
//             throw new BadRequestException('this prod not exist')
//         return product
//     }

//     public async UpdateProd(id:number , body:UpdateProductDto){
//         const prod = await this.productRepository.findOne({where:{id}})
//         if(!prod)
//             throw new NotFoundException(`this id ${id} not existe in database`)
        
//         await this.productRepository.update(id,body)

       
//         return await this.productRepository.findOne({where:{id}})
//     }

//     public async DeleteProd(id:number){
//         const  prod = await this.productRepository.findOne({where:{id}})
//         if(!prod)
//             throw new NotFoundException("this product  not existe")

//         await this.productRepository.delete(id)
//         return {message:`product with this id ${id} deleted with success`}
//     }
// }
