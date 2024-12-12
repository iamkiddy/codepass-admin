import apiController from "../apiController";
import APIUrls from "../apiurls";
import { 
  CreateBanner, 
  CreateBannerResponse, 
  BannerResponse, 
  UpdateBanner, 
  UpdateBannerResponse, 
  DeleteBannerResponse 
} from "../models/_banner_models";

export const createBanner = async (request: CreateBanner): Promise<CreateBannerResponse> => {
  try {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    
    formData.append('title', request.title);
    formData.append('eventId', request.eventId);
    
    if (request.image instanceof File) {
      formData.append('image', request.image);
    }
    
    formData.append('isFeatured', request.isFeatured ? 'true' : 'false');
    formData.append('isActive', request.isActive ? 'true' : 'false');

    return await apiController<CreateBannerResponse>({
      method: 'POST',
      url: APIUrls.createBanner,
      data: formData,
      token: token || undefined,
      contentType: 'multipart/form-data',
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    throw new Error(errorMessage);
  }
};

export const getAllBanners = async (params?: { search?: string, page?: number, limit?: number }): Promise<BannerResponse> => {
  try {
    const token = localStorage.getItem('token');
    const queryParams = new URLSearchParams();
    
    if (params?.search) queryParams.append('search', params.search);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const queryString = queryParams.toString();
    const urlWithParams = `${APIUrls.getBanner}${queryString ? `?${queryString}` : ''}`;

    return await apiController<BannerResponse>({
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

export const updateBanner = async (id: string, request: UpdateBanner): Promise<UpdateBannerResponse> => {
  try {
    const token = localStorage.getItem('token');
    
    // Create FormData object for file upload
    const formData = new FormData();
    
    // Append each field to FormData
    formData.append('title', request.title);
    
    // Handle image file
    if (request.image instanceof File) {
      formData.append('image', request.image);
    }
    
    // Convert boolean to string
    formData.append('isFeatured', request.isFeatured ? 'true' : 'false');
    formData.append('isActive', request.isActive ? 'true' : 'false');

    return await apiController<UpdateBannerResponse>({
      method: 'PUT',
      url: `${APIUrls.updateBanner}/${id}`,
      data: formData,
      token: token || undefined,
      contentType: 'multipart/form-data',
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    throw new Error(errorMessage);
  }
};

export const deleteBanner = async (id: string): Promise<DeleteBannerResponse> => {
  try {
    const token = localStorage.getItem('token');
    return await apiController<DeleteBannerResponse>({
      method: 'DELETE',
      url: `${APIUrls.deleteBanner}/${id}`,
      token: token || undefined,
      contentType: 'application/json',
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    throw new Error(errorMessage);
  }
};


export const getBannerById = async (id: string): Promise<BannerResponse> => {
  try {
    const token = localStorage.getItem('token');
    return await apiController<BannerResponse>({
      method: 'GET',
      url: `${APIUrls.getBannerById}/${id}`,
      token: token || undefined,
      contentType: 'application/json',
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    throw new Error(errorMessage);
  }
};