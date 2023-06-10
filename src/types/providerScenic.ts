export interface ProviderScenicListSearchParams {
  status: number;
  page: number;
  limit: number;
}

export interface ProviderScenic {
  id: number;
  status: number;
  failureReason: string;
  name: string;
  providerCompanyName: string;
  providerBusinessLicensePhoto: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProviderScenicListResult {
  list: ProviderScenic[];
  page: string;
  limit: string;
  total: string;
}
