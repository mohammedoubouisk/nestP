
import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

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

import { UserEntit } from './userdoc/userdoc.entity';

import { StatsModule } from './statistique-utilisateur/statistique-utilisateur.module';
import { UserdocModule } from './userdoc/userdoc.module';

import { AuditModule } from './logs/logs.module';
import { ArchiveController } from './archive/archive.controller';
import { ArchiveService } from './archive/archive.service';
import { AuditLog } from './logs/logs.entity';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './AuthGuards/authguard.guard';
   

@Module({
  imports: [

  ArchiveModule,
  FluxSortantModule,
  FluxEmpruntModule,
  ReservationModule,
  FluxRetourModule,
  StatsModule,
  UserdocModule,
  AuditModule,
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
        entities: [ArchiveEntit,FluxSortantEntity,FluxEmpruntEntity,ReservationEntity, FluxRetourEntity,UserEntit,AuditLog], 
        
      };
    },
  }),
  ConfigModule.forRoot({
    isGlobal:true,
    envFilePath:`.env.${process.env.NODE_ENV}`
 }),
 
],
  controllers: [],
  providers:[
  //    {
  //   provide: APP_GUARD,
  //   useClass: JwtAuthGuard,
  // },
]
})
export class AppModule {}   