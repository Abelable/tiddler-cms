export interface UsersSearchParams {
  nickname: string;
  mobile: string;
  superiorId: number;
  page: number;
  limit: number;
}

export interface User {
  id: number;
  avatar: string;
  nickname: string;
  mobile: string;
  gender: number;
  superiorId: number;
  createdAt: string;
  updatedAt: string;
}

export interface UsersResult {
  list: User[];
  page: string;
  limit: string;
  total: string;
}

export interface UserOption {
  id: number;
  avatar: string;
  nickname: string;
}
