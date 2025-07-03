import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import type {
  GiftGoodsListResult,
  GiftGoodsListSearchParams,
} from "types/giftGoods";

export const useGiftGoodsList = (
  params: Partial<GiftGoodsListSearchParams>
) => {
  const client = useHttp();
  return useQuery<GiftGoodsListResult>(["gift_goods_list", params], () =>
    client("gift/list", { data: params, method: "POST" })
  );
};

export const useAddGiftGoods = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({
      typeId,
      goodsIds,
      duration,
    }: {
      typeId: number;
      goodsIds: number[];
      duration: number;
    }) =>
      client("gift/add", {
        data: { typeId, goodsIds, duration },
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditDuration = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, duration }: { id: number; duration: number }) =>
      client("gift/edit_duration", {
        data: { id, duration },
        method: "POST",
      }),
    useEditConfig(queryKey)
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
