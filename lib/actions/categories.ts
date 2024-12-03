import apiController from "../apiController";
import APIUrls from "../apiurls";
import { 
  CreateCategoryResponse, 
  GetCategoriesResponse, 
  DeleteCategoryResponse, 
  DeleteCategory, 
  GetCategoriesParams, 
  Category 
} from "../models/_category_models";

export const createCategory = async ({ formData }: { formData: FormData }): Promise<CreateCategoryResponse> => {
  try {
    const token = localStorage.getItem('token');
    
    return await apiController<CreateCategoryResponse>({
      method: 'POST',
      url: APIUrls.createCategory,
      data: formData,
      token: token || undefined,
      contentType: 'multipart/form-data',
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    throw new Error(errorMessage);
  }
};

export const getAllCategories = async (params?: GetCategoriesParams): Promise<GetCategoriesResponse> => {
  try {
    const token = localStorage.getItem('token');
    const queryParams = new URLSearchParams();
    
    if (params?.search) queryParams.append('search', params.search);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const queryString = queryParams.toString();
    const urlWithParams = `${APIUrls.getCategory}${queryString ? `?${queryString}` : ''}`;

    return await apiController<GetCategoriesResponse>({
      method: 'GET',
      url: urlWithParams,
      token: token || undefined,
      contentType: 'application/json',
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    throw new Error(errorMessage);
  }
};

export const updateCategory = async ({ id, formData }: { id: string, formData: FormData }) => {
  try {
    const token = localStorage.getItem('token');
    
    return await apiController({
      method: 'PUT',
      url: `${APIUrls.updateCategory}/${id}`,
      data: formData,
      token: token || undefined,
      contentType: 'multipart/form-data',
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    throw new Error(errorMessage);
  }
};

export const deleteCategory = async (request: DeleteCategory): Promise<DeleteCategoryResponse> => {
  try {
    const token = localStorage.getItem('token');
    return await apiController<DeleteCategoryResponse>({
      method: 'DELETE',
      url: `${APIUrls.deleteCategory}/${request.id}`,
      token: token || undefined,
      contentType: 'application/json',
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    throw new Error(errorMessage);
  }
};

export const getCategory = async (id: string): Promise<Category> => {
  try {
    const token = localStorage.getItem('token');
    console.log(`Fetching category with ID: ${id}`);
    const response = await apiController<Category>({
      method: 'GET',
      url: `${APIUrls.getCategory}/${id}`,
      token: token || undefined,
      contentType: 'application/json',
    });
    return response;
  } catch (error: unknown) {
    console.error('Error fetching category:', error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    throw new Error(errorMessage);
  }
}; 