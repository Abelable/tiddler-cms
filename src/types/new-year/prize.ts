export interface PrizeListSearchParams {
  type: number | undefined;
  page: number;
  limit: number;
}

export interface Prize {
  id: number;
  status: number; // 1-上架中，2-已下架
  type: number; // 1-福气值，2-优惠券，3-商品
  couponId: number; // 优惠券ID，仅 type=2 有效
  goodsId: number; // 商品ID，仅 type=3 有效
  isBig: number; // 是否大奖：0-否，1-是
  cover: string; // 奖品图片
  name: string; // 奖品名称
  sort: number; // 排序
  rate: number; // 抽奖概率 0~1
  stock: number; // 库存 -1不限，0售罄
  luckScore: number; // 福气值，仅 type=1 有效
  cost: number; // 单次真实成本
  limitPerUser: number; // 单用户最多中奖次数 0不限
  fallbackPrizeId: number; // 库存不足降级奖品ID
  startAt?: string; // 生效开始时间（可选）
  endAt?: string; // 生效结束时间（可选）
  createdAt: string; // 创建时间
  updatedAt: string; // 更新时间
}

export interface PrizeListResult {
  list: Prize[];
  page: string;
  limit: string;
  total: string;
}
