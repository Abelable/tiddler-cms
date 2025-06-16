import { useCallback, useMemo } from "react";
import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";

export const useTopMediaListSearchParams = () => {
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

export const useTopMediaListQueryKey = () => {
  const [params] = useTopMediaListSearchParams();
  return ["top_media_list", params];
};

export const useTopMediaModal = () => {
  const [{ topMediaCreate }, setTopMediaModalOpen] = useUrlQueryParams([
    "topMediaCreate",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setTopMediaModalOpen({ topMediaCreate: true }),
    [setTopMediaModalOpen]
  );
  const close = useCallback(
    () => setUrlParams({ topMediaCreate: "", editingTopMediaId: "" }),
    [setUrlParams]
  );

  return {
    topMediaModalOpen: topMediaCreate === "true",
    open,
    close,
  };
};
