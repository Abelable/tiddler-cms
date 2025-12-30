import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useConfirmOrderConfig,
  useShipOrderConfig,
  useExportOrderConfig,
  useRefundOrderConfig,
  useCancelOrderConfig,
} from "./use-optimistic-options";

import type {
  OrderDetail,
  OrderListResult,
  OrderListSearchParams,
  Shipment,
} from "types/goodsOrder";
import type { ShippingInfo } from "types/common";
import type { GoodsOption } from "types/goods";

export const useOrderList = (params: Partial<OrderListSearchParams>) => {
  const client = useHttp();
  return useQuery<OrderListResult>(["goods_order_list", params], () =>
    client("goods/order/list", {
      data: params,
      method: "POST",
    })
  );
};

export const useOrder = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<OrderDetail>>(
    ["goods_order_detail", { id }],
    () => client("goods/order/detail", { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useCancelOrder = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (ids: number[]) =>
      client("goods/order/cancel", {
        data: { ids },
        method: "POST",
      }),
    useCancelOrderConfig(queryKey)
  );
};

export const useRefundOrder = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (orderId: number) =>
      client("goods/order/refund", {
        data: { orderId },
        method: "POST",
      }),
    useRefundOrderConfig(queryKey)
  );
};

export const useConfirmOrder = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (ids: number[]) =>
      client("goods/order/confirm", {
        data: { ids },
        method: "POST",
      }),
    useConfirmOrderConfig(queryKey)
  );
};

export const useExportOrder = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (ids: number[]) =>
      client("goods/order/export", {
        data: { ids },
        method: "POST",
        headers: {
          responseType: "arraybuffer",
        },
      }),
    useExportOrderConfig(queryKey)
  );
};

export const useOrderedUserOptions = () => {
  const client = useHttp();
  return useQuery<{ id: number; avatar: string; nickname: string }[]>(
    ["ordered_user_options"],
    () => client("goods/order/user_options")
  );
};

export const useOrderedGoodsOptions = () => {
  const client = useHttp();
  return useQuery<GoodsOption[]>(["ordered_goods_options"], () =>
    client("goods/order/goods_options")
  );
};

export const useShipOrderCount = () => {
  const client = useHttp();
  return useQuery(["ship_order_count"], () =>
    client("goods/order/ship_order_count")
  );
};

export const useModifyOrderAddressInfo = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (data: {
      id: number;
      consignee: string;
      mobile: string;
      address: string;
    }) =>
      client("goods/order/modify_address_info", {
        data,
        method: "POST",
      }),
    useShipOrderConfig(queryKey)
  );
};

export const useShipOrder = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (data: Shipment) =>
      client("goods/order/ship", {
        data,
        method: "POST",
      }),
    useShipOrderConfig(queryKey)
  );
};

export const useModifyShipment = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (data: Partial<Shipment>) =>
      client("goods/order/modify_shipment", {
        data,
        method: "POST",
      }),
    useShipOrderConfig(queryKey)
  );
};

export const useTrackingInfo = (id: number) => {
  const client = useHttp();
  return useQuery<ShippingInfo>(
    ["tracking_info", { id }],
    () => client("goods/order/tracking_info", { data: { id } }),
    {
      enabled: !!id,
    }
  );
};
