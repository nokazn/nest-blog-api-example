import { Controller, Post, Body, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';
import { LocalGuard } from './guards/local.guard';
import {
  LoginUserDataValues,
  LoginUserDto,
  UserDataValues,
} from './interfaces/auth.interfaces';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post('login')
  async login(
    @Body() user: LoginUserDto,
  ): Promise<{ user: LoginUserDataValues; token: string }> {
    const loginedUser = await this.authService.login(user);
    return loginedUser;
  }

  @Post('signup')
  async signUp(
    @Body() user: UserDto,
  ): Promise<{ user: UserDataValues; token: string }> {
    const createdUser = await this.authService.create(user);
    return createdUser;
  }
}
