import { Provider } from '@nestjs/common';

import { User } from './user.entity';
import { USER_REPOSITORY } from '../../core/constants';

export const usersProvider: Provider[] = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
];
