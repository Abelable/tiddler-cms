export interface ShopScenicListSearchParams {
  status: number;
  page: number;
  limit: number;
}

export interface ShopScenic {
  id: number;
  status: number;
  failureReason: string;
  scenicId: number;
  scenicName: string;
  scenicImage: string;
  shopLogo: string;
  shopName: string;
  merchantName: string;
  businessLicense: string;
  createdAt: string;
  updatedAt: string;
}

export interface ShopScenicListResult {
  list: ShopScenic[];
  page: string;
  limit: string;
  total: string;
}
