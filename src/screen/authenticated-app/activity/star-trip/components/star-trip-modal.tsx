import { Form, Input, Select, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox, ModalLoading, OptionCover } from "components/lib";
import { OssUpload } from "components/oss-upload";

import { useEffect } from "react";
import { useAddStarTrip, useEditStarTrip } from "service/starTrip";
import { useStarTripModal, useStarTripListQueryKey } from "../util";

import type { ProductOption } from "types/common";

const typeOptions = [
  { text: "景点", value: 1 },
  { text: "酒店", value: 2 },
];

const normFile = (e: any) => {
  if (Array.isArray(e)) return e;
  return e && e.fileList;
};

export const StarTripModal = ({
  scenicOptions,
  hotelOptions,
}: {
  scenicOptions: ProductOption[];
  hotelOptions: ProductOption[];
}) => {
  const [form] = useForm();
  const {
    starTripModalOpen,
    editingStarTripId,
    editingStarTrip,
    isLoading,
    close,
  } = useStarTripModal();

  const useMutateStarTrip = editingStarTripId
    ? useEditStarTrip
    : useAddStarTrip;
  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useMutateStarTrip(useStarTripListQueryKey());

  useEffect(() => {
    if (editingStarTrip) {
      const { cover, ...rest } = editingStarTrip;
      form.setFieldsValue({
        cover: cover ? [{ url: cover }] : [],
        ...rest,
      });
    }
  }, [editingStarTrip, form]);

  const submit = () => {
    form.validateFields().then(async () => {
      const { cover, ...rest } = form.getFieldsValue();
      await mutateAsync({
        ...editingStarTrip,
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
      title={editingStarTripId ? "编辑明星同游地" : "新增明星同游地"}
      open={starTripModalOpen}
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
            name="productType"
            label="产品类型"
            rules={[{ required: true, message: "请选择产品类型" }]}
          >
            <Select placeholder="请选择产品类型">
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
              return prevValues.productType !== currentValues.productType;
            }}
          >
            {({ getFieldValue }) =>
              getFieldValue("productType") ? (
                getFieldValue("productType") === 1 ? (
                  <Form.Item
                    name="productId"
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
                ) : (
                  <Form.Item
                    name="productId"
                    label="酒店"
                    rules={[{ required: true, message: "请选择酒店" }]}
                  >
                    <Select
                      placeholder="请选择酒店"
                      showSearch
                      filterOption={(input, option) =>
                        (option!.children as any)[1].props.children
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      onChange={(value) => {
                        const selectedHotel = hotelOptions.find(
                          (item) => item.id === value
                        );
                        if (selectedHotel) {
                          form.setFieldsValue({
                            cover: [
                              {
                                url: selectedHotel.cover,
                              },
                            ],
                            name: selectedHotel.name,
                          });
                        } else {
                          form.setFieldsValue({
                            cover: [],
                            name: "",
                          });
                        }
                      }}
                    >
                      {hotelOptions.map(({ id, cover, name }) => (
                        <Select.Option key={id} value={id}>
                          <OptionCover src={cover} />
                          <span>{name}</span>
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
            noStyle
            shouldUpdate={(prevValues, currentValues) => {
              return prevValues.productId !== currentValues.productId;
            }}
          >
            {({ getFieldValue }) =>
              getFieldValue("productId") ? (
                <>
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
                    name="name"
                    label="名称"
                    rules={[{ required: true, message: "请输入名称" }]}
                  >
                    <Input placeholder="请输入名称" />
                  </Form.Item>
                </>
              ) : (
                <></>
              )
            }
          </Form.Item>
          <Form.Item
            name="desc"
            label="描述"
            rules={[{ required: true, message: "请输入描述" }]}
          >
            <Input placeholder="请输入推荐理由" />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
