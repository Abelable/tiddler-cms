import { Form, Modal, Select } from "antd";
import { ErrorBox, OptionCover } from "components/lib";

import { useForm } from "antd/lib/form/Form";
import { useAddLakeCycleMedia } from "service/lakeCycleMedia";
import { useLakeCycleMediaModal, useLakeCycleMediaListQueryKey } from "../util";

import type { MediaOption } from "types/common";

const typeOptions = [
  { text: "视频攻略", value: 2 },
  { text: "图文攻略", value: 3 },
];

export const MediaModal = ({
  shortVideoOptions,
  tourismNoteOptions,
}: {
  shortVideoOptions: MediaOption[];
  tourismNoteOptions: MediaOption[];
}) => {
  const [form] = useForm();
  const { lakeCycleMediaModalOpen, close } = useLakeCycleMediaModal();

  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useAddLakeCycleMedia(useLakeCycleMediaListQueryKey());

  const confirm = () => {
    form.validateFields().then(async () => {
      const { cover, ...rest } = form.getFieldsValue();
      await mutateAsync({
        ...rest,
        cover: cover && cover.length ? cover[0].url : "",
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
      title="新增骑行攻略"
      open={lakeCycleMediaModalOpen}
      confirmLoading={mutateLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <ErrorBox error={error} />
      <Form form={form} layout="vertical">
        <Form.Item
          name="mediaType"
          label="攻略类型"
          rules={[{ required: true, message: "请选择攻略类型" }]}
        >
          <Select placeholder="请选择攻略类型">
            {typeOptions.map(({ text, value }) => (
              <Select.Option key={value} value={value}>
                {text}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => {
            return prevValues.mediaType !== currentValues.mediaType;
          }}
        >
          {({ getFieldValue }) =>
            getFieldValue("mediaType") ? (
              getFieldValue("mediaType") === 2 ? (
                <Form.Item
                  name="mediaIds"
                  label="视频攻略"
                  rules={[{ required: true, message: "请选择视频攻略" }]}
                >
                  <Select
                    mode="multiple"
                    showSearch
                    placeholder="请选择视频攻略"
                    filterOption={(input, option) =>
                      (option!.children as any)[1].props.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    onChange={(value) => {
                      const shortVideo = shortVideoOptions.find(
                        (item) => item.id === value
                      );
                      form.setFieldsValue({
                        title: shortVideo?.title,
                        cover: [{ url: shortVideo?.cover }],
                      });
                    }}
                  >
                    {shortVideoOptions.map(({ id, cover, title }) => (
                      <Select.Option key={id} value={id}>
                        <OptionCover src={cover} />
                        <span>{title}</span>
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              ) : (
                <Form.Item
                  name="mediaIds"
                  label="图文攻略"
                  rules={[{ required: true, message: "请选择图文攻略" }]}
                >
                  <Select
                    mode="multiple"
                    showSearch
                    placeholder="请选择图文攻略"
                    filterOption={(input, option) =>
                      (option!.children as any)[1].props.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    onChange={(value) => {
                      const tourismNote = tourismNoteOptions.find(
                        (item) => item.id === value
                      );
                      form.setFieldsValue({
                        title: tourismNote?.title,
                        cover: [{ url: tourismNote?.cover }],
                      });
                    }}
                  >
                    {tourismNoteOptions.map(({ id, cover, title }) => (
                      <Select.Option key={id} value={id}>
                        <OptionCover src={cover} />
                        <span>{title}</span>
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              )
            ) : (
              <></>
            )
          }
        </Form.Item>
      </Form>
    </Modal>
  );
};
