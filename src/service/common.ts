import { useHttp } from "./http";
import { useQuery } from "react-query";
import { OssConfig } from "types/ossConfig";

export const useOssConfig = () => {
  const client = useHttp();
  return useQuery<OssConfig>(["ossConfig"], () => client("oss_config"));
};
