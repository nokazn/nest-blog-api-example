import { IsNotEmpty, IsEmail, MinLength, IsEnum } from 'class-validator';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export class UserDto {
  @IsNotEmpty()
  readonly name!: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email!: string;

  @IsNotEmpty()
  @MinLength(8)
  readonly password!: string;

  @IsNotEmpty()
  @IsEnum(Gender, {
    message: 'gender must be either male of female',
  })
  readonly gender!: 'male' | 'female';
}
