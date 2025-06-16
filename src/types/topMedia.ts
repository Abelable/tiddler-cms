export interface TopMediaListSearchParams {
  page: number;
  limit: number;
}

export interface TopMedia {
  id: number;
  cover: string;
  title: string;
  mediaType: number;
  mediaId: number;
  createdAt: string;
  updatedAt: string;
}

export interface TopMediaListResult {
  list: TopMedia[];
  page: string;
  limit: string;
  total: string;
}
