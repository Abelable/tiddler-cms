import { Form, Input, Modal, Select } from "antd";
import { ErrorBox, ModalLoading } from "components/lib";

import { useEffect } from "react";
import { useForm } from "antd/lib/form/Form";
import {
  useAddComplaintOption,
  useEditComplaintOption,
} from "service/complaintOption";
import {
  useComplaintOptionModal,
  useComplaintOptionListQueryKey,
} from "../util";

import type { Option } from "types/common";

export const ComplaintOptionModal = ({
  typeOptions,
}: {
  typeOptions: Option[];
}) => {
  const [form] = useForm();
  const {
    complaintOptionModalOpen,
    editingComplaintOption,
    editingComplaintOptionId,
    isLoading,
    close,
  } = useComplaintOptionModal();

  const useMutateRole = editingComplaintOptionId
    ? useEditComplaintOption
    : useAddComplaintOption;
  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useMutateRole(useComplaintOptionListQueryKey());

  useEffect(() => {
    form.setFieldsValue(editingComplaintOption);
  }, [editingComplaintOption, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({
        ...editingComplaintOption,
        ...form.getFieldsValue(),
      });
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
      title={editingComplaintOptionId ? "编辑投诉选项" : "新增投诉选项"}
      open={complaintOptionModalOpen}
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
            name="type"
            label="投诉类型"
            rules={[{ required: true, message: "请选择投诉类型" }]}
          >
            <Select placeholder="请选择投诉类型">
              {typeOptions.map((item) => (
                <Select.Option key={item.value} value={item.value}>
                  {item.text}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label={"选项标题"}
            name="title"
            rules={[{ required: true, message: "请输入选项标题" }]}
          >
            <Input placeholder={"请输入选项标题"} />
          </Form.Item>
          <Form.Item
            label={"选项内容"}
            name="content"
            rules={[{ required: true, message: "请输入选项内容" }]}
          >
            <Input placeholder={"请输入选项内容"} />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
