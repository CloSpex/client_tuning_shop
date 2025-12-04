import api from "../context/apiSetup";
import type { LoginDto, LoginResponse } from "../types/auth.types";
import type { User } from "../types/user.types";
const BASE_PATH = "/auth";
export const AuthService = {
  async login(credentials: LoginDto): Promise<User> {
    const { data } = await api.post<LoginResponse>(
      BASE_PATH + "/login",
      credentials
    );
    localStorage.setItem("accessToken", data.accessToken);

    return data.user;
  },

  async logout(): Promise<void> {
    try {
      await api.post(BASE_PATH + "/logout");
    } catch (error) {
      console.error("Logout failed on server", error);
    } finally {
      localStorage.removeItem("accessToken");
    }
  },
  async getCurrentUser(): Promise<User> {
    const { data } = await api.get<{ user: User }>(BASE_PATH + "/me");
    return data.user;
  },
};
