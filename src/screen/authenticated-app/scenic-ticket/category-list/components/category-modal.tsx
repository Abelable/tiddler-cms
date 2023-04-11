import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox, ModalLoading } from "components/lib";
import {
  useAddScenicTicketCategory,
  useEditScenicTicketCategory,
} from "service/scenicTicketCategory";
import {
  useScenicTicketCategoryModal,
  useScenicTicketCategoriesQueryKey,
} from "../util";
import { useEffect } from "react";

export const ScenicTicketCategoryModal = () => {
  const [form] = useForm();
  const {
    scenicTicketCategoryModalOpen,
    editingScenicTicketCategory,
    editingScenicTicketCategoryId,
    isLoading,
    close,
  } = useScenicTicketCategoryModal();

  const useMutateRole = editingScenicTicketCategoryId
    ? useEditScenicTicketCategory
    : useAddScenicTicketCategory;
  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useMutateRole(useScenicTicketCategoriesQueryKey());

  useEffect(() => {
    form.setFieldsValue(editingScenicTicketCategory);
  }, [editingScenicTicketCategory, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({
        ...editingScenicTicketCategory,
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
      title={editingScenicTicketCategoryId ? "编辑门票分类" : "新增门票分类"}
      open={scenicTicketCategoryModalOpen}
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
            label={"门票分类名称"}
            name={"name"}
            rules={[{ required: true, message: "请输入门票分类名称" }]}
          >
            <Input placeholder={"请输入门票分类名称"} />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
