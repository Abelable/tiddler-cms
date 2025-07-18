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
  cover: string;
  name: string;
  restaurantIds: number[];
  price: number;
  originalPrice: number;
  salesCommissionRate: number;
  promotionCommissionRate: number;
  salesVolume: number;
  status: number;
  failureReason: string;
  createdAt: string;
  updatedAt: string;
}

export interface SetMealListResult {
  list: SetMeal[];
  page: string;
  limit: string;
  total: string;
}

export interface SetMealDetail extends SetMeal {
  providerInfo: Partial<CateringMerchantDetail>;
}
