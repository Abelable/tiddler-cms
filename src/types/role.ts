export interface RolesSearchParams {
  page: number;
  limit: number;
}

export interface Role {
  id: number;
  name: string;
  desc: string;
}

export interface RolesResult {
  list: Role[];
  page: string;
  limit: string;
  total: string;
}

export interface RoleOption {
  id: number;
  name: string;
}
