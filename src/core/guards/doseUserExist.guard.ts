import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { UsersService } from '../../modules/users/users.service';
import { TODO } from 'types';

@Injectable()
export class DoesUserExist implements CanActivate {
  constructor(private readonly userService: UsersService) {}

  canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validationRequest(request);
  }

  private async validationRequest(request: TODO): Promise<boolean> {
    const doesUserExist = await this.userService.findOneByEmail(
      request.body.email,
    );
    if (doesUserExist) {
      throw new ForbiddenException('This email already exist.');
    }
    return true;
  }
}
