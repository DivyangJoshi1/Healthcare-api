import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'default-secret', // Ensure fallback
    });
  }

  async validate(payload: any) {
    console.log('JWT Payload:', payload); // Debugging
    return {
      sub: payload.sub,
      email: payload.email,
      username: payload.username, // ✅ Ensure it's mapped
      role: payload.role,
    };
  }
}
