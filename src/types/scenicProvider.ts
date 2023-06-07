export interface ProvidersSearchParams {
  name: string;
  mobile: string;
  page: number;
  limit: number;
}

export interface Provider {
  id: number;
  companyName: string;
  name: string;
  mobile: string;
  status: number;
  failureReason: string;
  orderId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProviderDetail extends Provider {
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

export interface ProvidersResult {
  list: Provider[];
  page: string;
  limit: string;
  total: string;
}

export interface ProviderOrdersSearchParams {
  page: number;
  limit: number;
}

export interface ProviderOrder {
  id: number;
  companyName: string;
  orderSn: string;
  paymentAmount: string;
  status: number;
  payId: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProviderOrdersResult {
  list: ProviderOrder[];
  page: string;
  limit: string;
  total: string;
}
