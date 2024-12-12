import apiController from "../apiController";
import APIUrls from "../apiurls";
import { EventOption, GetEventUtilsResponse } from "../models/_event_models";

export const getEventUtils = async (): Promise<GetEventUtilsResponse> => {
  try {
    const token = localStorage.getItem('token');
    const response = await apiController<EventOption[]>({
      method: 'GET',
      url: APIUrls.getEventUtils,
      token: token || undefined,
      contentType: 'application/json',
    });

    // Transform the array response into the expected format
    return {
      data: response
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    throw new Error(errorMessage);
  }
};