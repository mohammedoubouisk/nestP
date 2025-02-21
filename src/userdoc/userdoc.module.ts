import { UserEntit } from './userdoc.entity';
import { JwtStrategy } from './strategy/jwtstrategy.strategy';

import { UserdocController } from './userdoc.controller';
import { UserdocService } from './userdoc.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';



@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntit]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET') || 'twtwtwterererererfdfdf!!!!RERERFCCCSFAGA!@FF%33rwfwfdwdw',
          signOptions: {
            expiresIn: config.get<string>('JWT_EXPIRES') || '1d',
          },
        };
      },
    }),
    TypeOrmModule.forFeature([UserEntit]),
  ],
  controllers: [UserdocController],
  providers: [UserdocService, JwtStrategy],
  exports: [UserdocService, JwtStrategy, PassportModule,TypeOrmModule],
})
export class UserdocModule {}