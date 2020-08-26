import { Controller, Get, Param } from '@nestjs/common';

@Controller()
export class PostsController {
  @Get()
  findAll(): string {
    return 'This action returns all posts.';
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a post which of id is ${id}.`;
  }
}
