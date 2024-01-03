import type { Shop } from "./shop";
import type { MerchantDetail } from "./merchant";

export interface GoodsListSearchParams {
  name: string;
  shopCategoryId: number | undefined;
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
  salesCommissionRate: number;
  promotionCommissionRate: number;
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
  shopInfo: Partial<Shop>;
  merchantInfo: Partial<MerchantDetail>;
}
