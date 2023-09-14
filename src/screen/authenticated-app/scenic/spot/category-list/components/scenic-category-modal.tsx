import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox, ModalLoading } from "components/lib";
import {
  useAddScenicCategory,
  useEditScenicCategory,
} from "service/scenicCategory";
import { useScenicCategoryModal, useScenicCategoriesQueryKey } from "../util";
import { useEffect } from "react";

export const ScenicCategoryModal = () => {
  const [form] = useForm();
  const {
    scenicCategoryModalOpen,
    editingScenicCategory,
    editingScenicCategoryId,
    isLoading,
    close,
  } = useScenicCategoryModal();

  const useMutateRole = editingScenicCategoryId
    ? useEditScenicCategory
    : useAddScenicCategory;
  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useMutateRole(useScenicCategoriesQueryKey());

  useEffect(() => {
    form.setFieldsValue(editingScenicCategory);
  }, [editingScenicCategory, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({ ...editingScenicCategory, ...form.getFieldsValue() });
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
      title={editingScenicCategoryId ? "编辑景区分类" : "新增景区分类"}
      open={scenicCategoryModalOpen}
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
            label={"景区分类名称"}
            name={"name"}
            rules={[{ required: true, message: "请输入景区分类名称" }]}
          >
            <Input placeholder={"请输入景区分类名称"} />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
