import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { postProviders } from './posts.providers';
import { PostsService } from './posts.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService, ...postProviders],
})
export class PostsModule {}
