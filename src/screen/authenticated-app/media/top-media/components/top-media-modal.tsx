import { Form, Modal, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useAddTopMedia } from "service/topMedia";
import { useTopMediaModal, useTopMediaListQueryKey } from "../util";
import { MediaOption } from "types/common";
import { OptionCover } from "components/lib";

const typeOptions = [
  { text: "视频游记", value: 2 },
  { text: "图文游记", value: 3 },
];

export const TopMediaModal = ({
  shortVideoOptions,
  tourismNoteOptions,
}: {
  shortVideoOptions: MediaOption[];
  tourismNoteOptions: MediaOption[];
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
          name="mediaType"
          label="游记类型"
          rules={[{ required: true, message: "请选择游记类型" }]}
        >
          <Select placeholder="请选择游记类型">
            {typeOptions.map(({ text, value }) => (
              <Select.Option key={value} value={value}>
                {text}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="shortVideoId"
          label="视频游记"
          rules={[{ required: true, message: "请选择视频游记" }]}
        >
          <Select
            showSearch
            filterOption={(input, option) =>
              (option!.children as any)[1].props.children
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            placeholder="请选择视频游记"
          >
            {shortVideoOptions.map(({ id, cover, title }) => (
              <Select.Option key={id} value={id}>
                <OptionCover src={cover} />
                <span>{title}</span>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="tourismNoteId"
          label="视频游记"
          rules={[{ required: true, message: "请选择视频游记" }]}
        >
          <Select
            showSearch
            filterOption={(input, option) =>
              (option!.children as any)[1].props.children
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            placeholder="请选择视频游记"
          >
            {tourismNoteOptions.map(({ id, cover, title }) => (
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
