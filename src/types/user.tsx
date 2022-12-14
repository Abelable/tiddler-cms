export interface UsersSearchParams {
  nickname: string;
  mobile: string;
  page: number;
  limit: number;
}

export interface User {
  id: number;
  avatar: string;
  nickname: string;
  mobile: string;
  gender: number;
  createdAt: string;
}

export interface UsersResult {
  list: User[];
  page: string;
  limit: string;
  total: string;
}
