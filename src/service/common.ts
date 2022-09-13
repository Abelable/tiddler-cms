import { useHttp } from "./http";
import { useMutation, useQuery } from "react-query";
import { OperatorOption, RegionOption, WarningSetting } from "types/common";
import { useEditDefaultWarningSettingConfig } from "./use-optimistic-options";

export const useOperatorOptions = () => {
  const client = useHttp();
  const res = useQuery(["operator_options"], () =>
    client("/api/v1/admin/operator/pluck")
  );
  const operatorOptions: OperatorOption[] = [];
  if (res.data) {
    Object.keys(res.data).forEach((item) =>
      operatorOptions.push({
        id: Number(item),
        name: res.data[item],
      })
    );
  }
  return operatorOptions;
};

export const useRegionOptions = (depth = 2) => {
  const client = useHttp();
  return useQuery<RegionOption[]>(["region_options"], () =>
    client("/api/v1/admin/province-city-area/tree", {
      data: { depth },
    })
  );
};

export const useDefaultWarningSetting = () => {
  const client = useHttp();
  return useQuery<WarningSetting>(["default_warning_setting"], () =>
    client("/api/v1/admin/setting/show/product.prewarn")
  );
};

export const useUpdateDefaultWarningSetting = () => {
  const client = useHttp();
  return useMutation(
    (params: WarningSetting) =>
      client("/api/v1/admin/setting/update/product.prewarn", {
        data: params,
        method: "POST",
      }),
    useEditDefaultWarningSettingConfig()
  );
};

export const useExpressOptions = () => {
  const client = useHttp();
  const res = useQuery(["express_options"], () =>
    client("/api/v1/admin/setting/express-pluck")
  );
  const expressOptions: string[] = [];
  if (res.data) {
    Object.keys(res.data).forEach((item) => expressOptions.push(item));
  }
  return expressOptions;
};

export const useDownloadTemplate = () => {
  const client = useHttp();
  return (scene: number) => {
    client("/api/v1/admin/setting/template-download-urls").then((res) => {
      let url = "";
      switch (scene) {
        case 1:
          url = res["import_production_data"];
          break;
        case 2:
          url = res["import_activation_data"];
          break;
        case 3:
          url = res["import_order"];
          break;
        case 4:
          url = res["import_order_photo_zip"];
          break;
        case 5:
          url = res["import_blacklist"];
          break;
      }
      window.location.href = url;
    });
  };
};
