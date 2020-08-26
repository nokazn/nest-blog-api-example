import { Module } from '@nestjs/common';
import { usersProvider } from './users.provider';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService, ...usersProvider],
  exports: [UsersService],
})
export class UsersModule {}
