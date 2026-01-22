import type { Shop } from "./shop";
import type { User } from "./user";

export interface IncomeWithdrawListSearchParams {
  status: number | undefined;
  scene: number | undefined;
  path: number | undefined;
  userId: number | undefined;
  page: number;
  limit: number;
}

export interface IncomeWithdraw {
  id: number;
  status: number;
  failureReason: string;
  userInfo: User;
  shopInfo: Shop;
  merchantInfo: { code: string; name: string; bankName: string };
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

export interface IncomeWithdrawListResult {
  list: IncomeWithdraw[];
  page: string;
  limit: string;
  total: string;
}

export interface IncomeWithdrawDetail extends IncomeWithdraw {}
