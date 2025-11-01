export interface EvaluationTagListSearchParams {
  scene: number;
  type: number;
  page: number;
  limit: number;
}

export interface EvaluationTag {
  id: number;
  scene: number;
  type: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface EvaluationTagListResult {
  list: EvaluationTag[];
  page: string;
  limit: string;
  total: string;
}
