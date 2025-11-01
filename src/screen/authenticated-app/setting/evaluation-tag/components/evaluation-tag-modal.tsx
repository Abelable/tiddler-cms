import { Form, Input, Modal, Select } from "antd";
import { ErrorBox, ModalLoading } from "components/lib";

import { useEffect } from "react";
import { useForm } from "antd/lib/form/Form";
import {
  useAddEvaluationTag,
  useEditEvaluationTag,
} from "service/evaluationTag";
import { useEvaluationTagModal, useEvaluationTagListQueryKey } from "../util";

import type { Option } from "types/common";

export const EvaluationTagModal = ({
  sceneOptions,
  typeOptions,
}: {
  sceneOptions: Option[];
  typeOptions: Option[];
}) => {
  const [form] = useForm();
  const {
    evaluationTagModalOpen,
    editingEvaluationTag,
    editingEvaluationTagId,
    isLoading,
    close,
  } = useEvaluationTagModal();

  const useMutateRole = editingEvaluationTagId
    ? useEditEvaluationTag
    : useAddEvaluationTag;
  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useMutateRole(useEvaluationTagListQueryKey());

  useEffect(() => {
    form.setFieldsValue(editingEvaluationTag);
  }, [editingEvaluationTag, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({ ...editingEvaluationTag, ...form.getFieldsValue() });
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
      title={editingEvaluationTagId ? "编辑评价标签" : "新增评价标签"}
      open={evaluationTagModalOpen}
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
            label="评价类型"
            rules={[{ required: true, message: "请选择评价类型" }]}
          >
            <Select placeholder="请选择评价类型">
              {typeOptions.map((item) => (
                <Select.Option key={item.value} value={item.value}>
                  {item.text}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label={"标签内容"}
            name={"name"}
            rules={[{ required: true, message: "请输入标签内容" }]}
          >
            <Input placeholder={"请输入标签内容"} />
          </Form.Item>
          <Form.Item
            name="scene"
            label="使用场景"
            rules={[{ required: true, message: "请选择使用场景" }]}
          >
            <Select placeholder="请选择使用场景">
              {sceneOptions.map((item) => (
                <Select.Option key={item.value} value={item.value}>
                  {item.text}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
