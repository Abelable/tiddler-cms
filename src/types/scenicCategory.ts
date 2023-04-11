export interface ScenicCategoriesSearchParams {
  page: number;
  limit: number;
}

export interface ScenicCategory {
  id: number;
  name: string;
  createdAt: string;
}

export interface ScenicCategoriesResult {
  list: ScenicCategory[];
  page: string;
  limit: string;
  total: string;
}

export interface ScenicCategoryOption {
  id: number;
  name: string;
}
