import type { depositInfo } from "./common";

export interface CateringProvidersSearchParams {
  status: number;
  type: number;
  name: string;
  mobile: string;
  page: number;
  limit: number;
}

export interface CateringProvider {
  id: number;
  type: number;
  name: string;
  mobile: string;
  status: number;
  depositInfo: depositInfo;
  failureReason: string;
  createdAt: string;
  updatedAt: string;
}

export interface CateringProviderDetail extends CateringProvider {
  companyName: string;
  regionDesc: string;
  regionCodeList: string[];
  addressDetail: string;
  businessLicensePhoto: string;
  email: string;
  idCardNumber: string;
  idCardFrontPhoto: string;
  idCardBackPhoto: string;
}

export interface CateringProvidersResult {
  list: CateringProvider[];
  page: string;
  limit: string;
  total: string;
}
