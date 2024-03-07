interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  address?: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface findUser {
  id: number;
  name: string;
  email: string;
  password?: string;
  is_admin: true;
}
interface resolveTypes {
  isError: boolean;
  message: string;
  data: findUser;
}

export { User, LoginRequest, findUser, resolveTypes };
