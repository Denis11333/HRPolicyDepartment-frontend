import { Role } from '../role/role';

export interface User {
  id: number;
  username: string;
  password: string;
  roles: Role[];
}

