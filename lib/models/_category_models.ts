export interface CreateCategory {
  name: string;
  icon: string;
  subcategory?: string;
  isFeatured: boolean;
}

export interface CreateCategoryResponse {
  message: string;
}

export interface Category {
  id: string;
  icon: string;
  name: string;
  subcategory?: string[];
  isFeatured: boolean;
  totalEvents: number;
  totalBlogs: number;
}

export interface GetCategoriesResponse {
  page: number;
  total: number;
  limit: number;
  data: Category[];
}

export interface UpdateCategory {
  id: string;
  name: string;
  icon?: string;
  subcategory?: string;
  isFeatured: boolean;
}

export interface UpdateCategoryResponse {
  message: string;
}

export interface DeleteCategory {
  id: string;
}

export interface DeleteCategoryResponse {
  message: string;
}

export interface GetCategoriesParams {
  search?: string;
  page?: number;
  limit?: number;
} 