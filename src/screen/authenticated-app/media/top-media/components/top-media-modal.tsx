import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useAddTopMedia } from "service/topMedia";
import { useTopMediaModal, useTopMediaListQueryKey } from "../util";

export const TopMediaModal = () => {
  const [form] = useForm();
  const { topMediaModalOpen, close } = useTopMediaModal();

  const { mutateAsync, isLoading: mutateLoading } = useAddTopMedia(
    useTopMediaListQueryKey()
  );

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync(form.getFieldsValue());
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
      title={"代金券驳回重审"}
      open={topMediaModalOpen}
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
