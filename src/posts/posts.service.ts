import { Injectable } from '@nestjs/common';
import { Post } from './interfaces/post.interface';

@Injectable()
export class PostsService {
  private readonly posts!: Post[];

  create(post: Post): void {
    this.posts.push(post);
  }

  findAll(): Post[] {
    return this.posts;
  }
}
