import { Form, Input, Select, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox, ModalLoading, OptionCover } from "components/lib";
import { OssUpload } from "components/oss-upload";

import { useEffect } from "react";
import { useAddLakeHomestay, useEditLakeHomestay } from "service/lakeHomestay";
import { useLakeHomestayModal, useLakeHomestayListQueryKey } from "../util";

import type { ProductOption } from "types/common";

const normFile = (e: any) => {
  if (Array.isArray(e)) return e;
  return e && e.fileList;
};

export const LakeHomestayModal = ({
  scenicOptions,
}: {
  scenicOptions: ProductOption[];
}) => {
  const [form] = useForm();
  const {
    lakeHomestayModalOpen,
    editingLakeHomestayId,
    editingLakeHomestay,
    isLoading,
    close,
  } = useLakeHomestayModal();

  const useMutateLakeHomestay = editingLakeHomestayId
    ? useEditLakeHomestay
    : useAddLakeHomestay;
  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useMutateLakeHomestay(useLakeHomestayListQueryKey());

  useEffect(() => {
    if (editingLakeHomestay) {
      const { cover, ...rest } = editingLakeHomestay;
      form.setFieldsValue({
        cover: cover ? [{ url: cover }] : [],
        ...rest,
      });
    }
  }, [editingLakeHomestay, form]);

  const submit = () => {
    form.validateFields().then(async () => {
      const { cover, ...rest } = form.getFieldsValue();
      await mutateAsync({
        ...editingLakeHomestay,
        cover: cover && cover.length ? cover[0].url : "",
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
      title={editingLakeHomestayId ? "编辑湖畔民宿" : "新增湖畔民宿"}
      open={lakeHomestayModalOpen}
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
            name="hotelId"
            label="民宿"
            rules={[{ required: true, message: "请选择民宿" }]}
          >
            <Select
              placeholder="请选择民宿"
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
                    cover: [
                      {
                        url: selectedScenic.cover,
                      },
                    ],
                    name: selectedScenic.name,
                  });
                } else {
                  form.setFieldsValue({
                    cover: [],
                    name: "",
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
              return prevValues.hotelId !== currentValues.hotelId;
            }}
          >
            {({ getFieldValue }) =>
              getFieldValue("hotelId") ? (
                <>
                  <Form.Item
                    name="cover"
                    label="民宿封面"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={[{ required: true, message: "请上传民宿封面" }]}
                  >
                    <OssUpload maxCount={1} />
                  </Form.Item>
                  <Form.Item
                    name="name"
                    label="民宿名称"
                    rules={[{ required: true, message: "请输入民宿名称" }]}
                  >
                    <Input placeholder="请输入民宿名称" />
                  </Form.Item>
                </>
              ) : (
                <></>
              )
            }
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
