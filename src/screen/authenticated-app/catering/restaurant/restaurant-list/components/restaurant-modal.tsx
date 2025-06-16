import { useEffect } from "react";
import { useForm } from "antd/lib/form/Form";
import dayjs from "dayjs";
import styled from "@emotion/styled";
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
import { ErrorBox, ModalLoading, Row as CustomRow } from "components/lib";
import { Map } from "components/map";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import type { DataOption } from "types/common";
import type { OpenTime } from "types/restaurant";

const weekDayOptions = [
  { text: "周一", value: 1 },
  { text: "周二", value: 2 },
  { text: "周三", value: 3 },
  { text: "周四", value: 4 },
  { text: "周五", value: 5 },
  { text: "周六", value: 6 },
  { text: "周日", value: 7 },
];

const normFile = (e: any) => {
  if (Array.isArray(e)) return e;
  return e && e.fileList;
};

export const RestaurantModal = ({
  categoryOptions,
}: {
  categoryOptions: DataOption[];
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
        video,
        cover,
        foodImageList,
        environmentImageList,
        priceImageList,
        openTimeList,
        ...rest
      } = editingRestaurant;
      form.setFieldsValue({
        video: video
          ? [
              {
                url: video,
                thumbUrl: `${video}?x-oss-process=video/snapshot,t_0`,
              },
            ]
          : [],
        cover: cover ? [{ url: cover }] : [],
        foodImageList: foodImageList.length
          ? foodImageList?.map((item) => ({ url: item }))
          : [],
        environmentImageList: environmentImageList.length
          ? environmentImageList?.map((item) => ({
              url: item,
            }))
          : [],
        priceImageList: priceImageList.length
          ? priceImageList?.map((item) => ({ url: item }))
          : [],
        openTimeList: openTimeList.length
          ? openTimeList.map((item) => ({
              startWeekDay: +item.startWeekDay,
              endWeekDay: +item.endWeekDay,
              timeFrameList: item.timeFrameList.map((_item) => ({
                openTime: dayjs(_item.openTime, "HH:mm"),
                closeTime: dayjs(_item.closeTime, "HH:mm"),
              })),
            }))
          : [],
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
        openTimeList,
        ...rest
      } = form.getFieldsValue();
      await mutateAsync({
        ...editingRestaurant,
        ...rest,
        video: video && video.length ? video[0].url : "",
        cover: cover && cover.length ? cover[0].url : "",
        foodImageList:
          foodImageList && foodImageList.length
            ? foodImageList.map((item: { url: string }) => item.url)
            : [],
        environmentImageList:
          environmentImageList && environmentImageList.length
            ? environmentImageList.map((item: { url: string }) => item.url)
            : [],
        priceImageList:
          priceImageList && priceImageList.length
            ? priceImageList.map((item: { url: string }) => item.url)
            : [],
        openTimeList:
          openTimeList && openTimeList.length
            ? openTimeList.map((item: OpenTime) => ({
                ...item,
                timeFrameList: item.timeFrameList.map((_item) => ({
                  openTime: dayjs(_item.openTime).format("HH:mm"),
                  closeTime: dayjs(_item.closeTime).format("HH:mm"),
                })),
              }))
            : [],
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
                name="name"
                label="门店名称"
                rules={[{ required: true, message: "请输入门店名称" }]}
              >
                <Input placeholder="请输入门店名称" />
              </Form.Item>
            </Col>
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
          </Row>
          <Row gutter={16}>
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
                <OssUpload multiple />
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
                <OssUpload multiple />
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
                <OssUpload multiple />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="门店所在经纬度" required>
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
            <Col span={12}>
              <Form.Item label="营业时间">
                <Form.List name="openTimeList">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <CustomRow key={key} style={{ marginBottom: "2rem" }}>
                          <Card style={{ marginRight: "1rem" }}>
                            <CustomRow between>
                              <Form.Item
                                {...restField}
                                name={[name, "startWeekDay"]}
                                rules={[
                                  { required: true, message: "请选择开始时间" },
                                ]}
                              >
                                <Select
                                  style={{ width: "13.8rem" }}
                                  placeholder="开始时间"
                                >
                                  {weekDayOptions.map(({ text, value }) => (
                                    <Select.Option key={value} value={value}>
                                      {text}
                                    </Select.Option>
                                  ))}
                                </Select>
                              </Form.Item>
                              <Form.Item
                                {...restField}
                                name={[name, "endWeekDay"]}
                                rules={[
                                  { required: true, message: "请选择结束时间" },
                                ]}
                              >
                                <Select
                                  style={{ width: "13.8rem" }}
                                  placeholder="结束时间"
                                >
                                  {weekDayOptions.map(({ text, value }) => (
                                    <Select.Option key={value} value={value}>
                                      {text}
                                    </Select.Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </CustomRow>
                            <Form.List name={[name, "timeFrameList"]}>
                              {(
                                fieldsInside,
                                { add: addInside, remove: removeInside }
                              ) => (
                                <TimeFrameWrap>
                                  {fieldsInside.map(
                                    ({
                                      key: insideKey,
                                      name: insideName,
                                      ...insideRestField
                                    }) => (
                                      <Space
                                        key={insideKey}
                                        style={{ display: "flex" }}
                                        align="baseline"
                                      >
                                        <Form.Item
                                          {...insideRestField}
                                          name={[insideName, "openTime"]}
                                          rules={[
                                            {
                                              required: true,
                                              message: "请选择开业时间",
                                            },
                                          ]}
                                        >
                                          <TimePicker
                                            format="HH:mm"
                                            placeholder="开业时间"
                                          />
                                        </Form.Item>
                                        <Form.Item
                                          {...insideRestField}
                                          name={[insideName, "closeTime"]}
                                          rules={[
                                            {
                                              required: true,
                                              message: "请选择休息时间",
                                            },
                                          ]}
                                        >
                                          <TimePicker
                                            format="HH:mm"
                                            placeholder="休息时间"
                                          />
                                        </Form.Item>
                                        <MinusCircleOutlined
                                          style={{ color: "#ff4d4f" }}
                                          onClick={() =>
                                            removeInside(insideName)
                                          }
                                        />
                                      </Space>
                                    )
                                  )}
                                  <Button
                                    type="dashed"
                                    onClick={() => addInside()}
                                    block
                                    icon={<PlusOutlined />}
                                  >
                                    添加时间段
                                  </Button>
                                </TimeFrameWrap>
                              )}
                            </Form.List>
                          </Card>
                          <MinusCircleOutlined
                            style={{ color: "#ff4d4f" }}
                            onClick={() => remove(name)}
                          />
                        </CustomRow>
                      ))}
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        添加营业时间
                      </Button>
                    </>
                  )}
                </Form.List>
              </Form.Item>
            </Col>
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
                          <MinusCircleOutlined
                            style={{ color: "#ff4d4f" }}
                            onClick={() => remove(name)}
                          />
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
          </Row>
          <Row gutter={16}>
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
                          <MinusCircleOutlined
                            style={{ color: "#ff4d4f" }}
                            onClick={() => remove(name)}
                          />
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

const Card = styled.div`
  padding: 1rem;
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 1rem;
`;
const TimeFrameWrap = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #ddd;
`;
