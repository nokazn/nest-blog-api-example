import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { UserDto } from '../users/dto/user.dto';
import { TODO } from 'types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<UserDto, 'password'> | null> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) return null;

    const isMatched = await this.comparePassword(password, user.password);
    if (isMatched) return null;

    // @todo dataValues
    return {
      email,
      name: user.name,
      gender: user.gender,
    };
  }

  async login(user: TODO): Promise<{ user: TODO; token: string }> {
    const token = await this.generateToken(user);
    return {
      user,
      token,
    };
  }

  async create(user: UserDto): Promise<{ user: TODO; token: string }> {
    const password = await this.hashPassword(user.password);
    const newUser = await this.userService.create({
      ...user,
      password,
    });

    // @todo dataValues
    const { name, email, gender } = newUser;
    const newUserParams = { name, email, gender };
    const token = await this.generateToken(newUserParams);

    return {
      user: newUserParams,
      token,
    };
  }

  private async comparePassword(
    inputPassword: string,
    dbPassword: string,
  ): Promise<boolean> {
    const isMatched = await bcrypt.compare(inputPassword, dbPassword);
    return isMatched;
  }

  private async generateToken(user: TODO): Promise<string> {
    const token = await this.jwtService.signAsync(user);
    return token;
  }

  private async hashPassword(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }
}
