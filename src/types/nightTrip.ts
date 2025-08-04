export interface NightTripListSearchParams {
  page: number;
  limit: number;
}

export interface NightTrip {
  id: number;
  scenicId: number;
  scenicCover: number;
  scenicName: string;
  featureTips: string;
  recommendTips: string;
  guideTips: string;
  sort: number;
  createdAt: string;
  updatedAt: string;
}

export interface NightTripListResult {
  list: NightTrip[];
  page: string;
  limit: string;
  total: string;
}
