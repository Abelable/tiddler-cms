import type { ProviderDetail } from "./scenicProvider";

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
  providerInfo: Partial<ProviderDetail>;
}
