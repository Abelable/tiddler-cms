import { Button, Upload } from "antd";
import { initNonce, initTimestamp } from "service/http";
import { useAuth } from "context/auth-context";

interface FileUploadType extends React.ComponentProps<typeof Upload> {
  scene?: number;
  name: string;
}

export const FileUpload = ({ scene, name, ...restProps }: FileUploadType) => {
  const { token } = useAuth();

  let url = "";
  switch (scene) {
    case 1:
      url = "/api/v1/admin/order/import-product";
      break;
    case 2:
      url = "/api/v1/admin/order/import-activate";
      break;
    case 3:
      url = "/api/v1/admin/order-import/import";
      break;
    case 4:
      url = "/api/v1/admin/order-import/import-photo";
      break;
    case 5:
      url = "/api/v1/admin/blacklist/import";
      break;
  }

  return (
    <Upload
      action={`${process.env.REACT_APP_API_URL}${url}`}
      headers={{
        Authorization: `Bearer ${token}`,
        timestamp: initTimestamp(),
        nonce: initNonce(),
      }}
      name={scene === 4 ? "zip" : "excel"}
      accept={
        scene === 4
          ? "application/zip"
          : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      }
      maxCount={1}
      showUploadList={false}
      {...restProps}
    >
      <Button type={"primary"}>{name}</Button>
    </Upload>
  );
};
