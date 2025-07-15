export interface ShopHotelListSearchParams {
  status: number;
  page: number;
  limit: number;
}

export interface ShopHotel {
  id: number;
  status: number;
  failureReason: string;
  hotelId: number;
  hotelName: string;
  hotelCover: string;
  merchantName: string;
  businessLicense: string;
  createdAt: string;
  updatedAt: string;
}

export interface ShopHotelListResult {
  list: ShopHotel[];
  page: string;
  limit: string;
  total: string;
}
