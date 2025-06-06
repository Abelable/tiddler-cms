import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { useAddConfig, useDeleteConfig } from "./use-optimistic-options";
import type { GoodsListResult, GiftListSearchParams } from "types/giftGoods";

export const useGiftGoodsList = (params: Partial<GiftListSearchParams>) => {
  const client = useHttp();
  return useQuery<GoodsListResult>(["gift_list", params], () =>
    client("gift/list", { data: params, method: "POST" })
  );
};

export const useAddGiftGoods = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ type, goodsIds }: { type: number; goodsIds: number[] }) =>
      client("gift/add", {
        data: { type, goodsIds },
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteGiftGoods = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("gift/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
