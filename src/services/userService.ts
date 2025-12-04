import api from "../context/apiSetup";
import type {
  User,
  CreateUserDto,
  UpdateRoleDto,
  UpdateUserDto,
} from "../types/user.types";
import type { ApiResponse } from "../types/general.types";
const BASE_PATH = "/users";
export const UserService = {
  async getAllUsers(): Promise<ApiResponse<User[]>> {
    try {
      const response = await api.get<User[]>(BASE_PATH);
      return { data: response.data, success: true };
    } catch (error: unknown) {
      let message = "Failed to fetch users";
      if (error instanceof Error) {
        message = error.message;
      }
      return {
        data: [],
        success: false,
        message,
      };
    }
  },

  async getUserById(id: string): Promise<ApiResponse<User>> {
    try {
      const response = await api.get<User>(`${BASE_PATH}/${id}`);
      return { data: response.data, success: true };
    } catch (error: unknown) {
      let message = "Failed to fetch user";
      if (error instanceof Error) {
        message = error.message;
      }
      return {
        data: {} as User,
        success: false,
        message,
      };
    }
  },

  async createUser(user: CreateUserDto): Promise<ApiResponse<User>> {
    try {
      const response = await api.post<User>(BASE_PATH, user);
      return { data: response.data, success: true };
    } catch (error: unknown) {
      let message = "Failed to create user";
      if (error instanceof Error) {
        message = error.message;
      }
      return {
        data: {} as User,
        success: false,
        message,
      };
    }
  },
  async updateUserRole(
    id: number,

    data: UpdateRoleDto
  ): Promise<ApiResponse<User>> {
    try {
      const response = await api.patch<User>(`${BASE_PATH}/${id}/role`, data);

      return {
        success: true,

        data: response.data,

        message: "User role updated successfully",
      };
    } catch (error: any) {
      return {
        success: false,

        data: {} as User,

        message:
          error.response?.data?.message ||
          error.response?.data ||
          "Failed to update user role",
      };
    }
  },
  async updateUser(
    id: string,
    user: UpdateUserDto
  ): Promise<ApiResponse<User>> {
    try {
      const response = await api.put<User>(`${BASE_PATH}/${id}`, user);
      return { data: response.data, success: true };
    } catch (error: unknown) {
      let message = "Failed to update user";
      if (error instanceof Error) {
        message = error.message;
      }
      return {
        data: {} as User,
        success: false,
        message,
      };
    }
  },

  async deleteUser(id: string): Promise<ApiResponse<boolean>> {
    try {
      await api.delete(`${BASE_PATH}/${id}`);
      return { data: true, success: true };
    } catch (error: unknown) {
      let message = "Failed to delete user";
      if (error instanceof Error) {
        message = error.message;
      }
      return {
        data: false,
        success: false,
        message,
      };
    }
  },
};
