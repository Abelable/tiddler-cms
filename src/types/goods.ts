import type { Shop } from "./shop";
import type { MerchantDetail } from "./merchant";

export interface GoodsListSearchParams {
  name: string;
  categoryId: number | undefined;
  status: number | undefined;
  page: number;
  limit: number;
}

export interface Goods {
  id: number;
  image: string;
  name: string;
  categoryId: number;
  price: number;
  stock: number;
  commissionRate: number;
  salesVolume: number;
  status: number;
  failureReason: string;
  createdAt: string;
  updatedAt: string;
}

export interface GoodsListResult {
  list: Goods[];
  page: string;
  limit: string;
  total: string;
}

export interface GoodsDetail extends Goods {
  shopInfo: Shop;
  merchanctInfo: MerchantDetail;
}
