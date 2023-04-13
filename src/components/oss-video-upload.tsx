import { Upload } from "antd";
import { useOssConfig } from "service/common";
import { InboxOutlined } from "@ant-design/icons";
import { getVideoDuration } from "utils";

interface OssUploadProps extends React.ComponentProps<typeof Upload> {}

export const OssVideoUpload = (props: OssUploadProps) => {
  const { data: ossConfig } = useOssConfig();
  const getExtraData = (file: any) => {
    return {
      key: file.key,
      OSSAccessKeyId: ossConfig?.accessId,
      policy: ossConfig?.policy,
      Signature: ossConfig?.signature,
    };
  };
  const beforeUpload = async (file: any) => {
    const duration = await getVideoDuration(file);
    file.duration = duration;

    const suffix = file.name.slice(file.name.lastIndexOf("."));
    const filename = Date.now() + suffix;
    file.key = ossConfig?.dir + filename;
    file.url = `${ossConfig?.host}/${ossConfig?.dir}${filename}`;
    file.cover = `${ossConfig?.host}/${ossConfig?.dir}${filename}?x-oss-process=video/snapshot,t_0`;
    return file;
  };

  return (
    <>
      <Upload.Dragger
        beforeUpload={beforeUpload}
        action={ossConfig?.host}
        data={getExtraData}
        maxCount={1}
        {...props}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击或将文件推拽到这里上传</p>
        <p className="ant-upload-hint">支持扩展名：.mp4 .war ...</p>
      </Upload.Dragger>
    </>
  );
};
