import { Modal, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { initNonce, initTimestamp } from "service/http";
import { useAuth } from "context/auth-context";

interface UploaderProps extends React.ComponentProps<typeof Upload> {
  maxCount?: number;
}

export const Uploader = (props: UploaderProps) => {
  const { token } = useAuth();
  const [previewImage, setPreviewImage] = useState("");
  const preview = (file: any) => setPreviewImage(file.thumbUrl);

  return (
    <>
      <Upload
        accept="image/*"
        action={`${process.env.REACT_APP_API_URL}/api/v1/admin/upload/image`}
        headers={{
          Authorization: `Bearer ${token}`,
          timestamp: initTimestamp(),
          nonce: initNonce(),
        }}
        name="image"
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
        visible={!!previewImage}
        footer={null}
        onCancel={() => setPreviewImage("")}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};
