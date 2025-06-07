import dayjs from "dayjs";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useHotelModal, useHotelListQueryKey } from "../util";

import {
  Dropdown,
  MenuProps,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
  Button,
  Image,
} from "antd";
import { ButtonNoPadding, ErrorBox, Row, PageTitle } from "components/lib";
import { useDeleteHotel } from "service/hotel";
import { PlusOutlined } from "@ant-design/icons";
import { SearchPanelProps } from "./search-panel";

import type { Hotel } from "types/hotel";

interface ListProps extends TableProps<Hotel>, SearchPanelProps {
  error: Error | unknown;
}

export const List = ({
  gradeOptions,
  categoryOptions,
  error,
  params,
  setParams,
  ...restProps
}: ListProps) => {
  const { open } = useHotelModal();
  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      limit: pagination.pageSize,
    });

  return (
    <Container>
      <Header between={true}>
        <PageTitle>酒店列表</PageTitle>
        <Button onClick={() => open()} type={"primary"} icon={<PlusOutlined />}>
          新增
        </Button>
      </Header>
      <ErrorBox error={error} />
      <Table
        rowKey={"id"}
        scroll={{ x: 1500 }}
        columns={[
          {
            title: "id",
            dataIndex: "id",
            width: "8rem",
            fixed: "left",
          },
          {
            title: "图片",
            dataIndex: "cover",
            render: (value) => <Image width={68} src={value} />,
            width: "14rem",
          },
          {
            title: "名称",
            dataIndex: "name",
          },
          {
            title: "档次",
            dataIndex: "grade",
            width: "14rem",
            render: (value) => (
              <>{gradeOptions.find((item) => item.value === value)?.text}</>
            ),
          },
          {
            title: "分类",
            dataIndex: "categoryId",
            width: "14rem",
            render: (value) => (
              <>{categoryOptions.find((item) => item.id === value)?.name}</>
            ),
          },
          {
            title: "价格",
            dataIndex: "price",
            width: "14rem",
            render: (value) => <>{`¥${value}起`}</>,
          },
          {
            title: "评分",
            dataIndex: "score",
            width: "12rem",
          },
          {
            title: "创建时间",
            render: (value, hotel) => (
              <span>
                {hotel.createdAt
                  ? dayjs(hotel.createdAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
          },
          {
            title: "更新时间",
            render: (value, hotel) => (
              <span>
                {hotel.updatedAt
                  ? dayjs(hotel.updatedAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.updatedAt).valueOf() - dayjs(b.updatedAt).valueOf(),
          },
          {
            title: "操作",
            render(value, hotel) {
              return <More id={hotel.id} name={hotel.name} />;
            },
            width: "8rem",
            fixed: "right",
          },
        ]}
        onChange={setPagination}
        {...restProps}
      />
    </Container>
  );
};

const More = ({ id, name }: { id: number; name: string }) => {
  const navigate = useNavigate();
  const link = (id: string, name: string) =>
    navigate(
      `/hotel/store/list/room_type_list?hotelId=${id}&hotelName=${name}`
    );

  const { startEdit } = useHotelModal();
  const { mutate: deleteHotel } = useDeleteHotel(useHotelListQueryKey());

  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: "确定删除该酒店吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteHotel(id),
    });
  };

  let items: MenuProps["items"] = [
    {
      label: <div onClick={() => startEdit(id)}>编辑</div>,
      key: "detail",
    },
    {
      label: <div onClick={() => confirmDelete(id)}>删除</div>,
      key: "delete",
    },
    {
      label: <div onClick={() => link(`${id}`, name)}>查看房型</div>,
      key: "room_type",
    },
  ];

  return (
    <Dropdown menu={{ items }}>
      <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
    </Dropdown>
  );
};

const Container = styled.div`
  margin-top: 2.4rem;
  padding: 2.4rem;
  background: #fff;
`;

const Header = styled(Row)`
  margin-bottom: 2.4rem;
`;
