/* eslint-disable import/no-anonymous-default-export */

// methods
export type HttpMethods = "GET" | "POST" | "HEAD" | "PUT" | "PATCH" | "DELETE";

// content typs
export type HttpContentType =
  | "text/html"
  | "application/json"
  | "multipart/form-data";

// interface for the controller
export interface IController<T = unknown> {
  method?: HttpMethods;
  url: string;
  token?: string;
  params?: Record<string, string | number | boolean>;
  data?: T;
  contentType?: HttpContentType;
  baseUrl?: string;
}

// api controller
export default async function <T, D = unknown>({
  method = "GET",
  url = "",
  token,
  contentType,
  data,
}: IController<D>): Promise<T> {
  const headers: HeadersInit = {
    Authorization: `Bearer ${token}`,
  };

  // Don't set Content-Type for FormData, let the browser set it automatically
  if (contentType && contentType !== 'multipart/form-data') {
    headers["Content-Type"] = contentType;
  }

  const config: RequestInit = {
    method,
    headers,
    cache: "no-store",
  };

  // Handle body based on content type
  if (data) {
    if (data instanceof FormData) {
      config.body = data;
    } else if (contentType === "application/json") {
      config.body = JSON.stringify(data);
    } else {
      config.body = new URLSearchParams(data as Record<string, string>).toString();
    }
  }

  const response = await fetch(url, config);
  const result = response.body ? await response.json() : null;

  if (response.status === 200 || response.status === 201) {
    return result as T;
  } else {
    const errorMessage = result?.detail || result?.message || "An error occurred";
    throw new Error(errorMessage);
  }
}