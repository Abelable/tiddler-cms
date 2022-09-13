import { Pagination } from "./common";
import { ChannelForm } from "./product";

export interface AgentsSearchParams {
  per_page: number;
  page: number;
}

export interface Agent {
  id: number;
  store: string;
  channel_id: string;
  company: string;
  contact: string;
  phone: string;
  email: string;
  activate_effective_day: number | undefined;
  recharge_effective_day: number | undefined;
  created_at: string;
  updated_at: string;
}

export interface AgentsResult {
  data: Agent[];
  meta: { pagination: Pagination };
}

export interface GoodsListSearchParams {
  agent_id: number;
  per_page: number;
  page: number;
}

// export interface Goods {
//   id: string;
//   name: string;
//   img: string;
//   tags: string[];
//   code: string;
//   channel: string;
//   created_at: string;
// }
export interface Goods {
  id: number;
  name: string;
  main_picture: string;
  sale_point: string;
  encoding: string;
  product: Partial<ChannelForm>;
  supplier_name: string;
  product_id: number;
  product_name: string;
  visible_type: number;
  agent_id: number;
  created_at: string;
}

export interface AgentOption {
  id: number;
  name: string;
}

export interface GoodsListResult {
  data: Goods[];
  meta: { pagination: Pagination };
}
