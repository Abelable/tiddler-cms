import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useComplaintOption } from "service/complaintOption";

export const useComplaintOptionListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams(["type", "page", "limit"]);
  return [
    useMemo(
      () => ({
        page: Number(params.page) || 1,
        limit: Number(params.limit) || 10,
        ...params,
      }),
      [params]
    ),
    setParams,
  ] as const;
};

export const useComplaintOptionListQueryKey = () => {
  const [params] = useComplaintOptionListSearchParams();
  return ["complaint_option_list", params];
};

export const useComplaintOptionModal = () => {
  const [{ complaintOptionCreate }, setComplaintOptionModalOpen] =
    useUrlQueryParams(["complaintOptionCreate"]);
  const [{ editingComplaintOptionId }, setEditingComplaintOptionId] =
    useUrlQueryParams(["editingComplaintOptionId"]);
  const setUrlParams = useSetUrlSearchParams();
  const { data: editingComplaintOption, isLoading } = useComplaintOption(
    Number(editingComplaintOptionId)
  );

  const open = useCallback(
    () => setComplaintOptionModalOpen({ complaintOptionCreate: true }),
    [setComplaintOptionModalOpen]
  );
  const startEdit = useCallback(
    (id: number) =>
      setEditingComplaintOptionId({ editingComplaintOptionId: `${id}` }),
    [setEditingComplaintOptionId]
  );
  const close = useCallback(
    () =>
      setUrlParams({ complaintOptionCreate: "", editingComplaintOptionId: "" }),
    [setUrlParams]
  );

  return {
    complaintOptionModalOpen:
      complaintOptionCreate === "true" || !!editingComplaintOptionId,
    editingComplaintOptionId,
    editingComplaintOption,
    isLoading,
    open,
    startEdit,
    close,
  };
};
