export interface ProviderRestaurantListSearchParams {
  status: number;
  page: number;
  limit: number;
}

export interface ProviderRestaurant {
  id: number;
  status: number;
  failureReason: string;
  restaurantId: number;
  restaurantName: string;
  restaurantImage: string;
  providerCompanyName: string;
  providerBusinessLicensePhoto: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProviderRestaurantListResult {
  list: ProviderRestaurant[];
  page: string;
  limit: string;
  total: string;
}
