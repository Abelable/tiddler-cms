export interface MerchantsSearchParams {
  name: string;
  mobile: string;
  page: number;
  limit: number;
}

export interface Merchant {
  id: number;
  type: number;
  name: string;
  mobile: string;
  status: number;
  failureReason: string;
  createdAt: string;
  updatedAt: string;
}

export interface MerchantsResult {
  list: Merchant[];
  page: string;
  limit: string;
  total: string;
}
