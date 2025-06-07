import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox, ModalLoading } from "components/lib";
import { OssUpload } from "components/oss-upload";

import { useEffect } from "react";
import { useEditUser } from "service/user";
import { useUserModal, useUsersQueryKey } from "../util";

const normFile = (e: any) => {
  if (Array.isArray(e)) return e;
  return e && e.fileList;
};

export const UserModal = () => {
  const [form] = useForm();
  const { userModalOpen, editingUser, isLoading, close } = useUserModal();

  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useEditUser(useUsersQueryKey());

  useEffect(() => {
    form.setFieldsValue(editingUser);
  }, [editingUser, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({ ...editingUser, ...form.getFieldsValue() });
      closeModal();
    });
  };

  const closeModal = () => {
    form.resetFields();
    close();
  };

  return (
    <Modal
      forceRender={true}
      title="编辑用户基础信息"
      open={userModalOpen}
      confirmLoading={mutateLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <ErrorBox error={error} />
      {isLoading ? (
        <ModalLoading />
      ) : (
        <Form form={form} layout="vertical">
          <Form.Item
            name="avatar"
            label="头像"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <OssUpload maxCount={1} />
          </Form.Item>
          <Form.Item
            label={"用户昵称"}
            name={"name"}
            rules={[{ required: true, message: "请输入用户昵称" }]}
          >
            <Input placeholder={"请输入用户昵称"} />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
