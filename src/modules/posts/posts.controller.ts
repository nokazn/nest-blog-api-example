import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { AuthenticatedRequest } from '../auth/interfaces/auth.interfaces';
import { PostDto, UpdatePostDto } from './dto/post.dto';

import { Post as PostEntity } from './post.entity';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get()
  async findAll(): Promise<PostEntity[]> {
    return await this.postService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<PostEntity> {
    const post = await this.postService.findOne(id);
    if (post == null) {
      throw new NotFoundException("This post doesn't exist.");
    }
    return post;
  }

  @UseGuards(JwtGuard)
  @Post()
  async create(
    @Body() post: PostDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<PostEntity> {
    return await this.postService.create(post, req.user.id);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() incomingPost: UpdatePostDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<PostEntity> {
    const { numberOfUpdatedRows, post } = await this.postService.update(
      id,
      incomingPost,
      req.user.id,
    );
    if (numberOfUpdatedRows === 0) {
      throw new NotFoundException("This post doesn't exist.");
    }

    return post;
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async delete(
    @Param('id') id: number,
    @Req() req: AuthenticatedRequest,
  ): Promise<string> {
    const wasDeleted = await this.postService.delete(id, req.user.id);
    if (wasDeleted === 0) {
      throw new NotFoundException("This post doesn't exist.");
    }

    return 'Successfully deleted';
  }
}
