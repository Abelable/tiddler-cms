export interface ShopsSearchParams {
  name: string;
  categoryId: number;
  page: number;
  limit: number;
}

export interface Shop {
  id: number;
  type: number;
  name: string;
  categoryId: number;
  avatar: string;
  cover: string;
  createdAt: string;
  updatedAt: string;
}

export interface ShopsResult {
  list: Shop[];
  page: string;
  limit: string;
  total: string;
}
