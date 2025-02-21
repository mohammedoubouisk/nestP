import { UserEntit } from 'src/userdoc/userdoc.entity';
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserdocService {
  constructor(
    @InjectRepository(UserEntit)
    private usersRepository: Repository<UserEntit>,
    private jwtService: JwtService,
  ) {}

  async register(
    registerDto: RegisterDto,
  ): Promise<{ user: Partial<UserEntit>; token: string }> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Create new user
    const newUser = this.usersRepository.create({
      ...registerDto,
      password: hashedPassword,
    });

    await this.usersRepository.save(newUser);

    // Generate JWT token
    const token = this.generateToken(newUser);

    // Remove password from response
    const { password, ...result } = newUser;

    return {
      user: result,
      token,
    };
  }

  //start login
  async login(loginDto: LoginUserDto): Promise<{ user: Partial<UserEntit>; token: string }> {
    // Find user by email
    const user = await this.usersRepository.findOne({ 
      where: { email: loginDto.email } 
    });
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    // Generate JWT token
    const token = this.generateToken(user);
    
    // Remove password from response
    const { password, ...result } = user;
    
    return {
      user: result,
      token,
    };
  }

  //end login
  private generateToken(user: UserEntit): string {
    const payload = { 
      sub: user.id,
      email: user.email,
      username: user.username,
      userType: user.userType,
    };
    
    return this.jwtService.sign(payload);
  }
}
