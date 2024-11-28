import apiController from "../apiController";
import APIUrls from "../apiurls";
import { CreateEventType, CreateEventTypeResponse, GetEventTypesResponse, UpdateEventType, UpdateEventTypeResponse, DeleteEventTypeResponse, DeleteEventType, GetEventTypesParams } from "../models/_event_type_models";

export const createEventType = async (request: CreateEventType): Promise<CreateEventTypeResponse> => {
    try {
        const token = localStorage.getItem('token');
        return await apiController<CreateEventTypeResponse, CreateEventType>({
            method: 'POST',
            url: APIUrls.createEventType,
            data: request,
            token: token || undefined,
            contentType: 'application/json',
        });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
        throw new Error(errorMessage);
    }
};

export const getAllEventTypes = async (params?: GetEventTypesParams): Promise<GetEventTypesResponse> => {
    try {
        const token = localStorage.getItem('token');
        const queryParams = new URLSearchParams();
        
        if (params?.search) queryParams.append('search', params.search);
        if (params?.page) queryParams.append('page', params.page.toString());
        if (params?.limit) queryParams.append('limit', params.limit.toString());

        const queryString = queryParams.toString();
        const urlWithParams = `${APIUrls.getEventType}${queryString ? `?${queryString}` : ''}`;

        return await apiController<GetEventTypesResponse>({
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

export const updateEventType = async (request: UpdateEventType): Promise<UpdateEventTypeResponse> => {
    try {
        const token = localStorage.getItem('token');
        return await apiController<UpdateEventTypeResponse, UpdateEventType>({
            method: 'PUT',
            url: `${APIUrls.updateEventType}/${request.id}`,
            data: request,
            token: token || undefined,
            contentType: 'application/json',
        });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
        throw new Error(errorMessage);
    }
};

export const deleteEventType = async (request: DeleteEventType): Promise<DeleteEventTypeResponse> => {
    try {
        const token = localStorage.getItem('token');
        return await apiController<DeleteEventTypeResponse, DeleteEventType>({
            method: 'DELETE',
            url: `${APIUrls.deleteEventType}/${request.id}`,
            token: token || undefined,
            contentType: 'application/json',
        });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
        throw new Error(errorMessage);
    }
};