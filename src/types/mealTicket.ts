import type { CateringProviderDetail } from "./cateringProvider";

export interface TicketListSearchParams {
  name: string;
  restarantId: number | undefined;
  status: number | undefined;
  page: number;
  limit: number;
}

export interface Ticket {
  id: number;
  name: string;
  restarantIds: number[];
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
  providerInfo: Partial<CateringProviderDetail>;
}
