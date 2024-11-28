import apiController from "../apiController";
import APIUrls from "../apiurls";
import { 
  CreateUser, 
  CreateUserResponse, 
  GetUsersResponse, 
  UpdateUser, 
  UpdateUserResponse, 
  DeleteUserResponse 
} from "../models/_user_models";

interface GetUsersParams {
  search?: string;
  page?: number;
  limit?: number;
}

export const getAllUsers = async (params?: GetUsersParams): Promise<GetUsersResponse> => {
  try {
    const token = localStorage.getItem('token');
    const queryParams = new URLSearchParams();
    
    if (params?.search) queryParams.append('search', params.search);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const queryString = queryParams.toString();
    const url = queryString ? `${APIUrls.getUser}?${queryString}` : APIUrls.getUser;

    return await apiController<GetUsersResponse>({
      method: 'GET',
      url,
      token: token || undefined,
      contentType: 'application/json',
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    throw new Error(errorMessage);
  }
};

export const createUser = async (data: CreateUser): Promise<CreateUserResponse> => {
  try {
    const token = localStorage.getItem('token');
    return await apiController<CreateUserResponse>({
      method: 'POST',
      url: APIUrls.createUser,
      token: token || undefined,
      contentType: 'application/json',
      data,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    throw new Error(errorMessage);
  }
};

export const updateUser = async (data: UpdateUser): Promise<UpdateUserResponse> => {
  try {
    const token = localStorage.getItem('token');
    return await apiController<UpdateUserResponse>({
      method: 'PUT',
      url: `${APIUrls.updateUser}/${data.id}`,
      token: token || undefined,
      contentType: 'application/json',
      data,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    throw new Error(errorMessage);
  }
};

export const deleteUser = async (id: string): Promise<DeleteUserResponse> => {
  try {
    const token = localStorage.getItem('token');
    return await apiController<DeleteUserResponse>({
      method: 'DELETE',
      url: `${APIUrls.deleteUser}/${id}`,
      token: token || undefined,
      contentType: 'application/json',
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    throw new Error(errorMessage);
  }
};
