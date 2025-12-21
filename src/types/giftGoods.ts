export interface GiftGoodsListSearchParams {
  typeId: number;
  goodsId: number;
  page: number;
  limit: number;
}

export interface GiftGoods {
  id: number;
  typeId: number;
  goodsId: number;
  goodsName: string;
  goodsCover: string;
  duration: number;
  sort: number;
  createdAt: string;
}

export interface GiftGoodsListResult {
  list: GiftGoods[];
  page: string;
  limit: string;
  total: string;
}
