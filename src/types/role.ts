export interface RolesSearchParams {
  page: number;
  limit: number;
}

export interface RoleItem {
  id: number;
  name: string;
  desc: string;
  createdAt: string;
}

export interface RolesResult {
  list: RoleItem[];
  page: string;
  limit: string;
  total: string;
}
