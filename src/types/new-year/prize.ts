export interface PrizeListSearchParams {
  page: number;
  limit: number;
}

export interface Prize {
  id: number;
  status: number;
  type: number;
  couponId: number;
  goodsId: number;
  isBig: number;
  cover: string;
  name: string;
  sort: number;
  createdAt: string;
  updatedAt: string;
}

export interface PrizeListResult {
  list: Prize[];
  page: string;
  limit: string;
  total: string;
}
