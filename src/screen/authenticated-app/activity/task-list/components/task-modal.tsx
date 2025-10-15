import { Button, Col, Drawer, Form, Input, Row, Space, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox, ModalLoading, OptionCover } from "components/lib";
import { OssUpload } from "components/oss-upload";

import { useEffect } from "react";
import { useAddTask, useEditTask } from "service/task";
import { useTaskModal, useTaskListQueryKey } from "../util";

import type { Option, ProductOption } from "types/common";

const normFile = (e: any) => {
  if (Array.isArray(e)) return e;
  return e && e.fileList;
};

export const TaskModal = ({
  statusOptions,
  productTypeOptions,
  scenicOptions,
  hotelOptions,
  restaurantOptions,
}: {
  statusOptions: Option[];
  productTypeOptions: Option[];
  scenicOptions: ProductOption[];
  hotelOptions: ProductOption[];
  restaurantOptions: ProductOption[];
}) => {
  const [form] = useForm();
  const { taskModalOpen, editingTaskId, editingTask, isLoading, close } =
    useTaskModal();

  const useMutateTask = editingTaskId ? useEditTask : useAddTask;
  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useMutateTask(useTaskListQueryKey());

  useEffect(() => {
    if (editingTask) {
      const { ...rest } = editingTask;
      form.setFieldsValue({ ...rest });
    }
  }, [editingTask, form]);

  const submit = () => {
    form.validateFields().then(async () => {
      const { cover, ...rest } = form.getFieldsValue();
      await mutateAsync({
        ...editingTask,
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
    <Drawer
      forceRender={true}
      title={editingTaskId ? "编辑任务" : "新增任务"}
      size={"large"}
      onClose={closeModal}
      open={taskModalOpen}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
      extra={
        <Space>
          <Button onClick={closeModal}>取消</Button>
          <Button onClick={submit} loading={mutateLoading} type="primary">
            提交
          </Button>
        </Space>
      }
    >
      <ErrorBox error={error} />
      {isLoading ? (
        <ModalLoading />
      ) : (
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="productType"
                label="关联产品类型"
                rules={[{ required: true, message: "请选择产品类型" }]}
              >
                <Select placeholder="请选择产品类型">
                  {productTypeOptions.map((item) => (
                    <Select.Option key={item.value} value={item.value}>
                      {item.text}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => {
                  // 监听formItem值变化
                  return prevValues.productType !== currentValues.productType;
                }}
              >
                {({ getFieldValue }) =>
                  getFieldValue("productType") === 1 ? (
                    <Form.Item
                      name="productId"
                      label="关联景点"
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
                              productName: selectedScenic.name,
                              tel: selectedScenic.tel,
                              address: selectedScenic.address,
                              latitude: selectedScenic.latitude,
                              longitude: selectedScenic.longitude,
                            });
                          } else {
                            form.setFieldsValue({
                              productName: "",
                              tel: "",
                              address: "",
                              latitude: "",
                              longitude: "",
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
                  ) : getFieldValue("productType") === 2 ? (
                    <Form.Item
                      name="productId"
                      label="关联酒店"
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
                              productName: selectedHotel.name,
                              tel: selectedHotel.tel,
                              address: selectedHotel.address,
                              latitude: selectedHotel.latitude,
                              longitude: selectedHotel.longitude,
                            });
                          } else {
                            form.setFieldsValue({
                              productName: "",
                              tel: "",
                              address: "",
                              latitude: "",
                              longitude: "",
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
                  ) : getFieldValue("productType") === 3 ? (
                    <Form.Item
                      name="productId"
                      label="关联餐厅"
                      rules={[{ required: true, message: "请选择餐厅" }]}
                    >
                      <Select
                        placeholder="请选择餐厅"
                        showSearch
                        filterOption={(input, option) =>
                          (option!.children as any)[1].props.children
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        onChange={(value) => {
                          const selectedRestaurant = restaurantOptions.find(
                            (item) => item.id === value
                          );
                          if (selectedRestaurant) {
                            form.setFieldsValue({
                              productName: selectedRestaurant.name,
                              tel: selectedRestaurant.tel,
                              address: selectedRestaurant.address,
                              latitude: selectedRestaurant.latitude,
                              longitude: selectedRestaurant.longitude,
                            });
                          } else {
                            form.setFieldsValue({
                              productName: "",
                              tel: "",
                              address: "",
                              latitude: "",
                              longitude: "",
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
                    <></>
                  )
                }
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="productType"
                label="关联产品类型"
                rules={[{ required: true, message: "请选择产品类型" }]}
              >
                <Select placeholder="请选择产品类型">
                  {productTypeOptions.map((item) => (
                    <Select.Option key={item.value} value={item.value}>
                      {item.text}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="desc" label="活动描述">
                <Input placeholder="请输入活动描述" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="scene" label="活动跳转场景">
                <Select placeholder="请选择活动跳转场景">
                  {productTypeOptions.map((item) => (
                    <Select.Option key={item.value} value={item.value}>
                      {item.text}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="param" label="活动链接/id">
                <Input placeholder="请输入活动链接/id" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => {
                  // 监听formItem值变化
                  return prevValues.position !== currentValues.position;
                }}
              >
                {({ getFieldValue }) => (
                  <Form.Item
                    name="cover"
                    label="活动封面"
                    tooltip={
                      getFieldValue("position") &&
                      statusOptions[getFieldValue("position") - 1].tips
                    }
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={[{ required: true, message: "请上传活动封面" }]}
                  >
                    <OssUpload maxCount={1} />
                  </Form.Item>
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </Drawer>
  );
};
