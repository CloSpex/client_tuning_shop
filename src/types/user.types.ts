import type { Base } from "./general.types";

export interface User extends Base {
  username: string;
  email: string;
  role?: string;
}
export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
}
export interface UpdateUserDto {
  username?: string;
  email?: string;
  password?: string;
}

export interface UpdateRoleDto {
  role: string;
}
