export interface AuthInfoListSearchParams {
  status: number;
  name: string;
  mobile: string;
  page: number;
  limit: number;
}

export interface AuthInfo {
  id: number;
  userId: number;
  name: string;
  mobile: string;
  status: number;
  failureReason: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthInfoDetail extends AuthInfo {
  idCardNumber: string;
  idCardFrontPhoto: string;
  idCardBackPhoto: string;
  holdIdCardPhoto: string;
}

export interface AuthInfoListResult {
  list: AuthInfo[];
  page: string;
  limit: string;
  total: string;
}
