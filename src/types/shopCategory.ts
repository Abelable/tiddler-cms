export interface ShopCategoriesSearchParams {
  page: number;
  limit: number;
}

export interface ShopCategory {
  id: number;
  name: string;
  createdAt: string;
}

export interface ShopCategoriesResult {
  list: ShopCategory[];
  page: string;
  limit: string;
  total: string;
}

export interface ShopCategoryOption {
  id: number;
  name: string;
}
