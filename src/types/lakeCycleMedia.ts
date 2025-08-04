export interface LakeCycleMediaListSearchParams {
  page: number;
  limit: number;
}

export interface LakeCycleMedia {
  id: number;
  mediaType: number;
  mediaId: number;
  cover: string;
  title: string;
  sort: number;
  createdAt: string;
  updatedAt: string;
}

export interface LakeCycleMediaListResult {
  list: LakeCycleMedia[];
  page: string;
  limit: string;
  total: string;
}
