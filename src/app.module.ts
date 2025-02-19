
import { Module } from '@nestjs/common';
import { ProductsController } from './products/products.controller';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ProductsService } from './products/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntit } from './products/products.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ReviewEntit } from './reviews/reviews.entity';
import { UserEntit } from './users/users.entity';
import { ArchiveModule } from './archive/archive.module';
import { ArchiveEntit } from './archive/archive.entity';

import { FluxSortantModule } from './flux/flux.module';
import { FluxSortantEntity } from './flux/flux.entity';

import { FluxEmpruntModule } from './flux_emprunt/flux_emprunt.module';
import { FluxEmpruntEntity } from './flux_emprunt/flux_emprunt.entity';
import { ReservationModule} from './reservation_service/reservation-service.module'
import { ReservationEntity } from './reservation_service/reservation-service.entity';
import { FluxRetourModule } from './flux_emprunt-entre/flux_emprunt-entre.module';
import { FluxRetourEntity } from './flux_emprunt-entre/flux_emprunt-entre.entity';

import { StatsModule } from './statistique-utilisateur/statistique-utilisateur.module';
   

@Module({
  imports: [
  ProductsModule,
  UsersModule,
  ReviewsModule,
  ArchiveModule,
  FluxSortantModule,
  FluxEmpruntModule,
  ReservationModule,
  FluxRetourModule,
  StatsModule,
  TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (config: ConfigService) => {
      return {
        type: 'mysql',
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE'),
        port: config.get<number>('DB_PORT'),
        host: 'localhost',
        synchronize: process.env.NODE_ENV !== 'production',
        entities: [ProductEntit, ReviewEntit, UserEntit, ArchiveEntit,FluxSortantEntity,FluxEmpruntEntity,ReservationEntity, FluxRetourEntity], 
        
      };
    },
  }),
  TypeOrmModule.forFeature([ProductEntit]),
  ConfigModule.forRoot({
    isGlobal:true,
    envFilePath:`.env.${process.env.NODE_ENV}`
 }),



 
],
  controllers: [ProductsController],
  providers:[ProductsService],
})
export class AppModule {}   