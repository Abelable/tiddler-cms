export interface ShopRestaurantListSearchParams {
  status: number;
  page: number;
  limit: number;
}

export interface ShopRestaurant {
  id: number;
  status: number;
  failureReason: string;
  restaurantId: number;
  restaurantName: string;
  restaurantCover: string;
  merchantName: string;
  businessLicense: string;
  createdAt: string;
  updatedAt: string;
}

export interface ShopRestaurantListResult {
  list: ShopRestaurant[];
  page: string;
  limit: string;
  total: string;
}
