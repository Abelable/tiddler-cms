export interface HomeSearchParams {
  start_created_at: string;
  end_created_at: string;
  agent_id: number;
  goods_id: number;
}

export interface SecondHomeSearchParams {
  date: string;
  agent_id: number;
  goods_id: number;
}

export interface ThirdHomeSearchParams extends SecondHomeSearchParams {
  key: string;
}

export interface Home {
  id: number;
  key: string;
  agent_id?: number;
  agent_name: string;
  goods_name: string;
  count: number;
  shipped_count: number;
  activated_count: number;
  shipped_rate: number;
  activated_rate: string;
  recharged_count: number;
  recharged_rate: number;
  transfer_rate: number;
  date?: string;
  second_date?: string;
  children?: Home[];
}

export interface HomeResult {
  list: Home[];
  total: Partial<Home>;
}
