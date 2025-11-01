export interface ComplaintOptionListSearchParams {
  type: number;
  page: number;
  limit: number;
}

export interface ComplaintOption {
  id: number;
  type: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface ComplaintOptionListResult {
  list: ComplaintOption[];
  page: string;
  limit: string;
  total: string;
}
