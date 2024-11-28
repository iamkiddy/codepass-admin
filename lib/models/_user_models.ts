export interface User {
    id: string;
    fullname: string;
    email: string;
    role: string;
    isActive: boolean;
    lastLogin: string;
}

export interface GetUsersResponse {
    page: number;
    total: number;
    limit: number;
    data: User[];
}

export interface CreateUser {
    fullname: string;
    email: string;
    role: string;
}

export interface CreateUserResponse {
    message: string;
}

export interface UpdateUser {
    id: string;
    fullname: string;
    email: string;
    role: string;
}

export interface UpdateUserResponse {
    message: string;
}

export interface DeleteUserResponse {
    message: string;
}