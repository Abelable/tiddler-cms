import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox, ModalLoading } from "components/lib";
import {
  useAddRestaurantCategory,
  useEditRestaurantCategory,
} from "service/restaurantCategory";
import {
  useRestaurantCategoryModal,
  useRestaurantCategoriesQueryKey,
} from "../util";
import { useEffect } from "react";

export const RestaurantCategoryModal = () => {
  const [form] = useForm();
  const {
    restaurantCategoryModalOpen,
    editingRestaurantCategory,
    editingRestaurantCategoryId,
    isLoading,
    close,
  } = useRestaurantCategoryModal();

  const useMutateRole = editingRestaurantCategoryId
    ? useEditRestaurantCategory
    : useAddRestaurantCategory;
  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useMutateRole(useRestaurantCategoriesQueryKey());

  useEffect(() => {
    form.setFieldsValue(editingRestaurantCategory);
  }, [editingRestaurantCategory, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({
        ...editingRestaurantCategory,
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
      title={editingRestaurantCategoryId ? "编辑门店分类" : "新增门店分类"}
      open={restaurantCategoryModalOpen}
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
            label={"门店分类名称"}
            name={"name"}
            rules={[{ required: true, message: "请输入门店分类名称" }]}
          >
            <Input placeholder={"请输入门店分类名称"} />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
