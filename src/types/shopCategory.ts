export interface MerchantTypeOption {
  label: string;
  value: number;
}

export interface ShopCategory {
  id: number;
  name: string;
  deposit: number;
  adaptedMerchantTypes: number[];
  createdAt: string;
}

export interface ShopCategoriesResult {
  list: ShopCategory[];
  page: string;
  limit: string;
  total: string;
}
