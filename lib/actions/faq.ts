import apiController from "../apiController";
import APIUrls from "../apiurls";
import { 
  CreateFaq, 
  CreateFaqResponse, 
  GetFaqsResponse, 
  UpdateFaq, 
  UpdateFaqResponse, 
  DeleteFaqResponse, 
  Faq 
} from "../models/_faq_models";

export const createFaq = async (request: CreateFaq): Promise<CreateFaqResponse> => {
  try {
    const token = localStorage.getItem('token');
    return await apiController<CreateFaqResponse, CreateFaq>({
      method: 'POST',
      url: APIUrls.createFaq,
      data: request,
      token: token || undefined,
      contentType: 'application/json',
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    throw new Error(errorMessage);
  }
};

export const getAllFaqs = async (params?: { search?: string, page?: number, limit?: number }): Promise<GetFaqsResponse> => {
  try {
    const token = localStorage.getItem('token');
    const queryParams = new URLSearchParams();
    
    if (params?.search) queryParams.append('search', params.search);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const queryString = queryParams.toString();
    const urlWithParams = `${APIUrls.getFaq}${queryString ? `?${queryString}` : ''}`;

    return await apiController<GetFaqsResponse>({
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

export const updateFaq = async (request: UpdateFaq): Promise<UpdateFaqResponse> => {
  try {
    const token = localStorage.getItem('token');
    return await apiController<UpdateFaqResponse, UpdateFaq>({
      method: 'PUT',
      url: `${APIUrls.updateFaq}/${request.id}`,
      data: request,
      token: token || undefined,
      contentType: 'application/json',
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    throw new Error(errorMessage);
  }
};

export const deleteFaq = async (id: string): Promise<DeleteFaqResponse> => {
  try {
    const token = localStorage.getItem('token');
    return await apiController<DeleteFaqResponse>({
      method: 'DELETE',
      url: `${APIUrls.deleteFaq}/${id}`,
      token: token || undefined,
      contentType: 'application/json',
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    throw new Error(errorMessage);
  }
};

export const getFaq = async (id: string): Promise<Faq> => {
  try {
    const token = localStorage.getItem('token');
    return await apiController<Faq>({
      method: 'GET',
      url: `${APIUrls.getFaq}/${id}`,
      token: token || undefined,
      contentType: 'application/json',
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    throw new Error(errorMessage);
  }
};
