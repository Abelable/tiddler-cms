export interface GoodsCategoriesSearchParams {
  page: number;
  limit: number;
}

export interface GoodsCategory {
  id: number;
  name: string;
  createdAt: string;
}

export interface GoodsCategoriesResult {
  list: GoodsCategory[];
  page: string;
  limit: string;
  total: string;
}

export interface GoodsCategoryOption {
  id: number;
  name: string;
}
