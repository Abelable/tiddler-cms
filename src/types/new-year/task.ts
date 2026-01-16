export interface TaskListSearchParams {
  page: number;
  limit: number;
}

export interface Task {
  id: number;
  status: number;
  icon: string;
  name: string;
  desc: string;
  btnContent: string;
  luckScore: number;
  type: number;
  param: string;
  sort: number;
  createdAt: string;
  updatedAt: string;
}

export interface TaskListResult {
  list: Task[];
  page: string;
  limit: string;
  total: string;
}
