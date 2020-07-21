import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];
  
  create(cat: Cat): void {
    console.log(cat);
    this.cats.push(cat);
  }

  findAll(params: {limit?: number, offset?: number}): Promise<Cat[]> {
    console.log(params);
    return Promise.resolve([
      {
        name: 'tama',
        age: 1,
        breed: 'hoge'
      },
    ]);
  }

  findOne(id: string): Promise<Cat> {
    console.log(id);
    return Promise.resolve({
      name: 'shiro',
      age: 2,
      breed: 'fuga',
    });
  }

  update(id: string, params: Partial<Cat>): void {
    console.log(id, params);
    const current = this.cats[0];
    this.cats[0] = {
      ...current,
      ...params,
    };
  }

  remove(id: string): void {
    console.log(id);
  }
}
