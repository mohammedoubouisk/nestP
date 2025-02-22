

// import { AuditLog } from './logs.entity';
// import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { JwtStrategy } from '../userdoc/strategy/jwtstrategy.strategy';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserEntit } from 'src/userdoc/userdoc.entity';
// import { AuditMiddleware } from './middlware/logs.middleware';
// import { LogsService } from './logs.service';
// import { AuditController } from './logs.controller';



// @Module({
//   imports: [
//     TypeOrmModule.forFeature([UserEntit, AuditLog]), // Include entities here
//     PassportModule.register({ defaultStrategy: 'jwt' }),
//     JwtModule.registerAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: (configService: ConfigService) => ({
//         secret: configService.get<string>('JWT_SECRET') || 'ghghghghg31313eeeerrrrr424242rr3333trtrtrtrtrtr',
//         signOptions: {
//           expiresIn: configService.get<string>('JWT_EXPIRATION') || '1d',
//         },
//       }),
//     }),
//   ],
//   providers: [
//     JwtStrategy,
//     LogsService,
//     {
//       provide: 'LOGS_SERVICE', // Define a custom token
//       useFactory: (logsService: LogsService) => logsService, // Inject LogsService
//       inject: [LogsService], // Specify the dependency
//     },
//   ],
//   controllers: [AuditController],
//   exports: [JwtModule, PassportModule, LogsService], // Export LogsService for other modules
// })
// export class LogsModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(AuditMiddleware).forRoutes('archive'); // Apply middleware to /archive routes
//   }
// }

import { AuditLog } from './logs.entity';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from '../userdoc/strategy/jwtstrategy.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntit } from 'src/userdoc/userdoc.entity';
import { AuditMiddleware } from './middlware/logs.middleware';
import { LogsService } from './logs.service';
import { AuditController } from './logs.controller';
import { UserdocModule } from 'src/userdoc/userdoc.module';


@Module({
    imports: [
        ConfigModule.forRoot(),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
      imports: [ConfigModule,],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'ghghghghg31313eeeerrrrr424242rr3333trtrtrtrtrtr',
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION') || '1d',
        },
      }),
    }),
      TypeOrmModule.forFeature([AuditLog]),
      UserdocModule
    ],
    providers: [
        JwtStrategy,
        AuditMiddleware,
        LogsService
    ],
    controllers:[AuditController],
    exports: [
      AuditMiddleware,
      TypeOrmModule.forFeature([AuditLog]), // Export the repository too
      JwtModule, PassportModule
    ],
  })
  export class AuditModule {}


