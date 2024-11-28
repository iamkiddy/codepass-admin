import apiController from "../apiController";
import APIUrls from "../apiurls";
import { 
  CreateCategory, 
  CreateCategoryResponse, 
  GetCategoriesResponse, 
  UpdateCategory, 
  UpdateCategoryResponse, 
  DeleteCategoryResponse, 
  DeleteCategory, 
  GetCategoriesParams 
} from "../models/_category_models";

export const createCategory = async (request: CreateCategory): Promise<CreateCategoryResponse> => {
  try {
    const token = localStorage.getItem('token');
    
    // Create FormData object
    const formData = new FormData();
    
    // Append each field to FormData
    formData.append('name', request.name);
    
    // Handle image file
    if (request.image instanceof File) {
      formData.append('image', request.image);
    }
    
    // Only append subcategory if it exists and is not empty
    if (request.subcategory && request.subcategory.trim()) {
      formData.append('subcategory', request.subcategory);
    }
    
    // Convert boolean to string
    formData.append('isFeatured', request.isFeatured ? 'true' : 'false');

    return await apiController<CreateCategoryResponse>({
      method: 'POST',
      url: APIUrls.createCategory,
      data: formData, // Send FormData directly
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

export const updateCategory = async (request: UpdateCategory): Promise<UpdateCategoryResponse> => {
  try {
    const token = localStorage.getItem('token');
    return await apiController<UpdateCategoryResponse, UpdateCategory>({
      method: 'PUT',
      url: `${APIUrls.updateCategory}/${request.id}`,
      data: request,
      token: token || undefined,
      contentType: 'application/json',
    });
  } catch (error: unknown) {
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