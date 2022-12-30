import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox, ModalLoading } from "components/lib";
import { useAddShopCategory, useEditShopCategory } from "service/shopCategory";
import { useShopCategoryModal, useShopCategoriesQueryKey } from "../util";
import { useEffect } from "react";

export const ShopCategoryModal = () => {
  const [form] = useForm();
  const {
    shopCategoryModalOpen,
    editingShopCategory,
    editingShopCategoryId,
    isLoading,
    close,
  } = useShopCategoryModal();

  const useMutateRole = editingShopCategoryId
    ? useEditShopCategory
    : useAddShopCategory;
  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useMutateRole(useShopCategoriesQueryKey());

  useEffect(() => {
    form.setFieldsValue(editingShopCategory);
  }, [editingShopCategory, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({ ...editingShopCategory, ...form.getFieldsValue() });
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
      title={editingShopCategoryId ? "编辑店铺分类" : "新增店铺分类"}
      open={shopCategoryModalOpen}
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
            label={"店铺分类名称"}
            name={"name"}
            rules={[{ required: true, message: "请输入店铺分类名称" }]}
          >
            <Input placeholder={"请输入店铺分类名称"} />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
