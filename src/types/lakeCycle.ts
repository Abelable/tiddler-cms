export interface LakeCycleListSearchParams {
  page: number;
  limit: number;
}

export interface LakeCycle {
  id: number;
  routeId: number;
  scenicId: number;
  scenicCover: number;
  scenicName: string;
  desc: string;
  distance: string;
  duration: string;
  time: string;
  sort: number;
  createdAt: string;
  updatedAt: string;
}

export interface LakeCycleListResult {
  list: LakeCycle[];
  page: string;
  limit: string;
  total: string;
}
