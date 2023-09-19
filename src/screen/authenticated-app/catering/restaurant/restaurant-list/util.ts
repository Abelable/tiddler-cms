import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useRestaurant } from "service/restaurant";

export const useRestaurantListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "name",
    "categoryId",
    "status",
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

export const useRestaurantListQueryKey = () => {
  const [params] = useRestaurantListSearchParams();
  return ["restaurant_list", params];
};

export const useRestaurantModal = () => {
  const [{ restaurantCreate }, setAdminModalOpen] = useUrlQueryParams([
    "restaurantCreate",
  ]);
  const [{ editingRestaurantId }, setEditingRestaurantId] = useUrlQueryParams([
    "editingRestaurantId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const {
    data: editingRestaurant,
    isLoading,
    error,
  } = useRestaurant(Number(editingRestaurantId));

  const open = useCallback(
    () => setAdminModalOpen({ restaurantCreate: true }),
    [setAdminModalOpen]
  );
  const startEdit = useCallback(
    (id: number) => setEditingRestaurantId({ editingRestaurantId: `${id}` }),
    [setEditingRestaurantId]
  );
  const close = useCallback(
    () => setUrlParams({ restaurantCreate: "", editingRestaurantId: "" }),
    [setUrlParams]
  );

  return {
    restaurantModalOpen: restaurantCreate === "true" || !!editingRestaurantId,
    editingRestaurantId,
    editingRestaurant,
    isLoading,
    error,
    open,
    startEdit,
    close,
  };
};
