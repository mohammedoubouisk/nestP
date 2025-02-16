import { UpdateDto } from './dto/update-user.dto';


import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntit } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt'
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadType, AcessTokenType } from 'src/utils/types';
import { ConfigService } from '@nestjs/config';
import { UserType } from 'src/utils/enum';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntit)
        private readonly userRepository : Repository<UserEntit>,
        private readonly jwtService: JwtService,
        private readonly config : ConfigService
    ){}
    
    public GetAllUsers() :Promise<UserEntit[]>{
        return this.userRepository.find()   
    }

    public async register(registerDto:RegisterDto): Promise<AcessTokenType>{
        const {username, email, password} = registerDto;
        const usercheck = await this.userRepository.findOne({where:{email}})
         
        if(usercheck)
            throw new BadRequestException('this email already existe')

        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password, salt)
        let newUser = this.userRepository.create({
            username,
            email,
            password:hashedpassword
        })

        newUser = await this.userRepository.save(newUser) //we save the nesuer first 

       const accessToken = await this.generateJWT( {id: newUser.id , userType: newUser.userType})

       return {accessToken}
        
    }

    
    public async CurrentUser(id:number){
        const user = await this.userRepository.findOne({where:{id}})
        if(!user)
            throw new NotFoundException("not found user ")
        return user
    }


    async deleteUser(id: number, payload: JwtPayloadType): Promise<{ message: string }> {
        const user = await this.userRepository.findOne({ where: { id } });
        
        if (!user) {
          throw new NotFoundException('User not found');
        }
    
        // Check if user has permission to delete
        // Adding null checks for payload and its properties
        if (!payload || typeof payload.id === 'undefined') {
          throw new ForbiddenException('Invalid authentication payload');
        }
    
        const canDelete = 
          (payload.id && user.id === payload.id) || 
          (payload.userType && payload.userType === UserType.ADMIN);
        
        if (!canDelete) {
          throw new ForbiddenException('Insufficient permissions to delete this user');
        }
    
        await this.userRepository.remove(user);
        return { message: 'User deleted successfully' };
      }
    



    // public async UpdateUser(updateDto: UpdateDto){
    //     const {username, password} = updateDto


    // }


    
    



    public async login(logindto:LoginDto):Promise<AcessTokenType>{
        const {password, email} = logindto;
        const user = await this.userRepository.findOne({where:{email}})
        if(!user)
            throw new BadRequestException("user nto fond")
        
        const passMatch = await bcrypt.compare(password, user.password)
        if(!passMatch)
            throw new BadRequestException('email or password wrong')

        const accessToken = await this.generateJWT( {id: user.id , userType: user.userType})

        return {accessToken}

    }

    private generateJWT(payload: JwtPayloadType): Promise<string>{
        return this.jwtService.signAsync(payload)
    }


}
