import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';

@Injectable()
export class ValidateInputPipe extends ValidationPipe {
  public async transform(
    value: unknown,
    metadata: ArgumentMetadata,
  ): Promise<unknown> {
    const validatedValue = await super
      .transform(value, metadata)
      .catch((err: Error) => {
        console.error(err);
        if (err instanceof BadRequestException) {
          throw new UnprocessableEntityException(err.message);
        }
        return value;
      });
    return validatedValue;
  }
}
