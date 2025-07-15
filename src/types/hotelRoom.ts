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
  status: number;
  failureReason: string;
  shopId: number;
  typeName: number;
  hotelName: number;
  price: number;
  salesCommissionRate: number;
  promotionCommissionRate: number;
  promotionCommissionUpperLimit: number;
  superiorPromotionCommissionRate: number;
  superiorPromotionCommissionUpperLimit: number;
  salesVolume: number;
  breakfastNum: number;
  guestNum: number;
  cancellable: number;
  createdAt: string;
  updatedAt: string;
}

export interface RoomListResult {
  list: Room[];
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

export interface RoomDetail extends Room {
  shopInfo: Partial<Shop>;
  merchantInfo: Partial<MerchantDetail>;
}
