import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { useAddRole } from "service/role";
import { useRoleModal, useRolesQueryKey } from "../util";

export const RoleModal = ({ type }: { type: number }) => {
  const [form] = useForm();
  const { roleModalOpen, editingRoleId, close } = useRoleModal();

  const { mutateAsync, isLoading, error } = useAddRole(useRolesQueryKey());

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync(form.getFieldsValue());
      closeModal();
    });
  };

  const closeModal = () => {
    form.resetFields();
    close();
  };

  return (
    <Modal
      title={editingRoleId ? "编辑角色" : "新增角色"}
      open={roleModalOpen}
      confirmLoading={isLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <ErrorBox error={error} />
      <Form form={form} layout="vertical">
        <Form.Item
          name="content"
          rules={[{ required: true, message: "请输入常用语" }]}
        >
          <Input maxLength={100} placeholder="不超过10字" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
