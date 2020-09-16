import { Provider } from '@nestjs/common';
import { Post } from './post.entity';
import { POST_REPOSITORY } from '../../core/constants';

export const postProviders: Provider[] = [
  {
    provide: POST_REPOSITORY,
    useValue: Post,
  },
];
