// import { Public } from 'src/decorator/public.decorator';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterDto } from './dto/register-user.dto';
import { UserdocService } from './userdoc.service';

import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class UserdocController {
  constructor(private readonly authService: UserdocService) {}

  @Post('register')
//   @Public()
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
//   @Public()
  async login(@Body() loginDto: LoginUserDto) {
    return this.authService.login(loginDto);
  }
}
