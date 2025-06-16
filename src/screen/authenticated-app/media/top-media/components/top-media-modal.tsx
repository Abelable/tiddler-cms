import { Form, Input, Modal, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useAddTopMedia } from "service/topMedia";
import { useTopMediaModal, useTopMediaListQueryKey } from "../util";
import { MediaOption } from "types/common";
import { OptionCover } from "components/lib";

export const TopMediaModal = ({
  shortVideoOptions,
  tourismOptions,
}: {
  shortVideoOptions: MediaOption[];
  tourismOptions: MediaOption[];
}) => {
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
      title={"新增最佳游记"}
      open={topMediaModalOpen}
      confirmLoading={mutateLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="categoryId"
          label="门店类型"
          rules={[{ required: true, message: "请选择门店类型" }]}
        >
          <Select placeholder="请选择门店类型">
            {shortVideoOptions.map(({ id, cover, title }) => (
              <Select.Option key={id} value={id}>
                <OptionCover src={cover} />
                <span>{title}</span>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
