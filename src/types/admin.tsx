export interface AdminsSearchParams {
  nickname: string;
  account: string;
  roleId: number | undefined;
  page: number;
  limit: number;
}

export interface Admin {
  id: number;
  avatar: string;
  nickname: string;
  account: string;
  roleId: number;
  createdAt: string;
  updatedAt: string;
}

export interface AdminsResult {
  list: Admin[];
  page: string;
  limit: string;
  total: string;
}
