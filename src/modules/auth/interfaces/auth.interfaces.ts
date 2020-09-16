import { Request } from 'express';

export interface UserDataValues {
  id: any;
  name: string;
  email: string;
  gender: 'male' | 'female';
  createdAt: any;
  updatedAt: any;
}

export interface ValidatedUserDataValues {
  id: number;
  email: string;
  name: string;
  gender: 'male' | 'female';
}

export type AuthenticatedRequest<
  T extends Partial<ValidatedUserDataValues> = ValidatedUserDataValues
> = Request & {
  user: T extends never ? T : ValidatedUserDataValues;
};

export interface LoginUserDataValues {
  email: string;
  name: string;
  gender: string;
}
