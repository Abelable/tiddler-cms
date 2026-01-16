import { useCallback, useMemo } from "react";
import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";

export const useNewYearGoodsListSearchParams = () => {
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

export const useNewYearGoodsListQueryKey = () => {
  const [params] = useNewYearGoodsListSearchParams();
  return ["new_year_goods_list", params];
};

export const useNewYearGoodsModal = () => {
  const [{ newYearGoodsCreate }, setNewYearGoodsModalOpen] = useUrlQueryParams([
    "newYearGoodsCreate",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setNewYearGoodsModalOpen({ newYearGoodsCreate: true }),
    [setNewYearGoodsModalOpen]
  );
  const close = useCallback(
    () => setUrlParams({ newYearGoodsCreate: "" }),
    [setUrlParams]
  );

  return {
    newYearGoodsModalOpen: newYearGoodsCreate === "true",
    open,
    close,
  };
};
