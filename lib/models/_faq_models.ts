export interface GetFaqsResponse {
  page: number;
  total: number;
  limit: number;
  data: Faq[];
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export interface CreateFaq {
  question: string;
  answer: string;
}

export interface CreateFaqResponse {
  message: string;
}

export interface UpdateFaq {
  id: string;
  question: string;
  answer: string;
}

export interface UpdateFaqResponse {
  message: string;
}

export interface DeleteFaqResponse {
  message: string;
}
