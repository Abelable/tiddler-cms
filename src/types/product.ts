import type { Pagination, RegionItem } from "./common";

export interface modeOption {
  name: string;
  value: number;
}
export interface ChannelsSearchParams {
  goods_name: string;
  goods_code: string;
  supplier_id: number;
  is_removed: string;
  per_page: number;
  page: number;
}

export interface Channel {
  id: number;
  name: string;
  encoding: string;
  operator_id: number;
  is_auto_product: number;
  created_at: string;
  province?: { name: string };
  city?: { name: string };
}

export interface ChannelsResult {
  data: Channel[];
  meta: { pagination: Pagination };
}

export interface ChannelForm {
  id: number;
  operator_id: number;
  supplier_id: number;
  name: string;
  encoding: string;
  province_id: number;
  city_id: number;
  is_required_idphoto: boolean;
  need_id_card_pic: boolean;
  dont_ship_addresses: RegionItem[];
  min_age_limit: number;
  max_age_limit: number;
  per_person_card_num_limit: number;
  per_person_card_num_limit_check_period: number;
  is_used_global_prewarn_setting: number;
  phone_repeated_prewarn_num: number;
  phone_repeated_prewarn_num_check_period: number;
  address_repeated_prewarn_num: number;
  address_repeated_prewarn_num_check_period: number;
  is_filter_blacklist: number;
}

export interface ChannelGoodsListSearchParams {
  product_id: number;
  page: number;
  per_page: number;
}

export interface ChannelGoods {
  id: string;
  name: string;
  is_removed: number;
}

export interface ChannelGoodsListResult {
  data: ChannelGoods[];
  meta: { pagination: Pagination };
}

export interface ChannelOption {
  id: number;
  name: string;
}

export interface GoodsListSearchParams {
  goods_name: string;
  supplier_id: number;
  product_code: string;
  goods_code: string;
  operator_id: number;
  ship_province_id: number;
  ship_city_id: number;
  province_id: number;
  city_id: number;
  is_removed: string;
  per_page: number;
  page: number;
}

export interface GoodsAgent {
  id: number;
  store: string;
  phone: string;
  is_removed: number;
}
export interface GoodsForm {
  id: number;
  name: string;
  main_picture: string;
  encoding: string;
  product_id: number;
  sale_point: string;
  is_required_upload_picture: number;
  detail: string;
  remark: string;
  visible_status: number;
  agents: GoodsAgent[];
  agent_ids: string[];
  is_removed: number;
  is_forced_sync: number;
}

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
  visible_status: number;
  agent_id: number;
  created_at: string;
}

export interface GoodsListResult {
  data: Goods[];
  meta: { pagination: Pagination };
}

export interface DownedGoodsListSearchParams extends GoodsListSearchParams {}

export interface DownedGoods extends Goods {}

export interface DownedGoodsListResult {
  data: DownedGoods[];
  meta: { pagination: Pagination };
}

export interface AgentsSearchParams {
  per_page: number;
  page: number;
}

export interface GoodsOption {
  id: number;
  name: string;
}

export interface ProductOption {
  id: number;
  name: string;
  is_required_idphoto: number;
}

export interface ChannelEncodingOption {
  encoding: string;
  name: string;
}
