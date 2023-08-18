export interface ProviderHotelListSearchParams {
  status: number;
  page: number;
  limit: number;
}

export interface ProviderHotel {
  id: number;
  status: number;
  failureReason: string;
  hotelId: number;
  hotelName: string;
  hotelImage: string;
  providerCompanyName: string;
  providerBusinessLicensePhoto: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProviderHotelListResult {
  list: ProviderHotel[];
  page: string;
  limit: string;
  total: string;
}
