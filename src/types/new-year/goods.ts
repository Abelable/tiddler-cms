export interface NewYearGoodsListSearchParams {
  page: number;
  limit: number;
}

export interface NewYearGoods {
  id: number;
  status: number;
  goodsId: number;
  name: string;
  cover: string;
  luckScore: number;
  sort: number;
  createdAt: string;
  updatedAt: string;
}

export interface NewYearGoodsListResult {
  list: NewYearGoods[];
  page: string;
  limit: string;
  total: string;
}
