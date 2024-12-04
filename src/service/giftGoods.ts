import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { useAddConfig, useDeleteConfig } from "./use-optimistic-options";
import type { GoodsListResult, GoodsListSearchParams } from "types/giftGoods";

export const useGiftGoodsList = (params: Partial<GoodsListSearchParams>) => {
  const client = useHttp();
  return useQuery<GoodsListResult>(["gift_goods_list", params], () =>
    client("gift_goods/list", { data: params, method: "POST" })
  );
};

export const useAddGiftGoods = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ type, goodsIds }: { type: number; goodsIds: number[] }) =>
      client("gift_goods/add", {
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
      client("gift_goods/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
