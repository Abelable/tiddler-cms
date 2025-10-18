export interface TaskListSearchParams {
  status: number | undefined;
  merchantType: number | undefined;
  merchantName: string;
  page: number;
  limit: number;
}

export interface Task {
  id: number;
  status: number;
  merchantType: number;
  productId: number;
  merchantName: string;
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
