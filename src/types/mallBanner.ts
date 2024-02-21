export interface MallBannerListSearchParams {
  status: number | undefined;
  scene: number | undefined;
  page: number;
  limit: number;
}

export interface MallBanner {
  id: number;
  status: number;
  cover: string;
  desc: string;
  scene: number;
  param: string;
  createdAt: string;
  updatedAt: string;
}

export interface MallBannerListResult {
  list: MallBanner[];
  page: string;
  limit: string;
  total: string;
}
