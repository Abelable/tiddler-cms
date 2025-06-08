import { useQuery } from "react-query";
import { useHttp } from "./http";

import type { DataOption } from "types/common";
import type { Shop, ShopsResult, ShopsSearchParams } from "types/shop";

export const useShops = (params: Partial<ShopsSearchParams>) => {
  const client = useHttp();
  return useQuery<ShopsResult>(["shops", params], () =>
    client("shop/list", { data: params, method: "POST" })
  );
};

export const useShop = (id: number) => {
  const client = useHttp();
  return useQuery<Shop>(
    ["shop", { id }],
    () => client(`shop/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useShopOptions = () => {
  const client = useHttp();
  return useQuery<DataOption[]>(["shop_options"], () => client("shop/options"));
};
