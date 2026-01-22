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
  logo: string;
  bg: string;
  createdAt: string;
  updatedAt: string;
}

export interface ShopsResult {
  list: Shop[];
  page: string;
  limit: string;
  total: string;
}
