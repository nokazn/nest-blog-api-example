export interface UserDataValues {
  id: any;
  name: string;
  email: string;
  gender: string;
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
