export interface ShopsSearchParams {
  name: string;
  page: number;
  limit: number;
}

export interface Shop {
  id: number;
  status: number;
  type: number;
  name: string;
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
