export interface LakeTripListSearchParams {
  page: number;
  limit: number;
}

export interface LakeTrip {
  id: number;
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

export interface LakeTripListResult {
  list: LakeTrip[];
  page: string;
  limit: string;
  total: string;
}
