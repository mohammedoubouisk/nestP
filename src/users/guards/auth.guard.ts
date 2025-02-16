import { JwtPayloadType } from 'src/utils/types';
import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { ConfigService } from '@nestjs/config';
import { CURRENT_USER_KEY } from 'src/utils/constants';



@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService:JwtService,
        private readonly configservice:ConfigService
    ){}
    async canActivate(context: ExecutionContext){
        const request:Request = context.switchToHttp().getRequest();
        const [type, token] = request.headers.authorization?.split(" ") ?? [];

        if(token && type === "Bearer"){
            try{
                const payload: JwtPayloadType = await this.jwtService.verifyAsync(
                    token,
                    {
                        secret: this.configservice.get<string>("JWT_SECRET")
                    }
                );

                request[CURRENT_USER_KEY] = payload
              
            }
            catch(error){
                throw new UnauthorizedException("access denied, invalide token")
            }
        }
        else{
            return false
        }

        return true; 
    }
}

