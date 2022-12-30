import { Modal, Upload } from "antd";
import { useOssConfig } from "service/common";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

interface OssUploadProps extends React.ComponentProps<typeof Upload> {
  maxCount?: number;
}

export const OssUpload = (props: OssUploadProps) => {
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
    file.url = `https:${ossConfig?.host}/${ossConfig?.dir}${filename}`;
    return file;
  };

  const [previewImage, setPreviewImage] = useState("");
  const preview = (file: any) => setPreviewImage(file.url);

  return (
    <>
      <Upload
        beforeUpload={beforeUpload}
        action={ossConfig?.host}
        data={getExtraData}
        onPreview={preview}
        listType="picture-card"
        {...props}
      >
        {props.maxCount &&
        props.fileList &&
        props.fileList.length >= props.maxCount ? null : (
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>点击上传</div>
          </div>
        )}
      </Upload>
      <Modal
        open={!!previewImage}
        footer={null}
        onCancel={() => setPreviewImage("")}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};
