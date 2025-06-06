import { useCallback, useMemo } from "react";
import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";

export const useGiftListSearchParams = () => {
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

export const useGiftGoodsListQueryKey = () => {
  const [params] = useGiftListSearchParams();
  return ["gift_list", params];
};

export const useGiftGoodsModal = () => {
  const [{ giftGoodsCreate }, setGiftGoodsModalOpen] = useUrlQueryParams([
    "giftGoodsCreate",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setGiftGoodsModalOpen({ giftGoodsCreate: true }),
    [setGiftGoodsModalOpen]
  );
  const close = useCallback(
    () => setUrlParams({ giftGoodsCreate: "" }),
    [setUrlParams]
  );

  return {
    giftGoodsModalOpen: giftGoodsCreate === "true",
    open,
    close,
  };
};
