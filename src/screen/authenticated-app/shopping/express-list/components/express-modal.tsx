import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox, ModalLoading } from "components/lib";
import { useAddExpress, useEditExpress } from "service/express";
import { useExpressModal, useExpressesQueryKey } from "../util";
import { useEffect } from "react";

export const ExpressModal = () => {
  const [form] = useForm();
  const {
    expressModalOpen,
    editingExpressId,
    editingExpress,
    isLoading,
    close,
  } = useExpressModal();

  const useMutateExpress = editingExpressId ? useEditExpress : useAddExpress;
  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useMutateExpress(useExpressesQueryKey());

  useEffect(() => {
    form.setFieldsValue(editingExpress);
  }, [editingExpress, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({ ...editingExpress, ...form.getFieldsValue() });
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
      title={editingExpressId ? "编辑快递" : "新增快递"}
      open={expressModalOpen}
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
            label={"快递编码"}
            name={"code"}
            rules={[{ required: true, message: "请输入快递编码" }]}
          >
            <Input placeholder={"请输入快递编码"} />
          </Form.Item>
          <Form.Item
            label={"快递名称"}
            name={"name"}
            rules={[{ required: true, message: "请输入快递名称" }]}
          >
            <Input placeholder={"请输入快递名称"} />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
