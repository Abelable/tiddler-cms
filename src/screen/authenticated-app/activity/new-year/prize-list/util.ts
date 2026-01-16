import { useCallback, useMemo } from "react";
import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { usePrize } from "service/new-year/prize";

export const usePrizeListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams(["page", "limit"]);
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

export const usePrizeListQueryKey = () => {
  const [params] = usePrizeListSearchParams();
  return ["new_year_prize_list", params];
};

export const usePrizeModal = () => {
  const [{ prizeCreate }, setPrizeModalOpen] = useUrlQueryParams([
    "prizeCreate",
  ]);
  const [{ editingPrizeId }, setEditingPrizeId] = useUrlQueryParams([
    "editingPrizeId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const { data: editingPrize, isLoading } = usePrize(Number(editingPrizeId));

  const open = useCallback(
    () => setPrizeModalOpen({ prizeCreate: true }),
    [setPrizeModalOpen]
  );
  const startEdit = useCallback(
    (id: number) => setEditingPrizeId({ editingPrizeId: `${id}` }),
    [setEditingPrizeId]
  );
  const close = useCallback(
    () => setUrlParams({ prizeCreate: "", editingPrizeId: "" }),
    [setUrlParams]
  );

  return {
    prizeModalOpen: prizeCreate === "true" || !!editingPrizeId,
    editingPrizeId,
    editingPrize,
    isLoading,
    open,
    startEdit,
    close,
  };
};
