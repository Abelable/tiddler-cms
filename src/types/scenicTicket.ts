import type { MerchantDetail } from "./scenicMerchant";

export interface TicketListSearchParams {
  name: string;
  type: number | undefined;
  scenicId: number | undefined;
  status: number | undefined;
  page: number;
  limit: number;
}

export interface Ticket {
  id: number;
  name: string;
  type: number;
  scenicIds: number[];
  price: number;
  salesCommissionRate: number;
  promotionCommissionRate: number;
  promotionCommissionUpperLimit: number;
  superiorPromotionCommissionRate: number;
  superiorPromotionCommissionUpperLimit: number;
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
  merchantInfo: Partial<MerchantDetail>;
}
