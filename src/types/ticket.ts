import type { Shop } from "./shop";
import type { MerchantDetail } from "./merchant";

export interface TicketListSearchParams {
  name: string;
  categoryId: number | undefined;
  status: number | undefined;
  page: number;
  limit: number;
}

export interface Ticket {
  id: number;
  image: string;
  name: string;
  categoryId: number;
  price: number;
  stock: number;
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
  shopInfo: Partial<Shop>;
  merchantInfo: Partial<MerchantDetail>;
}
