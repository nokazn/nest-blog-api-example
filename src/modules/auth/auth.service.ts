import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { UserDto, LoginUserDto } from '../users/dto/user.dto';
import {
  ValidatedUserDataValues,
  LoginUserDataValues,
  UserDataValues,
} from './interfaces/auth.interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * localStrategy から呼び出す
   * 返り値は req.user に入れられる
   */
  async validateUser(
    email: string,
    password: string,
  ): Promise<ValidatedUserDataValues | null> {
    const user = await this.userService.findOneByEmail(email);
    if (user == null) return null;

    const isMatched = await this.comparePassword(password, user.password);
    if (!isMatched) return null;

    const { id, name, gender } = user;
    return {
      id,
      email,
      name,
      gender,
    };
  }

  /**
   * validateUser で返した user でトークンを生成する
   */
  async login(
    incomingUser: LoginUserDto,
    user: ValidatedUserDataValues,
  ): Promise<{ user: LoginUserDataValues; token: string }> {
    if (incomingUser == null || user == null) {
      throw new UnauthorizedException('Invalid user credentials.');
    }

    const token = await this.generateToken(user);

    return {
      user,
      token,
    };
  }

  async create(
    user: UserDto,
  ): Promise<{ user: UserDataValues; token: string }> {
    // ハッシュ化したパスワード
    const password = await this.hashPassword(user.password);
    const createdUser = await this.userService.create({
      ...user,
      password,
    });

    const { id, name, email, gender, createdAt, updatedAt } = createdUser;
    const token = await this.generateToken({
      id,
      email,
      name,
      gender,
    });

    return {
      user: { id, name, email, gender, createdAt, updatedAt },
      token,
    };
  }

  /**
   * 送信されたパスワードとデータベース内のパスワードを比較
   */
  private async comparePassword(
    incomingPassword: string,
    dbPassword: string,
  ): Promise<boolean> {
    const isMatched = await bcrypt.compare(incomingPassword, dbPassword);
    return isMatched;
  }

  /**
   * 与えられたオブジェクトから JWT トークンを生成
   */
  private async generateToken(user: ValidatedUserDataValues): Promise<string> {
    const token = await this.jwtService.signAsync(user);
    return token;
  }

  /**
   * パスワードをハッシュ化
   */
  private async hashPassword(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }
}
