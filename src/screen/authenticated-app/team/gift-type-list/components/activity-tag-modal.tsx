import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox, ModalLoading } from "components/lib";
import { useAddGiftType, useEditGiftType } from "service/giftType";
import { useGiftTypeModal, useGiftTypeListQueryKey } from "../util";
import { useEffect } from "react";

export const GiftTypeModal = () => {
  const [form] = useForm();
  const {
    giftTypeModalOpen,
    editingGiftType,
    editingGiftTypeId,
    isLoading,
    close,
  } = useGiftTypeModal();

  const useMutateRole = editingGiftTypeId ? useEditGiftType : useAddGiftType;
  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useMutateRole(useGiftTypeListQueryKey());

  useEffect(() => {
    form.setFieldsValue(editingGiftType);
  }, [editingGiftType, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({ ...editingGiftType, ...form.getFieldsValue() });
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
      title={editingGiftTypeId ? "编辑好物类型" : "新增好物类型"}
      open={giftTypeModalOpen}
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
            label="好物类型名称"
            name="name"
            rules={[{ required: true, message: "请输入好物类型名称" }]}
          >
            <Input placeholder={"请输入好物类型名称"} />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
