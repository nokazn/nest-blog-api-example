import { Injectable, Inject } from '@nestjs/common';

import { USER_REPOSITORY } from 'src/core/constants';
import { User } from './users.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  private readonly userRepository: typeof User;

  constructor(@Inject(USER_REPOSITORY) userRepo: typeof User) {
    this.userRepository = userRepo;
  }

  async create(user: UserDto): Promise<User> {
    return await this.userRepository.create<User>(user);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne<User>({ where: { email } });
  }

  async findOneById(id: string): Promise<User | null> {
    return await this.userRepository.findOne<User>({ where: { id } });
  }
}
