import apiController from "../apiController";
import APIUrls from '@/lib/apiurls';
import { 
  BlogResponse, 
  CreateBlog, 
  CreateBlogResponse,
  UpdateBlog,
  UpdateBlogResponse,
  DeleteBlogResponse 
} from "../models/_blog_model";

export const getAllBlogs = async (params?: { search?: string, page?: number, limit?: number }): Promise<BlogResponse> => {
  try {
    const token = localStorage.getItem('token');
    const queryParams = new URLSearchParams();
    
    if (params?.search) queryParams.append('search', params.search);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const queryString = queryParams.toString();
    const urlWithParams = `${APIUrls.getBlogs}${queryString ? `?${queryString}` : ''}`;

    return await apiController<BlogResponse>({
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

export const createBlog = async (request: CreateBlog): Promise<CreateBlogResponse> => {
  try {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    
    formData.append('title', request.title);
    formData.append('content', request.content);
    formData.append('image', request.image);
    formData.append('isActive', request.isActive);
    
    // Append arrays as JSON strings
    formData.append('tags', JSON.stringify(request.tags));
    formData.append('categories', JSON.stringify(request.categories));

    return await apiController<CreateBlogResponse>({
      method: 'POST',
      url: APIUrls.createBlog,
      data: formData,
      token: token || undefined,
      contentType: 'multipart/form-data',
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    throw new Error(errorMessage);
  }
};

export const updateBlog = async (id: string, request: UpdateBlog): Promise<UpdateBlogResponse> => {
  try {
    const token = localStorage.getItem('token');
    
    // Create FormData object for file upload
    const formData = new FormData();
    
    // Append each field to FormData
    formData.append('title', request.title);
    formData.append('author', request.author);
    
    // Handle image file
    if (request.image instanceof File) {
      formData.append('image', request.image);
    }
    
    // Convert boolean to string
    formData.append('isActive', request.isActive);

    return await apiController<UpdateBlogResponse>({
      method: 'PUT',
      url: `${APIUrls.updateBlog}/${id}`,
      data: formData,
      token: token || undefined,
      contentType: 'multipart/form-data',
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    throw new Error(errorMessage);
  }
};

export const deleteBlog = async (id: string): Promise<DeleteBlogResponse> => {
  try {
    const token = localStorage.getItem('token');
    return await apiController<DeleteBlogResponse>({
      method: 'DELETE',
      url: `${APIUrls.deleteBlog}/${id}`,
      token: token || undefined,
      contentType: 'application/json',
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    throw new Error(errorMessage);
  }
}; 