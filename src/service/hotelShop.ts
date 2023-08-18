import { useQuery } from "react-query";
import { useHttp } from "./http";
import type { Shop, ShopsResult, ShopsSearchParams } from "types/shop";

export const useShops = (params: Partial<ShopsSearchParams>) => {
  const client = useHttp();
  return useQuery<ShopsResult>(["hotel_shops", params], () =>
    client("hotel/shop/list", { data: params, method: "POST" })
  );
};

export const useShop = (id: number) => {
  const client = useHttp();
  return useQuery<Shop>(
    ["shop", { id }],
    () => client(`hotel/shop/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};
