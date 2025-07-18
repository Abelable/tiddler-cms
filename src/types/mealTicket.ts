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

export interface TicketListResult {
  list: Ticket[];
  page: string;
  limit: string;
  total: string;
}

export interface TicketDetail extends Ticket {
  providerInfo: Partial<CateringMerchantDetail>;
}
