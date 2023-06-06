export interface MerchantsSearchParams {
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
  orderId: string;
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

export interface MerchantOrdersSearchParams {
  page: number;
  limit: number;
}

export interface MerchantOrder {
  id: number;
  orderSn: string;
  paymentAmount: string;
  status: number;
  payId: number;
  createdAt: string;
  updatedAt: string;
}

export interface MerchantOrdersResult {
  list: MerchantOrder[];
  page: string;
  limit: string;
  total: string;
}
