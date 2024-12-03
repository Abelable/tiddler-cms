import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";

import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils/index";
import type {
  FreightTemplateListResult,
  FreightTemplateListSearchParams,
  FreightTemplate,
  FreightTemplateOption,
} from "types/freightTemplate";

export const useFreightTemplateList = (
  params: Partial<FreightTemplateListSearchParams>
) => {
  const client = useHttp();
  return useQuery<FreightTemplateListResult>(
    ["freight_template_list", params],
    () => client("freight_template/list", { data: params, method: "POST" })
  );
};

export const useFreightTemplate = (id: number) => {
  const client = useHttp();
  return useQuery<FreightTemplate>(
    ["freight_template", { id }],
    () => client(`freight_template/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useAddFreightTemplate = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<FreightTemplate>) =>
      client("freight_template/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditFreightTemplate = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<FreightTemplate>) =>
      client("freight_template/edit", {
        data: cleanObject(params),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteFreightTemplate = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("freight_template/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useFreightTemplateOptions = () => {
  const client = useHttp();
  return useQuery<FreightTemplateOption[]>(["freight_template_options"], () =>
    client("freight_template/options")
  );
};
