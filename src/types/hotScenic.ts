export interface HotScenicListSearchParams {
  page: number;
  limit: number;
}

export interface HotScenic {
  id: number;
  scenicId: number;
  scenicCover: number;
  scenicName: string;
  recommendReason: string;
  interestedUserNumber: number;
  sort: number;
  createdAt: string;
  updatedAt: string;
}

export interface HotScenicListResult {
  list: HotScenic[];
  page: string;
  limit: string;
  total: string;
}
