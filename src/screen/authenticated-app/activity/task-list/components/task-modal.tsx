import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Space,
  Select,
  InputNumber,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox, ModalLoading, OptionCover } from "components/lib";
import { Map } from "components/map";

import { useEffect } from "react";
import { useAddTask, useEditTask } from "service/task";
import { useTaskModal, useTaskListQueryKey } from "../util";

import type { Option, ProductOption } from "types/common";

export const TaskModal = ({
  merchantTypeOptions,
  scenicOptions,
  hotelOptions,
  restaurantOptions,
}: {
  merchantTypeOptions: Option[];
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
      const { rewardList = [], ...rest } = editingTask;
      form.setFieldsValue({
        rewardOne: rewardList[0],
        rewardTwo: rewardList[1],
        rewardThree: rewardList[2],
        ...rest,
      });
    }
  }, [editingTask, form]);

  const setLng = (longitude: number | undefined) =>
    form.setFieldsValue({
      longitude,
    });
  const setLat = (latitude: number | undefined) =>
    form.setFieldsValue({
      latitude,
    });

  const submit = () => {
    form.validateFields().then(async () => {
      const { rewardOne, rewardTwo, rewardThree, ...rest } =
        form.getFieldsValue();
      await mutateAsync({
        ...editingTask,
        ...rest,
        rewardTotal: rewardOne + rewardTwo + rewardThree,
        rewardList: [rewardOne, rewardTwo, rewardThree],
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
          <Row>
            <Col span={24}>
              <Form.Item label="任务奖励" required>
                <Space.Compact>
                  <Row gutter={8}>
                    <Col span={8}>
                      <Form.Item
                        style={{ marginBottom: 0 }}
                        name="rewardOne"
                        rules={[
                          { required: true, message: "请输入阶段一奖励" },
                        ]}
                      >
                        <InputNumber
                          style={{ width: "100%" }}
                          placeholder="请输入阶段一奖励"
                          prefix="￥"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        style={{ marginBottom: 0 }}
                        name="rewardTwo"
                        rules={[
                          { required: true, message: "请输入阶段二奖励" },
                        ]}
                      >
                        <InputNumber
                          style={{ width: "100%" }}
                          placeholder="请输入阶段二奖励"
                          prefix="￥"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        style={{ marginBottom: 0 }}
                        name="rewardThree"
                        rules={[
                          { required: true, message: "请输入阶段三奖励" },
                        ]}
                      >
                        <InputNumber
                          style={{ width: "100%" }}
                          placeholder="请输入阶段三奖励"
                          prefix="￥"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Space.Compact>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="merchantType"
                label="商家类型"
                rules={[{ required: true, message: "请选择商家类型" }]}
              >
                <Select placeholder="请选择商家类型">
                  {merchantTypeOptions.map((item) => (
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
                  return prevValues.merchantType !== currentValues.merchantType;
                }}
              >
                {({ getFieldValue }) =>
                  getFieldValue("merchantType") === 1 ? (
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
                              merchantName: selectedScenic.name,
                              tel: selectedScenic.tel,
                              address: selectedScenic.address,
                              latitude: selectedScenic.latitude,
                              longitude: selectedScenic.longitude,
                            });
                          } else {
                            form.setFieldsValue({
                              merchantName: "",
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
                  ) : getFieldValue("merchantType") === 2 ? (
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
                              merchantName: selectedHotel.name,
                              tel: selectedHotel.tel,
                              address: selectedHotel.address,
                              latitude: selectedHotel.latitude,
                              longitude: selectedHotel.longitude,
                            });
                          } else {
                            form.setFieldsValue({
                              merchantName: "",
                              tel: "",
                              address: "",
                              latitude: "",
                              longitude: "",
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
                  ) : getFieldValue("merchantType") === 3 ? (
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
                              merchantName: selectedRestaurant.name,
                              tel: selectedRestaurant.tel,
                              address: selectedRestaurant.address,
                              latitude: selectedRestaurant.latitude,
                              longitude: selectedRestaurant.longitude,
                            });
                          } else {
                            form.setFieldsValue({
                              merchantName: "",
                              tel: "",
                              address: "",
                              latitude: "",
                              longitude: "",
                            });
                          }
                        }}
                      >
                        {restaurantOptions.map(({ id, cover, name }) => (
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
                name="merchantName"
                label="商家名称"
                rules={[{ required: true, message: "请输入商家名称" }]}
              >
                <Input placeholder="请输入商家名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="tel" label="商家联系电话">
                <Input placeholder="请输入联系电话" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="经纬度" required>
                <Space.Compact>
                  <Row gutter={8}>
                    <Col span={12}>
                      <Form.Item
                        style={{ marginBottom: 0 }}
                        name="longitude"
                        rules={[{ required: true, message: "请输入经度" }]}
                      >
                        <Input placeholder="请输入经度" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        style={{ marginBottom: 0 }}
                        name="latitude"
                        rules={[{ required: true, message: "请输入纬度" }]}
                      >
                        <Input placeholder="请输入纬度" />
                      </Form.Item>
                    </Col>
                  </Row>
                </Space.Compact>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="address"
                label="地址详情"
                rules={[{ required: true, message: "请输入景点地址详情" }]}
              >
                <Input placeholder="请输入景点地址详情" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Map setLng={setLng} setLat={setLat} />
            </Col>
          </Row>
        </Form>
      )}
    </Drawer>
  );
};
