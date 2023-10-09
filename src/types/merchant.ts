import type { DepositInfo } from "./common";

export interface MerchantsSearchParams {
  status: number;
  type: number;
  name: string;
  mobile: string;
  page: number;
  limit: number;
}

export interface Merchant {
  id: number;
  type: number;
  name: string;
  mobile: string;
  status: number;
  depositInfo: DepositInfo;
  failureReason: string;
  createdAt: string;
  updatedAt: string;
}

export interface MerchantDetail extends Merchant {
  companyName: string;
  regionDesc: string;
  regionCodeList: string[];
  addressDetail: string;
  businessLicensePhoto: string;
  email: string;
  idCardNumber: string;
  idCardFrontPhoto: string;
  idCardBackPhoto: string;
  holdIdCardPhoto: string;
  bankCardNumber: string;
  bankCardOwnerName: string;
  bankName: string;
}

export interface MerchantsResult {
  list: Merchant[];
  page: string;
  limit: string;
  total: string;
}
