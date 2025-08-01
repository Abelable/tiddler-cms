import { Form, Input, Select, Modal, InputNumber } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox, ModalLoading, OptionCover } from "components/lib";
import { OssUpload } from "components/oss-upload";

import { useEffect } from "react";
import { useAddHotScenic, useEditHotScenic } from "service/hotScenic";
import { useHotScenicModal, useHotScenicListQueryKey } from "../util";

import type { ProductOption } from "types/common";

const normFile = (e: any) => {
  if (Array.isArray(e)) return e;
  return e && e.fileList;
};

export const HotScenicModal = ({
  scenicOptions,
}: {
  scenicOptions: ProductOption[];
}) => {
  const [form] = useForm();
  const {
    hotScenicModalOpen,
    editingHotScenicId,
    editingHotScenic,
    isLoading,
    close,
  } = useHotScenicModal();

  const useMutateHotScenic = editingHotScenicId
    ? useEditHotScenic
    : useAddHotScenic;
  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useMutateHotScenic(useHotScenicListQueryKey());

  useEffect(() => {
    if (editingHotScenic) {
      const { scenicCover, ...rest } = editingHotScenic;
      form.setFieldsValue({
        scenicCover: scenicCover ? [{ url: scenicCover }] : [],
        ...rest,
      });
    }
  }, [editingHotScenic, form]);

  const submit = () => {
    form.validateFields().then(async () => {
      const { scenicCover, ...rest } = form.getFieldsValue();
      await mutateAsync({
        ...editingHotScenic,
        scenicCover:
          scenicCover && scenicCover.length ? scenicCover[0].url : "",
        ...rest,
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
      title={editingHotScenicId ? "编辑网红打卡地" : "新增网红打卡地"}
      open={hotScenicModalOpen}
      confirmLoading={mutateLoading}
      onOk={submit}
      onCancel={closeModal}
    >
      <ErrorBox error={error} />
      {isLoading ? (
        <ModalLoading />
      ) : (
        <Form form={form} layout="vertical">
          <Form.Item
            name="scenicId"
            label="景点"
            rules={[{ required: true, message: "请选择景点" }]}
          >
            <Select
              placeholder="请选择景点"
              showSearch
              filterOption={(input, option) =>
                (option!.children as any)[1].props.children
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              onChange={(value) => {
                const selectedScenic = scenicOptions.find(
                  (item) => item.id === value
                );
                if (selectedScenic) {
                  form.setFieldsValue({
                    scenicCover: [
                      {
                        url: selectedScenic.cover,
                      },
                    ],
                    scenicName: selectedScenic.name,
                  });
                } else {
                  form.setFieldsValue({
                    scenicCover: [],
                    scenicName: "",
                  });
                }
              }}
            >
              {scenicOptions.map(({ id, cover, name }) => (
                <Select.Option key={id} value={id}>
                  <OptionCover src={cover} />
                  <span>{name}</span>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => {
              return prevValues.scenicId !== currentValues.scenicId;
            }}
          >
            {({ getFieldValue }) =>
              getFieldValue("scenicId") ? (
                <>
                  <Form.Item
                    name="scenicCover"
                    label="景点封面"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={[{ required: true, message: "请上传活动封面" }]}
                  >
                    <OssUpload maxCount={1} />
                  </Form.Item>
                  <Form.Item
                    name="scenicName"
                    label="景点名称"
                    rules={[{ required: true, message: "请输入景点名称" }]}
                  >
                    <Input placeholder="请输入景点名称" />
                  </Form.Item>
                </>
              ) : (
                <></>
              )
            }
          </Form.Item>
          <Form.Item
            name="recommendReason"
            label="推荐理由"
            rules={[{ required: true, message: "请输入推荐理由" }]}
          >
            <Input placeholder="请输入推荐理由" />
          </Form.Item>
          <Form.Item
            name="interestedUserNumber"
            label="感兴趣人数"
            rules={[{ required: true, message: "请输入感兴趣人数" }]}
          >
            <InputNumber
              placeholder="请输入感兴趣人数"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
