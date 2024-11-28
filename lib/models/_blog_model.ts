export interface Blog {
    id: string;
    title: string;
    author: string;
    image: string;
    isActive: string;
    createdAt: string;
    updatedAt: string;
}

export interface BlogResponse {
    page: number;
    total: number;
    limit: number;
    data: Blog[];
}

export interface CreateBlog {
    title: string;
    content: string;
    image: File;
    tags: string[];
    categories: string[];
    isActive: string;
}

export interface CreateBlogResponse {
    message: string;
}

export interface UpdateBlog {
    title: string;
    author: string;
    image: File | string;
    isActive: string;
}

export interface UpdateBlogResponse {
    message: string;
}

export interface DeleteBlogResponse {
    message: string;
}