import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox, ModalLoading } from "components/lib";
import {
  useAddEvaluationTag,
  useEditEvaluationTag,
} from "service/evaluationTag";
import { useEvaluationTagModal, useEvaluationTagListQueryKey } from "../util";
import { useEffect } from "react";

export const EvaluationTagModal = () => {
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
            label={"标签内容"}
            name={"name"}
            rules={[{ required: true, message: "请输入标签内容" }]}
          >
            <Input placeholder={"请输入标签内容"} />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
