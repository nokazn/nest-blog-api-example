import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { ValidatedUserDataValues } from './interfaces/auth.interfaces';

const { JWT_KEY } = process.env;
if (JWT_KEY == null) {
  const message = '環境変数が設定されていません。';
  console.error(message, process.env);
  throw new Error(message);
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_KEY,
    });
  }

  /**
   * Bearer トークンをデコードしたものが jwtService.signAsync で生成したトークンと同じか検証する
   */
  async validate(
    payload: ValidatedUserDataValues,
  ): Promise<ValidatedUserDataValues> {
    const user = await this.userService.findOneByEmail(payload.email);
    if (user == null) {
      throw new UnauthorizedException(
        'You are note authorized to perform the operation.',
      );
    }

    return payload;
  }
}
