export interface BannerListSearchParams {
  position: number | undefined;
  status: number | undefined;
  scene: number | undefined;
  page: number;
  limit: number;
}

export interface Banner {
  id: number;
  status: number;
  cover: string;
  desc: string;
  scene: number;
  param: string;
  sort: number;
  createdAt: string;
  updatedAt: string;
}

export interface BannerListResult {
  list: Banner[];
  page: string;
  limit: string;
  total: string;
}
