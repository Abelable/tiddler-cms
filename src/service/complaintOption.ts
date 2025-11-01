import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils/index";

import type {
  ComplaintOption,
  ComplaintOptionListResult,
  ComplaintOptionListSearchParams,
} from "types/complaintOption";

export const useComplaintOptionList = (
  params: Partial<ComplaintOptionListSearchParams>
) => {
  const client = useHttp();
  return useQuery<ComplaintOptionListResult>(
    ["complaint_option_list", params],
    () => client("complaint_option/list", { data: params, method: "POST" })
  );
};

export const useComplaintOption = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<ComplaintOption>>(
    ["complaint_option", { id }],
    () => client(`complaint_option/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useAddComplaintOption = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<ComplaintOption>) =>
      client("complaint_option/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditComplaintOption = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<ComplaintOption>) =>
      client("complaint_option/edit", {
        data: cleanObject(params),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteComplaintOption = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("complaint_option/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useComplaintOptions = () => {
  const client = useHttp();
  return useQuery<{ id: number; content: string }[]>(
    ["complaint_options"],
    () => client("complaint_option/options")
  );
};
