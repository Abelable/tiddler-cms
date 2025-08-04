import { useCallback, useMemo } from "react";
import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";

export const useLakeCycleMediaListSearchParams = () => {
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

export const useLakeCycleMediaListQueryKey = () => {
  const [params] = useLakeCycleMediaListSearchParams();
  return ["top_media_list", params];
};

export const useLakeCycleMediaModal = () => {
  const [{ lakeCycleMediaCreate }, setLakeCycleMediaModalOpen] =
    useUrlQueryParams(["lakeCycleMediaCreate"]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    () => setLakeCycleMediaModalOpen({ lakeCycleMediaCreate: true }),
    [setLakeCycleMediaModalOpen]
  );
  const close = useCallback(
    () => setUrlParams({ lakeCycleMediaCreate: "" }),
    [setUrlParams]
  );

  return {
    lakeCycleMediaModalOpen: lakeCycleMediaCreate === "true",
    open,
    close,
  };
};
