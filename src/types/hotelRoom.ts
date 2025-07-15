import type { MerchantDetail } from "./hotelMerchant";

export interface RoomListSearchParams {
  name: string;
  hotelId: number | undefined;
  typeId: number | undefined;
  status: number | undefined;
  page: number;
  limit: number;
}

export interface Room {
  id: number;
  typeName: number;
  hotelName: number;
  price: number;
  salesCommissionRate: number;
  promotionCommissionRate: number;
  salesVolume: number;
  breakfastNum: number;
  guestNum: number;
  cancellable: number;
  status: number;
  failureReason: string;
  createdAt: string;
  updatedAt: string;
}

export interface RoomListResult {
  list: Room[];
  page: string;
  limit: string;
  total: string;
}

export interface RoomDetail extends Room {
  providerInfo: Partial<MerchantDetail>;
}
