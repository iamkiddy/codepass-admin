export interface CreateEventType {
  name: string;
}

export interface CreateEventTypeResponse {
  message: string;
}

export interface EventType {
  id: string;
  name: string;
  numberOfEvents: number;
}

export interface GetEventTypesResponse {
  page: number;
  total: number;
  limit: number;
  data: EventType[];
}

export interface UpdateEventType {
  id: string;
  name: string;
}

export interface UpdateEventTypeResponse {
  message: string;
}

export interface DeleteEventType {
  id: string;
}

export interface DeleteEventTypeResponse {
  message: string;
}

export interface GetEventTypesParams {
  search?: string;
  page?: number;
  limit?: number;
}


