// import { Module } from '@nestjs/common';
// import { UsersController } from './users.controller';
// import { UsersService } from './users.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserEntitis } from './users.entity';
// import { JwtModule } from '@nestjs/jwt';
// import { ConfigService } from '@nestjs/config';
// import { config } from 'process';


// @Module({
//   controllers: [UsersController],
//   providers: [UsersService],
//   exports:[UsersService],
//   imports:[
//     TypeOrmModule.forFeature([UserEntitis]),
//     JwtModule.registerAsync({
//       inject:[ConfigService],
//       useFactory:(config: ConfigService)=>{
//         return {
//           global:true,
//           secret: config.get<string>("JWT_SECRET"),
//           signOptions:{expiresIn:config.get<string>("JWT_EXPIRES_IN")}
//         }
//       }
//     })
//   ]
// })
// export class UsersModule {}
