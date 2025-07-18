import type { DepositInfo } from "./common";

export interface MerchantsSearchParams {
  status: number;
  name: string;
  mobile: string;
  page: number;
  limit: number;
}

export interface Merchant {
  id: number;
  status: number;
  failureReason: string;
  companyName: string;
  name: string;
  mobile: string;
  depositInfo: DepositInfo;
  createdAt: string;
  updatedAt: string;
}

export interface MerchantDetail extends Merchant {
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
