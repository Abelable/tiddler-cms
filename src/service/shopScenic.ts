import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { useApproveConfig, useRejectConfig } from "./use-optimistic-options";
import type {
  ShopScenicListSearchParams,
  ShopScenicListResult,
} from "types/shopScenic";

export const useShopScenicList = (
  params: Partial<ShopScenicListSearchParams>
) => {
  const client = useHttp();
  return useQuery<ShopScenicListResult>(["shop_scenic_list", params], () =>
    client("scenic/shop/scenic/list", { data: params, method: "POST" })
  );
};

export const useApproveShopScenic = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("scenic/shop/scenic/approve", {
        data: { id },
        method: "POST",
      }),
    useApproveConfig(queryKey)
  );
};

export const useRejectShopScenic = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (data: { id: number; failureReason: string }) =>
      client("scenic/shop/scenic/reject", {
        data,
        method: "POST",
      }),
    useRejectConfig(queryKey)
  );
};

export const useDeleteShopScenic = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("scenic/shop/scenic/delete", {
        data: { id },
        method: "POST",
      }),
    useRejectConfig(queryKey)
  );
};
