import { Inject, Injectable } from '@nestjs/common';
import { User } from '../users/user.entity';

import { POST_REPOSITORY } from '../../core/constants';
import { PostDto } from './dto/post.dto';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @Inject(POST_REPOSITORY) private readonly postRepository: typeof Post,
  ) {}

  async create(post: PostDto, userId: number): Promise<Post> {
    const createdPost = await this.postRepository.create<Post>({
      ...post,
      userId,
    });
    return createdPost;
  }

  async findAll(): Promise<Post[]> {
    const posts = await this.postRepository.findAll<Post>({
      include: [
        {
          model: User,
          attributes: { exclude: ['password'] },
        },
      ],
    });
    return posts;
  }

  async findOne(id: number): Promise<Post | null> {
    const post = await this.postRepository.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: { exclude: ['password'] },
        },
      ],
    });
    return post;
  }

  async delete(id: number, userId: number): Promise<number> {
    const post = await this.postRepository.destroy({
      where: { id, userId },
    });
    return post;
  }

  async update(
    id: number,
    data: Partial<PostDto>,
    userId: number,
  ): Promise<{
    numberOfUpdatedRows: number;
    post: Post;
  }> {
    const [numberOfUpdatedRows, [post]] = await this.postRepository.update(
      data,
      {
        where: { id, userId },
        returning: true,
      },
    );
    return { numberOfUpdatedRows, post };
  }
}
