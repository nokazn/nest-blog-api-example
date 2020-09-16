import { IsNotEmpty, MinLength } from 'class-validator';

export class PostDto {
  @IsNotEmpty()
  @MinLength(4)
  readonly title!: string;

  @IsNotEmpty()
  readonly body!: string;
}

export class UpdatePostDto {
  @MinLength(4)
  readonly title!: string;

  readonly body!: string;
}
