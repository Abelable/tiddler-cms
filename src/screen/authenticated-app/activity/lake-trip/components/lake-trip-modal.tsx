import { Form, Input, Select, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox, ModalLoading, OptionCover } from "components/lib";
import { OssUpload } from "components/oss-upload";

import { useEffect } from "react";
import { useAddLakeTrip, useEditLakeTrip } from "service/lakeTrip";
import { useLakeTripModal, useLakeTripListQueryKey } from "../util";

import type { DataOption, ProductOption } from "types/common";

const normFile = (e: any) => {
  if (Array.isArray(e)) return e;
  return e && e.fileList;
};

export const LakeTripModal = ({
  lakeOptions,
  scenicOptions,
}: {
  lakeOptions: DataOption[];
  scenicOptions: ProductOption[];
}) => {
  const [form] = useForm();
  const {
    lakeTripModalOpen,
    editingLakeTripId,
    editingLakeTrip,
    isLoading,
    close,
  } = useLakeTripModal();

  const useMutateLakeTrip = editingLakeTripId
    ? useEditLakeTrip
    : useAddLakeTrip;
  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useMutateLakeTrip(useLakeTripListQueryKey());

  useEffect(() => {
    if (editingLakeTrip) {
      const { scenicCover, ...rest } = editingLakeTrip;
      form.setFieldsValue({
        scenicCover: scenicCover ? [{ url: scenicCover }] : [],
        ...rest,
      });
    }
  }, [editingLakeTrip, form]);

  const submit = () => {
    form.validateFields().then(async () => {
      const { scenicCover, ...rest } = form.getFieldsValue();
      await mutateAsync({
        ...editingLakeTrip,
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
      title={editingLakeTripId ? "编辑湖区岛屿" : "新增湖区岛屿"}
      open={lakeTripModalOpen}
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
            name="lakeId"
            label="湖区"
            rules={[{ required: true, message: "请选择湖区" }]}
          >
            <Select placeholder="请选择湖区">
              {lakeOptions.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="scenicId"
            label="岛屿"
            rules={[{ required: true, message: "请选择岛屿" }]}
          >
            <Select
              placeholder="请选择岛屿"
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
                    label="岛屿封面"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={[{ required: true, message: "请上传岛屿封面" }]}
                  >
                    <OssUpload maxCount={1} />
                  </Form.Item>
                  <Form.Item
                    name="scenicName"
                    label="岛屿名称"
                    rules={[{ required: true, message: "请输入岛屿名称" }]}
                  >
                    <Input placeholder="请输入岛屿名称" />
                  </Form.Item>
                </>
              ) : (
                <></>
              )
            }
          </Form.Item>
          <Form.Item
            name="desc"
            label="岛屿描述"
            rules={[{ required: true, message: "请输入岛屿描述" }]}
          >
            <Input placeholder="请输入岛屿描述" />
          </Form.Item>
          <Form.Item
            name="distance"
            label="行程里数（km）"
            rules={[{ required: true, message: "请输入行程里数" }]}
          >
            <Input placeholder="请输入行程里数" />
          </Form.Item>
          <Form.Item
            name="duration"
            label="行程时长（h）"
            rules={[{ required: true, message: "请输入行程时长" }]}
          >
            <Input placeholder="请输入行程时长" />
          </Form.Item>
          <Form.Item
            name="time"
            label="最佳时间（月份）"
            rules={[{ required: true, message: "请输入最佳时间" }]}
          >
            <Input placeholder="请输入最佳时间" />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
