import { useEffect } from "react";
import { useForm } from "antd/lib/form/Form";
import { UserOutlined } from "@ant-design/icons";
import { useAddTourismNote, useEditTourismNote } from "service/tourismNote";
import { useTourismNoteModal, useTourismNoteListQueryKey } from "../util";

import { Button, Col, Drawer, Form, Input, Row, Select, Space } from "antd";
import { OssUpload } from "components/oss-upload";
import {
  ErrorBox,
  ModalLoading,
  OptionAvatar,
  OptionCover,
} from "components/lib";
import { Map } from "components/map";

import type { ProductOption } from "types/common";
import type { UserOption } from "types/user";

const normFile = (e: any) => {
  if (Array.isArray(e)) return e;
  return e && e.fileList;
};

export const TourismNoteModal = ({
  userOptions,
  scenicOptions,
  hotelOptions,
  restaurantOptions,
  goodsOptions,
}: {
  userOptions: UserOption[];
  scenicOptions: ProductOption[];
  hotelOptions: ProductOption[];
  restaurantOptions: ProductOption[];
  goodsOptions: ProductOption[];
}) => {
  const [form] = useForm();

  const {
    tourismNoteModalOpen,
    editingTourismNoteId,
    editingTourismNote,
    isLoading,
    close,
  } = useTourismNoteModal();

  const useMutationTourismNote = editingTourismNoteId
    ? useEditTourismNote
    : useAddTourismNote;
  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useMutationTourismNote(useTourismNoteListQueryKey());

  useEffect(() => {
    if (editingTourismNote) {
      const { imageList, ...rest } = editingTourismNote;
      form.setFieldsValue({
        imageList: imageList?.length
          ? imageList?.map((item) => ({ url: item }))
          : imageList,
        ...rest,
      });
    }
  }, [editingTourismNote, form]);

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
      const { imageList, ...rest } = form.getFieldsValue();
      await mutateAsync({
        ...editingTourismNote,
        ...rest,
        imageList: imageList.map((item: { url: string }) => item.url),
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
      title={editingTourismNoteId ? "编辑图文游记" : "新增图文游记"}
      size={"large"}
      forceRender={true}
      onClose={closeModal}
      open={tourismNoteModalOpen}
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
            <Col span={24}>
              <Form.Item
                name="imageList"
                label="图片列表"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                tooltip="图片大小不能超过10MB"
                rules={[{ required: true, message: "请上传图片" }]}
              >
                <OssUpload multiple />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="title"
                label="标题"
                rules={[{ required: true, message: "请输入标题" }]}
              >
                <Input placeholder="请输入标题" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="userId"
                label="作者"
                rules={[{ required: true, message: "请选择作者" }]}
              >
                <Select
                  placeholder="请选择作者"
                  showSearch
                  filterOption={(input, option) =>
                    (option!.children as any)[1].props.children
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                >
                  {userOptions.map(({ id, avatar, nickname }) => (
                    <Select.Option key={id} value={id}>
                      <OptionAvatar src={avatar} icon={<UserOutlined />} />
                      <span>{nickname}</span>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="content"
                label="内容"
                rules={[{ required: true, message: "请输入内容" }]}
              >
                <Input.TextArea rows={6} placeholder="请输入内容" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="scenicIds" label="关联景点">
                <Select
                  mode="multiple"
                  showSearch
                  filterOption={(input, option) =>
                    (option!.children as any)[1].props.children
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  placeholder="请选择关联景点"
                >
                  {scenicOptions.map(({ id, cover, name }) => (
                    <Select.Option key={id} value={id}>
                      <OptionCover src={cover} />
                      <span>{name}</span>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="hotelIds" label="关联酒店">
                <Select
                  mode="multiple"
                  showSearch
                  filterOption={(input, option) =>
                    (option!.children as any)[1].props.children
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  placeholder="请选择关联酒店"
                >
                  {hotelOptions.map(({ id, cover, name }) => (
                    <Select.Option key={id} value={id}>
                      <OptionCover src={cover} />
                      <span>{name}</span>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="restaurantIds" label="关联餐馆">
                <Select
                  mode="multiple"
                  showSearch
                  filterOption={(input, option) =>
                    (option!.children as any)[1].props.children
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  placeholder="请选择关联餐馆"
                >
                  {restaurantOptions.map(({ id, cover, name }) => (
                    <Select.Option key={id} value={id}>
                      <OptionCover src={cover} />
                      <span>{name}</span>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="goodsIds" label="关联商品">
                <Select
                  mode="multiple"
                  showSearch
                  filterOption={(input, option) =>
                    (option!.children as any)[1].props.children
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  placeholder="请选择关联商品"
                >
                  {goodsOptions.map(({ id, cover, name }) => (
                    <Select.Option key={id} value={id}>
                      <OptionCover src={cover} />
                      <span>{name}</span>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="游记所在经纬度" required>
                <Input.Group>
                  <Row gutter={8}>
                    <Col span={12}>
                      <Form.Item style={{ marginBottom: 0 }} name="longitude">
                        <Input placeholder="请输入经度" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item style={{ marginBottom: 0 }} name="latitude">
                        <Input placeholder="请输入纬度" />
                      </Form.Item>
                    </Col>
                  </Row>
                </Input.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="address" label="游记地址详情">
                <Input placeholder="请输入游记地址详情" />
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
