import { Controller, Get, Post, HttpCode, Param, Query, Body, Put, Delete } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto, ListAllEntities, UpdateCatDto } from './cats.dto';
import { Cat } from 'src/cats/interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createCatDto: CreateCatDto): Promise<void> {
    console.log(createCatDto);
    this.catsService.create(createCatDto);
  }

  @Get()
  findAll(@Query() query: ListAllEntities): Promise<Cat[]> {
    return this.catsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Cat> {
    return this.catsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto): void {
    console.log(updateCatDto);
    this.catsService.update(id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    this.catsService.remove(id);
  }
}
