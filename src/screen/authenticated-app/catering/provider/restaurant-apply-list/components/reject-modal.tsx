import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useRejectProviderRestaurant } from "service/providerRestaurant";
import { useRejectModal, useProviderRestaurantListQueryKey } from "../util";

export const RejectModal = () => {
  const [form] = useForm();
  const { rejectModalOpen, rejectProviderRestaurantId, close } =
    useRejectModal();

  const { mutateAsync, isLoading: mutateLoading } = useRejectProviderRestaurant(
    useProviderRestaurantListQueryKey()
  );

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({
        id: +rejectProviderRestaurantId,
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
      title={"驳回服务商门店申请"}
      open={rejectModalOpen}
      confirmLoading={mutateLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label={"驳回原因"}
          name={"failureReason"}
          rules={[{ required: true, message: "请输入驳回原因" }]}
        >
          <Input placeholder={"请输入驳回原因"} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
