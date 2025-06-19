export interface GoodsCategoriesSearchParams {
  shopCategoryId: number | undefined;
  page: number;
  limit: number;
}

export interface GoodsCategory {
  id: number;
  shopCategoryId: number;
  name: string;
  minSalesCommissionRate: number;
  maxSalesCommissionRate: number;
  minPromotionCommissionRate: number;
  maxPromotionCommissionRate: number;
  promotionCommissionUpperLimit: number;
  minSuperiorPromotionCommissionRate: number;
  maxSuperiorPromotionCommissionRate: number;
  superiorPromotionCommissionUpperLimit: number;
  createdAt: string;
  updatedAt: string;
}

export interface GoodsCategoriesResult {
  list: GoodsCategory[];
  page: string;
  limit: string;
  total: string;
}

export interface GoodsCategoryOption {
  id: number;
  shopCategoryId: number;
  name: string;
  minSalesCommissionRate: number;
  maxSalesCommissionRate: number;
  minPromotionCommissionRate: number;
  maxPromotionCommissionRate: number;
  promotionCommissionUpperLimit: number;
  minSuperiorPromotionCommissionRate: number;
  maxSuperiorPromotionCommissionRate: number;
  superiorPromotionCommissionUpperLimit: number;
}
