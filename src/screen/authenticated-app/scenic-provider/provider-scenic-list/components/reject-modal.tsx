import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useRejectProviderScenic } from "service/providerScenic";
import { useRejectModal, useProviderScenicListQueryKey } from "../util";

export const RejectModal = () => {
  const [form] = useForm();
  const { rejectModalOpen, rejectProviderScenicId, close } = useRejectModal();

  const { mutateAsync, isLoading: mutateLoading } = useRejectProviderScenic(
    useProviderScenicListQueryKey()
  );

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({
        id: +rejectProviderScenicId,
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
      title={"驳回服务商景点申请"}
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
