import { Controller, Get, Post, HttpCode, Param, Query, Body, Put, Delete } from '@nestjs/common';
import { CreateCatDto, ListAllEntities, UpdateCatDto } from './cats.dto';

@Controller('cats')
export class CatsController {
  @Post()
  @HttpCode(201)
  create(@Body() createCatDto: CreateCatDto): string {
    console.log(createCatDto);
    return 'This actions adds a new cat';
  }

  @Get()
  findAll(@Query() query: ListAllEntities): string {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This actions returns #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto): string {
    console.log(updateCatDto);
    return `Tihis action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return `This action removes a #${id} cat`;
  }
}
