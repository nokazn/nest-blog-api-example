import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [PostsModule],
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService],
})
export class AppModule {}
