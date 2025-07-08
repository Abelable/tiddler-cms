import { useQuery } from "react-query";
import { useHttp } from "./http";
import type { Shop, ShopsResult, ShopsSearchParams } from "types/shop";

export const useShops = (params: Partial<ShopsSearchParams>) => {
  const client = useHttp();
  return useQuery<ShopsResult>(["scenic_shops", params], () =>
    client("scenic/shop/list", { data: params, method: "POST" })
  );
};

export const useShop = (id: number) => {
  const client = useHttp();
  return useQuery<Shop>(
    ["shop", { id }],
    () => client(`scenic/shop/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};
