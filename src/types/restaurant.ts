export interface RestaurantListSearchParams {
  name: string;
  categoryId: number | undefined;
  status: number | undefined;
  page: number;
  limit: number;
}

interface OpenTime {
  openMonth: string;
  closeMonth: string;
  openTime: string;
  closeTime: string;
  tips: string;
}

export interface RestaurantDetail {
  id: number;
  categoryId: number;
  openStatus: number;
  name: string;
  price: number;
  logo: string;
  video: string;
  cover: string;
  foodImageList: string[];
  environmentImageList: string[];
  priceImageList: string[];
  longitude: number;
  latitude: number;
  address: string;
  telList: string[];
  openTimeList: OpenTime[];
  facilityList: string[];
}

export interface Restaurant {
  id: number;
  categoryId: number;
  name: string;
  rate: number;
  openStatus: number;
  createdAt: string;
  updatedAt: string;
}

export interface RestaurantListResult {
  list: Restaurant[];
  page: string;
  limit: string;
  total: string;
}

export interface RestaurantOption {
  id: number;
  name: string;
}
