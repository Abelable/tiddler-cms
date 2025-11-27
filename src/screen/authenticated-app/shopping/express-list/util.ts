import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useExpress } from "service/express";

export const useExpressesSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "name",
    "code",
    "page",
    "limit",
  ]);
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

export const useExpressesQueryKey = () => {
  const [params] = useExpressesSearchParams();
  return ["expresses", params];
};

export const useExpressModal = () => {
  const [{ expressCreate }, setExpressModalOpen] = useUrlQueryParams([
    "expressCreate",
  ]);
  const [{ editingExpressId }, setEditingExpressId] = useUrlQueryParams([
    "editingExpressId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const { data: editingExpress, isLoading } = useExpress(
    Number(editingExpressId)
  );

  const open = useCallback(
    () => setExpressModalOpen({ expressCreate: true }),
    [setExpressModalOpen]
  );
  const startEdit = useCallback(
    (id: number) => setEditingExpressId({ editingExpressId: `${id}` }),
    [setEditingExpressId]
  );
  const close = useCallback(
    () => setUrlParams({ expressCreate: "", editingExpressId: "" }),
    [setUrlParams]
  );

  return {
    expressModalOpen: expressCreate === "true" || !!editingExpressId,
    editingExpressId,
    editingExpress,
    isLoading,
    open,
    startEdit,
    close,
  };
};
