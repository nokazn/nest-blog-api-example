import { Controller, UseGuards, Post, Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { TODO } from 'types';
import { UserDto } from '../users/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: TODO): Promise<{ user: TODO; token: string }> {
    const user = await this.authService.login(req.user);
    return user;
  }

  @Post('signup')
  async signUp(@Body() user: UserDto): Promise<{ user: TODO; token: string }> {
    const createdUser = await this.authService.create(user);
    return createdUser;
  }
}
