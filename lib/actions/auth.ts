import apiController from "../apiController";
import APIUrls from "../apiurls";
import { LoginRequest, LoginResponse } from "../models/_auth_models";

export const login = async (request: LoginRequest): Promise<LoginResponse> => {
    try {
        return await apiController<LoginResponse, LoginRequest>({
            method: 'POST',
            url: APIUrls.login,
            data: request,
            contentType: 'application/json',
        });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error 
            ? error.message 
            : "An unexpected error occurred";
        throw new Error(errorMessage);
    }
}