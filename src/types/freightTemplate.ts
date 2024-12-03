export interface FreightTemplateListSearchParams {
  page: number;
  limit: number;
}

export interface FormAreaItem {
  pickedCityCodes: string[];
  fee: number;
}

interface AreaItem {
  pickedCityCodes: string;
  fee: number;
}

export interface FreightTemplate {
  id: number;
  name: string;
  title: string;
  computeMode: number;
  freeQuota: number;
  areaList: AreaItem[];
  createdAt: string;
  updatedAt: string;
}

export interface FreightTemplateListResult {
  list: FreightTemplate[];
  page: string;
  limit: string;
  total: string;
}

export interface FreightTemplateOption {
  id: number;
  name: string;
}
