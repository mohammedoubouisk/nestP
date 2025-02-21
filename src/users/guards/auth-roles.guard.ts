// import { UsersService } from 'src/users/users.service';
// import { JwtPayloadType } from 'src/utils/types';
// import { JwtService } from '@nestjs/jwt';
// import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
// import { Request } from "express";
// import { ConfigService } from '@nestjs/config';
// import { CURRENT_USER_KEY } from 'src/utils/constants';
// import { Reflector } from '@nestjs/core';
// import { roles } from '../decorators/user-role.decorator';



// @Injectable()
// export class AuthRoleGuard implements CanActivate {
//     constructor(
//         private readonly jwtService:JwtService,
//         private readonly configservice:ConfigService,
//         private readonly reflector: Reflector,
//         private  usersService : UsersService
//     ){}
//     async canActivate(context: ExecutionContext){

//         // this just to get typeUser from controller loke out put return rolesG="admin"
//         const rolesG = this.reflector.getAllAndOverride('roles',[context.getHandler(), context.getClass()])


//         if(!rolesG || rolesG.length === 0) return false
 
//         const request:Request = context.switchToHttp().getRequest(); 
//         const [type, token] = request.headers.authorization?.split(" ") ?? [];

//         if(token && type === "Bearer"){
//             try{
//                 const payload: JwtPayloadType = await this.jwtService.verifyAsync(
//                     token,
//                     {
//                         secret: this.configservice.get<string>("JWT_SECRET")
//                     }
//                 );

//                 const user = await this.usersService.CurrentUser(payload.id)

//                 // console.log(user)

//                 if(!user) return false
//                 if(rolesG.includes(user.userType)){  // include check the rolesG if it on the array   array = [user]
//                     return true
//                 }

//                 request[CURRENT_USER_KEY] = payload 
                
                
              
//             }
//             catch(error){
//                 throw new UnauthorizedException("access denied, invalide token")
//             }
//         }
//         else{
//             return false
//         }

//         return false; 
//     }
// }

