import type { Shop } from "./shop";
import type { MerchantDetail } from "./merchant";

export interface GoodsListSearchParams {
  name: string;
  status: number | undefined;
  shopCategoryId: number | undefined;
  categoryId: number | undefined;
  merchantId: number | undefined;
  page: number;
  limit: number;
}

export interface Spec {
  name: string;
  options: string[];
}

export interface Sku {
  image: string;
  name: string;
  price: number;
  originalPrice: number;
  salesCommissionRate: number;
  stock: number;
}

export interface Goods {
  id: number;
  status: number;
  failureReason: string;
  shopId: number;
  cover: string;
  video: string;
  imageList: string[];
  detailImageList: string[];
  defaultSpecImage: string;
  name: string;
  categoryId: number;
  price: number;
  stock: number;
  salesCommissionRate: number;
  promotionCommissionRate: number;
  promotionCommissionUpperLimit: number;
  superiorPromotionCommissionRate: number;
  superiorPromotionCommissionUpperLimit: number;
  refundSupport: number;
  specList: Spec[];
  skuList: Sku[];
  score: number;
  salesVolume: number;
  views: number;
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
