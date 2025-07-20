import type { CateringMerchantDetail } from "./cateringMerchant";

export interface SetMealListSearchParams {
  name: string;
  restaurantId: number | undefined;
  status: number | undefined;
  page: number;
  limit: number;
}

export interface SetMeal {
  id: number;
  status: number;
  failureReason: string;
  cover: string;
  name: string;
  restaurantIds: number[];
  price: number;
  originalPrice: number;
  salesCommissionRate: number;
  promotionCommissionRate: number;
  promotionCommissionUpperLimit: number;
  superiorPromotionCommissionRate: number;
  superiorPromotionCommissionUpperLimit: number;
  salesVolume: number;
  createdAt: string;
  updatedAt: string;
}

export interface SetMealListResult {
  list: SetMeal[];
  page: string;
  limit: string;
  total: string;
}

export interface Shop {
  id: number;
  status: number;
  type: number;
  name: string;
  logo: string;
  cover: string;
  createdAt: string;
  updatedAt: string;
}

export interface SetMealDetail extends SetMeal {
  shopInfo: Partial<Shop>;
  merchantInfo: Partial<CateringMerchantDetail>;
}
