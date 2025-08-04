export interface StarTripListSearchParams {
  page: number;
  limit: number;
}

export interface StarTrip {
  id: number;
  productType: number;
  productId: number;
  cover: number;
  name: string;
  desc: string;
  sort: number;
  createdAt: string;
  updatedAt: string;
}

export interface StarTripListResult {
  list: StarTrip[];
  page: string;
  limit: string;
  total: string;
}
