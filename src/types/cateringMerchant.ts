import type { DepositInfo } from "./common";

export interface CateringMerchantsSearchParams {
  status: number;
  type: number;
  name: string;
  mobile: string;
  page: number;
  limit: number;
}

export interface CateringMerchant {
  id: number;
  status: number;
  failureReason: string;
  type: number;
  companyName?: string;
  name: string;
  mobile: string;
  depositInfo: DepositInfo;
  createdAt: string;
  updatedAt: string;
}

export interface CateringMerchantDetail extends CateringMerchant {
  regionDesc: string;
  regionCodeList: string[];
  addressDetail: string;
  businessLicensePhoto: string;
  hygienicLicensePhoto: string;
  email: string;
  idCardNumber: string;
  idCardFrontPhoto: string;
  idCardBackPhoto: string;
  holdIdCardPhoto: string;
  bankCardNumber: string;
  bankCardOwnerName: string;
  bankName: string;
}

export interface CateringMerchantsResult {
  list: CateringMerchant[];
  page: string;
  limit: string;
  total: string;
}
