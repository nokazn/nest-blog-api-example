import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { DoesUserExist } from '../../core/guards/doseUserExist.guard';
import { UserDto, LoginUserDto } from '../users/dto/user.dto';
import {
  AuthenticatedRequest,
  LoginUserDataValues,
  UserDataValues,
} from './interfaces/auth.interfaces';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post('login')
  async login(
    @Body() user: LoginUserDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<{ user: LoginUserDataValues; token: string }> {
    return await this.authService.login(user, req.user);
  }

  @UseGuards(DoesUserExist)
  @Post('signup')
  async signUp(
    @Body() user: UserDto,
  ): Promise<{ user: UserDataValues; token: string }> {
    return await this.authService.create(user);
  }
}
