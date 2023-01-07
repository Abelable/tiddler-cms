import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox, ModalLoading } from "components/lib";
import { useAddRole, useEditRole } from "service/role";
import { useRoleModal, useRolesQueryKey } from "../util";
import { useEffect } from "react";

export const RoleModal = () => {
  const [form] = useForm();
  const { roleModalOpen, editingRoleId, editingRole, isLoading, close } =
    useRoleModal();

  const useMutateRole = editingRoleId ? useEditRole : useAddRole;
  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useMutateRole(useRolesQueryKey());

  useEffect(() => {
    form.setFieldsValue(editingRole);
  }, [editingRole, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({ ...editingRole, ...form.getFieldsValue() });
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
      title={editingRoleId ? "编辑角色" : "新增角色"}
      open={roleModalOpen}
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
            label={"角色名称"}
            name={"name"}
            rules={[{ required: true, message: "请输入角色名称" }]}
          >
            <Input placeholder={"请输入角色名称"} />
          </Form.Item>
          <Form.Item
            label={"角色描述"}
            name={"desc"}
            rules={[{ required: true, message: "请输入角色描述" }]}
          >
            <Input placeholder={"请输入角色描述"} />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
