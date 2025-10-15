export interface TaskListSearchParams {
  status: number | undefined;
  productType: number | undefined;
  productName: string;
  page: number;
  limit: number;
}

export interface Task {
  id: number;
  status: number;
  productType: number;
  productId: number;
  productName: string;
  tel: string;
  address: string;
  longitude: number;
  latitude: number;
  rewardTotal: number;
  rewardList: number[];
  createdAt: string;
  updatedAt: string;
}

export interface TaskListResult {
  list: Task[];
  page: string;
  limit: string;
  total: string;
}
