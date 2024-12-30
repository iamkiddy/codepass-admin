export interface Banner {
    id: string;
    image: string;
    title: string;
    event: string;
    isFeatured: boolean;
    isActive: boolean;
}

export interface BannerResponse {
  page: number;
  total: number;
  limit: number;
  data: Banner[];
}

export interface CreateBanner {
  image: File | string;
  title: string;
  event: string;
  isFeatured: boolean;
  isActive: boolean;
}

export interface CreateBannerResponse {
  message: string;
}

export interface UpdateBanner{
    image: File | string;
    title: string;
    isFeatured: boolean;
    isActive: boolean;
    event: string;

}

export interface UpdateBannerResponse{
    message:string;
}

export interface DeleteBannerResponse{
  message: string;
}

export interface BannerByIdResponse {
  id: string;
  image: string;
  title: string;
  event: string;
  isFeatured: boolean;
  isActive: boolean;
}
