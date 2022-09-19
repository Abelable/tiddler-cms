import { useQuery } from "react-query";
import { useHttp } from "./http";
import type { RolesResult, RolesSearchParams } from "types/role";

export const useRoles = (params: Partial<RolesSearchParams>) => {
  const client = useHttp();
  return useQuery<RolesResult>(["roles", params], () =>
    client("/admin/role/list", { data: params })
  );
};
