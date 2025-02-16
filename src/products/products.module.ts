import { Module, Controller } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntit } from './products.entity';

@Module({
    controllers:[ProductsController],
    providers: [ProductsService],
    imports:[TypeOrmModule.forFeature([ProductEntit])]
})
export class ProductsModule {}
