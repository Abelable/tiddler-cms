export interface GiftTypeOption {
  id: number;
  name: string;
}

export interface GiftTypeListSearchParams {
  page: number;
  limit: number;
}

export interface GiftType {
  id: number;
  status: number;
  name: string;
  sort: number;
}

export interface GiftTypeListResult {
  list: GiftType[];
  page: string;
  limit: string;
  total: string;
}
