export interface PromoterListSearchParams {
  nickname: string;
  mobile: string;
  level: number;
  path: number;
  page: number;
  limit: number;
}

export interface Promoter {
  id: number;
  status: number;
  user_id: number;
  avatar: string;
  nickname: string;
  mobile: string;
  level: number;
  scene: number;
  path: number;
  expirationTime: string;
  promotedUserNumber: number;
  selfCommissionSum: number;
  shareCommissionSum: number;
  teamCommissionSum: number;
  settledCommissionSum: number;
  createdAt: string;
  updatedAt: string;
}

export interface PromoterListResult {
  list: Promoter[];
  page: string;
  limit: string;
  total: string;
}

export interface PromoterOption {
  id: number;
  avatar: string;
  nickname: string;
  level: number;
}

export interface TopPromoter extends Promoter {
  rank: number;
  totalCommission: number;
}

export interface TopPromoterListResult {
  list: TopPromoter[];
  page: string;
  limit: string;
  total: string;
}
