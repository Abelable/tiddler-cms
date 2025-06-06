export interface GoodsListSearchParams {
  page: number;
  limit: number;
}

export interface Goods {
  id: number;
  goodsId: number;
  goodsName: string;
  goodsCover: string;
  typeId: number;
  createdAt: string;
}

export interface GoodsListResult {
  list: Goods[];
  page: string;
  limit: string;
  total: string;
}

export interface GiftGoodsListSearchParams {
  type: number;
  page: number;
  limit: number;
}
