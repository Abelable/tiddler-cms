import { useEffect } from "react";
import { useForm } from "antd/lib/form/Form";
import moment from "moment";
import { useAddRestaurant, useEditRestaurant } from "service/restaurant";
import { useRestaurantModal, useRestaurantListQueryKey } from "../util";

import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  TimePicker,
  InputNumber,
} from "antd";
import { OssUpload } from "components/oss-upload";
import { ErrorBox, ModalLoading } from "components/lib";
import { Map } from "components/map";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import type { CategoryOption } from "types/category";
import type { Option } from "types/common";

const monthOptions = [
  { id: 1, name: "1月" },
  { id: 2, name: "2月" },
  { id: 3, name: "3月" },
  { id: 4, name: "4月" },
  { id: 5, name: "5月" },
  { id: 6, name: "6月" },
  { id: 7, name: "7月" },
  { id: 8, name: "8月" },
  { id: 9, name: "9月" },
  { id: 10, name: "10月" },
  { id: 11, name: "11月" },
  { id: 12, name: "12月" },
];

const normFile = (e: any) => {
  if (Array.isArray(e)) return e;
  return e && e.fileList;
};

export const RestaurantModal = ({
  categoryOptions,
  statusOptions,
}: {
  categoryOptions: CategoryOption[];
  statusOptions: Option[];
}) => {
  const [form] = useForm();

  const {
    restaurantModalOpen,
    editingRestaurantId,
    editingRestaurant,
    isLoading,
    close,
  } = useRestaurantModal();

  const useMutationRestaurant = editingRestaurantId
    ? useEditRestaurant
    : useAddRestaurant;
  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useMutationRestaurant(useRestaurantListQueryKey());

  useEffect(() => {
    if (editingRestaurant) {
      const {
        logo,
        video,
        cover,
        foodImageList,
        environmentImageList,
        priceImageList,
        openTimeList,
        ...rest
      } = editingRestaurant;
      form.setFieldsValue({
        logo: logo ? [{ url: logo }] : [],
        video: video
          ? [
              {
                url: video,
                thumbUrl: `${video}?x-oss-process=video/snapshot,t_0`,
              },
            ]
          : [],
        cover: cover ? [{ url: cover }] : [],
        foodImageList: foodImageList?.length
          ? foodImageList?.map((item) => ({ url: item }))
          : foodImageList,
        environmentImageList: environmentImageList?.length
          ? environmentImageList?.map((item) => ({ url: item }))
          : environmentImageList,
        priceImageList: priceImageList?.length
          ? priceImageList?.map((item) => ({ url: item }))
          : priceImageList,
        openTimeList: openTimeList?.length
          ? openTimeList.map((item) => ({
              ...item,
              openTime: moment(item.openTime),
              closeTime: moment(item.openTime),
            }))
          : openTimeList,
        ...rest,
      });
    }
  }, [editingRestaurant, form]);

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
      const {
        logo,
        video,
        cover,
        foodImageList,
        environmentImageList,
        priceImageList,
        ...rest
      } = form.getFieldsValue();
      await mutateAsync({
        ...editingRestaurant,
        ...rest,
        logo: logo && logo.length ? logo[0].url : "",
        video: video && video.length ? video[0].url : "",
        cover: cover && cover.length ? cover[0].url : "",
        foodImageList: foodImageList.map((item: { url: string }) => item.url),
        environmentImageList: environmentImageList.map(
          (item: { url: string }) => item.url
        ),
        priceImageList: priceImageList.map((item: { url: string }) => item.url),
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
      title={editingRestaurantId ? "编辑门店" : "新增门店"}
      size={"large"}
      forceRender={true}
      onClose={closeModal}
      open={restaurantModalOpen}
      bodyStyle={{ paddingBottom: 80 }}
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
                name="categoryId"
                label="门店类型"
                rules={[{ required: true, message: "请选择门店类型" }]}
              >
                <Select placeholder="请选择门店类型">
                  {categoryOptions.map(({ id, name }) => (
                    <Select.Option key={id} value={id}>
                      {name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="name"
                label="门店名称"
                rules={[{ required: true, message: "请输入门店名称" }]}
              >
                <Input placeholder="请输入门店名称" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="price"
                label="人均消费价格"
                rules={[{ required: true, message: "请填写人均消费价格" }]}
              >
                <InputNumber
                  prefix="￥"
                  style={{ width: "100%" }}
                  placeholder="请填写人均消费价格"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="openStatus"
                label="营业状态"
                rules={[{ required: true, message: "请选择营业状态" }]}
              >
                <Select placeholder="请选择营业状态">
                  {statusOptions?.map(({ text, value }) => (
                    <Select.Option key={value} value={value}>
                      {text}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="logo"
                label="上传门店logo照片"
                tooltip="图片大小不能超过10MB"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[{ required: true, message: "请上传门店logo照片" }]}
              >
                <OssUpload maxCount={1} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="cover"
                label="上传门店封面照片"
                tooltip="图片大小不能超过10MB"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[{ required: true, message: "请上传门店封面照片" }]}
              >
                <OssUpload maxCount={1} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="video"
                label="上传门店视频"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <OssUpload accept=".mp4" maxCount={1} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="foodImageList"
                label="上传菜品照片"
                tooltip="图片大小不能超过10MB"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <OssUpload />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="environmentImageList"
                label="上传环境照片"
                tooltip="图片大小不能超过10MB"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <OssUpload />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="priceImageList"
                label="上传价目表照片"
                tooltip="图片大小不能超过10MB"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <OssUpload />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="门店所在经纬度" required>
                <Input.Group>
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
                </Input.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="address"
                label="门店地址详情"
                rules={[{ required: true, message: "请输入门店地址详情" }]}
              >
                <Input placeholder="请输入门店地址详情" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Map setLng={setLng} setLat={setLat} />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="营业时间">
                <Form.List name="openTimeList">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <Space
                          key={key}
                          style={{ display: "flex" }}
                          align="baseline"
                        >
                          <Form.Item
                            {...restField}
                            name={[name, "openMonth"]}
                            rules={[
                              { required: true, message: "请选择开始月份" },
                            ]}
                          >
                            <Select
                              style={{ width: "10rem" }}
                              placeholder="开始月份"
                            >
                              {monthOptions.map((monthOption) => (
                                <Select.Option
                                  key={monthOption.id}
                                  value={monthOption.id}
                                >
                                  {monthOption.name}
                                </Select.Option>
                              ))}
                            </Select>
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, "closeMonth"]}
                            rules={[
                              { required: true, message: "请选择结束月份" },
                            ]}
                          >
                            <Select
                              style={{ width: "10rem" }}
                              placeholder="结束月份"
                            >
                              {monthOptions.map((monthOption) => (
                                <Select.Option
                                  key={monthOption.id}
                                  value={monthOption.id}
                                >
                                  {monthOption.name}
                                </Select.Option>
                              ))}
                            </Select>
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, "openTime"]}
                            rules={[
                              { required: true, message: "请选择开始时间" },
                            ]}
                          >
                            <TimePicker format="HH:mm" placeholder="开始时间" />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, "closeTime"]}
                            rules={[
                              { required: true, message: "请选择结束时间" },
                            ]}
                          >
                            <TimePicker format="HH:mm" placeholder="结束时间" />
                          </Form.Item>
                          <Form.Item {...restField} name={[name, "tips"]}>
                            <Input placeholder="补充时间提示" />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        添加开放时间
                      </Button>
                    </>
                  )}
                </Form.List>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="联系电话">
                <Form.List name="telList">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <Space
                          key={key}
                          style={{ display: "flex" }}
                          align="baseline"
                        >
                          <Form.Item
                            {...restField}
                            name={name}
                            rules={[
                              { required: true, message: "请输入联系电话" },
                            ]}
                          >
                            <Input
                              style={{ width: "31rem" }}
                              placeholder="请输入联系电话"
                            />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        添加联系电话
                      </Button>
                    </>
                  )}
                </Form.List>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="服务设施">
                <Form.List name="facilityList">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <Space
                          key={key}
                          style={{ display: "flex" }}
                          align="baseline"
                        >
                          <Form.Item
                            {...restField}
                            name={name}
                            rules={[
                              { required: true, message: "请输入设施名称" },
                            ]}
                          >
                            <Input
                              style={{ width: "31rem" }}
                              placeholder="请输入设施名称"
                            />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        添加服务设施
                      </Button>
                    </>
                  )}
                </Form.List>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </Drawer>
  );
};
