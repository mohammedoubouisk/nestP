import { UserEntit } from '../userdoc.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntit)
    private usersRepository: Repository<UserEntit>,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'twtwtwterererererfdfdf!!!!RERERFCCCSFAGA!@FF%33rwfwfdwdw',
    });
  }

  async validate(payload: any) {
    const user = await this.usersRepository.findOne({ 
      where: { id: payload.sub } 
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      userType: user.userType,
    };
  }
}