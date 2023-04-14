import { Upload } from "antd";
import { useOssConfig } from "service/common";
import { PlusOutlined, VideoCameraAddOutlined } from "@ant-design/icons";

interface OssUploadProps extends React.ComponentProps<typeof Upload> {
  accept?: string;
  maxCount?: number;
}

export const OssUpload = ({ accept, maxCount, ...props }: OssUploadProps) => {
  const { data: ossConfig } = useOssConfig();
  const getExtraData = (file: any) => {
    return {
      key: file.key,
      OSSAccessKeyId: ossConfig?.accessId,
      policy: ossConfig?.policy,
      Signature: ossConfig?.signature,
    };
  };
  const beforeUpload = (file: any) => {
    const suffix = file.name.slice(file.name.lastIndexOf("."));
    const filename = Date.now() + suffix;
    file.key = ossConfig?.dir + filename;
    file.url = `${ossConfig?.host}/${ossConfig?.dir}${filename}`;
    if (accept === ".mp4") {
      file.thumbUrl = `${ossConfig?.host}/${ossConfig?.dir}${filename}?x-oss-process=video/snapshot,t_0`;
    }
    return file;
  };

  return (
    <>
      <Upload
        {...props}
        accept={accept || "image/*"}
        beforeUpload={beforeUpload}
        action={ossConfig?.host}
        data={getExtraData}
        listType="picture-card"
      >
        {maxCount &&
        props.fileList &&
        props.fileList.length >= maxCount ? null : (
          <div>
            {accept === ".mp4" ? (
              <VideoCameraAddOutlined style={{ fontSize: "1.2em" }} />
            ) : (
              <PlusOutlined />
            )}
            <div style={{ marginTop: 8 }}>点击上传</div>
          </div>
        )}
      </Upload>
    </>
  );
};
