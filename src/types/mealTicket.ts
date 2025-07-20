import type { CateringMerchantDetail } from "./cateringMerchant";

export interface TicketListSearchParams {
  name: string;
  restaurantId: number | undefined;
  status: number | undefined;
  page: number;
  limit: number;
}

export interface Ticket {
  id: number;
  status: number;
  failureReason: string;
  shopId: number;
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

export interface TicketListResult {
  list: Ticket[];
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

export interface TicketDetail extends Ticket {
  shopInfo: Partial<Shop>;
  merchantInfo: Partial<CateringMerchantDetail>;
}
