export interface UserDataValues {
  id: any;
  name: string;
  email: string;
  gender: 'male' | 'female';
  createdAt: any;
  updatedAt: any;
}

export interface LoginUserBody {
  username: string;
  password: string;
}

export interface LoginUserDataValues {
  username: string;
}
