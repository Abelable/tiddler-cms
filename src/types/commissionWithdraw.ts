export interface CommissionWithdrawListSearchParams {
  status: number | undefined;
  scene: number | undefined;
  path: number | undefined;
  userId: number | undefined;
  page: number;
  limit: number;
}

export interface CommissionWithdraw {
  id: number;
  status: number;
  failureReason: string;
  userInfo: { id: number; avatar: string; nickname: string };
  bankCardInfo: { code: string; name: string; bankName: string };
  scene: number;
  path: number;
  withdrawAmount: number;
  taxFee: number;
  handlingFee: number;
  actualAmount: number;
  remark: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommissionWithdrawListResult {
  list: CommissionWithdraw[];
  page: string;
  limit: string;
  total: string;
}

export interface CommissionWithdrawDetail extends CommissionWithdraw {}
