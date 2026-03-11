export interface UserBase {
    firstName: string;
    lastName: string;
    email: string;
}

export interface AuthUser extends UserBase {
    id: string
}

export interface LoginRequest {
    email: string;
    password: string;
}

export type RegisterRequest = UserBase & {
    password: string
}

export interface AuthSuccessResponse {
    user: AuthUser,
    accessToken: string
}

export interface LogoutResponse {
    message: string
}