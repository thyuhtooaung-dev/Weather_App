import { authClient } from "@/services/axios.ts";

export interface SignupDto {
  firstName: string;
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  user: {
    email: string;
    name: string;
    avatar: string;
  };
}

export const authService = {
  signup: async (data: SignupDto): Promise<AuthResponse> => {
    const response = await authClient.post<AuthResponse>("/signup", data);
    return response.data;
  },

  login: async (data: LoginDto): Promise<AuthResponse> => {
    const response = await authClient.post<AuthResponse>("/login", data);
    return response.data;
  },
};
