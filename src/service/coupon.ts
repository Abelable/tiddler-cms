import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { cleanObject } from "utils";
import {
  useAddCouponConfig,
  useDeleteConfig,
  useEditConfig,
  useDownCouponConfig,
  useUpConfig,
} from "./use-optimistic-options";

import type {
  Coupon,
  CouponForm,
  CouponListResult,
  CouponListSearchParams,
} from "types/coupon";

export const useCouponList = (params: Partial<CouponListSearchParams>) => {
  const client = useHttp();
  return useQuery<CouponListResult>(["coupon_list", params], () =>
    client("goods/coupon/list", { data: params, method: "POST" })
  );
};

export const useCoupon = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<Coupon>>(
    ["coupon", { id }],
    () => client("goods/coupon/detail", { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useAddCoupon = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<CouponForm>) =>
      client("goods/coupon/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddCouponConfig(queryKey)
  );
};

export const useEditCoupon = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Coupon>) =>
      client("goods/coupon/edit", {
        data: cleanObject(params),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useEditReceivedNum = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, num }: { id: number; num: number }) =>
      client("goods/coupon/edit_received_num", {
        data: { id, num },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDownCoupon = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("goods/coupon/down", {
        data: { id },
        method: "POST",
      }),
    useDownCouponConfig(queryKey)
  );
};

export const useUpCoupon = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("goods/coupon/up", {
        data: { id },
        method: "POST",
      }),
    useUpConfig(queryKey)
  );
};

export const useDeleteCoupon = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("goods/coupon/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
