import { Form, Input, Modal, Select } from "antd";
import { OssUpload } from "components/oss-upload";
import { ErrorBox, ModalLoading, OptionCover } from "components/lib";

import { useForm } from "antd/lib/form/Form";
import { useAddTopMedia, useEditTopMedia } from "service/topMedia";
import { useTopMediaModal, useTopMediaListQueryKey } from "../util";

import type { MediaOption } from "types/common";
import { useEffect } from "react";

const normFile = (e: any) => {
  if (Array.isArray(e)) return e;
  return e && e.fileList;
};

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
  const {
    topMediaModalOpen,
    editingTopMediaId,
    editingTopMedia,
    isLoading,
    close,
  } = useTopMediaModal();

  const useMutateTopMedia = editingTopMediaId
    ? useEditTopMedia
    : useAddTopMedia;
  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useMutateTopMedia(useTopMediaListQueryKey());

  useEffect(() => {
    if (editingTopMedia) {
      const { cover, ...rest } = editingTopMedia;
      form.setFieldsValue({ cover: cover ? [{ url: cover }] : [], ...rest });
    }
  }, [editingTopMedia, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      const { cover, ...rest } = form.getFieldsValue();
      await mutateAsync({
        ...editingTopMedia,
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
      title={editingTopMediaId ? "编辑最佳游记" : "新增最佳游记"}
      open={topMediaModalOpen}
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
            noStyle
            shouldUpdate={(prevValues, currentValues) => {
              return prevValues.mediaType !== currentValues.mediaType;
            }}
          >
            {({ getFieldValue }) =>
              getFieldValue("mediaType") ? (
                getFieldValue("mediaType") === 2 ? (
                  <Form.Item
                    name="mediaId"
                    label="视频游记"
                    rules={[{ required: true, message: "请选择视频游记" }]}
                  >
                    <Select
                      showSearch
                      placeholder="请选择视频游记"
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
                    name="mediaId"
                    label="图文游记"
                    rules={[{ required: true, message: "请选择图文游记" }]}
                  >
                    <Select
                      showSearch
                      placeholder="请选择图文游记"
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

          <Form.Item
            name="cover"
            label="封面"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: "请上传封面" }]}
          >
            <OssUpload maxCount={1} />
          </Form.Item>
          <Form.Item
            name="title"
            label="标题"
            rules={[{ required: true, message: "请输入标题" }]}
          >
            <Input placeholder="请输入标题" />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
