import { QueryKey, useQueryClient } from "react-query";

export const useConfig = (
  queryKey: QueryKey,
  callback: (target: any, old: any) => any
) => {
  const queryClient = useQueryClient();
  return {
    async onMutate(target: any) {
      const previousItems = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old: any) => callback(target, old));
      return { previousItems };
    },
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    onError(error: any, newItem: any, context: any) {
      queryClient.setQueryData(queryKey, context.previousItems);
    },
  };
};

export const useAddConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) =>
    old
      ? {
          ...old,
          data: [
            {
              id: old.data[0] ? `${Number(old.data[0].id) + 1}` : "1",
              ...target,
            },
            ...old.data,
          ],
        }
      : null
  );

export const useEditConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) =>
    old
      ? {
          ...old,
          data: old.data.map((item: any) =>
            item.id === target.id ? { ...item, ...target } : item
          ),
        }
      : null
  );

export const useDeleteConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => ({
    ...old,
    data: old.data.filter((item: any) => item.id !== target) || [],
  }));

export const useEditDefaultWarningSettingConfig = () =>
  useConfig(["default_warning_setting"], (target, old) => ({
    ...old,
    ...target,
  }));

export const useEditDeliversConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) =>
    old
      ? {
          ...old,
          data: old.data.map((item: any) =>
            target.ids.includes(`${item.id}`) ? { ...item, ...target } : item
          ),
        }
      : null
  );
