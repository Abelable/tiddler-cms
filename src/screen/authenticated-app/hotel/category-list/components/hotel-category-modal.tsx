import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox, ModalLoading } from "components/lib";
import {
  useAddHotelCategory,
  useEditHotelCategory,
} from "service/hotelCategory";
import { useHotelCategoryModal, useHotelCategoriesQueryKey } from "../util";
import { useEffect } from "react";

export const HotelCategoryModal = () => {
  const [form] = useForm();
  const {
    hotelCategoryModalOpen,
    editingHotelCategory,
    editingHotelCategoryId,
    isLoading,
    close,
  } = useHotelCategoryModal();

  const useMutateRole = editingHotelCategoryId
    ? useEditHotelCategory
    : useAddHotelCategory;
  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useMutateRole(useHotelCategoriesQueryKey());

  useEffect(() => {
    form.setFieldsValue(editingHotelCategory);
  }, [editingHotelCategory, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({ ...editingHotelCategory, ...form.getFieldsValue() });
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
      title={editingHotelCategoryId ? "编辑酒店分类" : "新增酒店分类"}
      open={hotelCategoryModalOpen}
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
            label={"酒店分类名称"}
            name={"name"}
            rules={[{ required: true, message: "请输入酒店分类名称" }]}
          >
            <Input placeholder={"请输入酒店分类名称"} />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
