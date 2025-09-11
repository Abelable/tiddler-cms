export interface LakeHomestayListSearchParams {
  page: number;
  limit: number;
}

export interface LakeHomestay {
  id: number;
  hotelId: number;
  cover: number;
  name: string;
  sort: number;
  createdAt: string;
  updatedAt: string;
}

export interface LakeHomestayListResult {
  list: LakeHomestay[];
  page: string;
  limit: string;
  total: string;
}
