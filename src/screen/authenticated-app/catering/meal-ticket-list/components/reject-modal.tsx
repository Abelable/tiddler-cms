import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useRejectTicket } from "service/scenicTicket";
import { useRejectModal, useTicketListQueryKey } from "../util";

export const RejectModal = () => {
  const [form] = useForm();
  const { rejectModalOpen, rejectTicketId, close } = useRejectModal();

  const { mutateAsync, isLoading: mutateLoading } = useRejectTicket(
    useTicketListQueryKey()
  );

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({ id: +rejectTicketId, ...form.getFieldsValue() });
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
      title={"门票驳回重审"}
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
