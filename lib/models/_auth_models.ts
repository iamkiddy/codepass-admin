export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    id: string;
    fullname: string;
    email: string;
    role: string;
    message: string;
    token: string;
}

