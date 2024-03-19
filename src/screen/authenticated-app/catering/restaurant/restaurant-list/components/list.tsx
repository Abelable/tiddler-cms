import dayjs from "dayjs";
import styled from "@emotion/styled";
import { useRestaurantModal, useRestaurantListQueryKey } from "../util";

import {
  Dropdown,
  Menu,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
  Button,
  Rate,
  Image,
} from "antd";
import { ButtonNoPadding, ErrorBox, Row, PageTitle } from "components/lib";
import { useDeleteRestaurant } from "service/restaurant";
import { PlusOutlined } from "@ant-design/icons";
import { SearchPanelProps } from "./search-panel";

import type { Restaurant } from "types/restaurant";

interface ListProps extends TableProps<Restaurant>, SearchPanelProps {
  error: Error | unknown;
}

export const List = ({
  categoryOptions,
  error,
  params,
  setParams,
  ...restProps
}: ListProps) => {
  const { open } = useRestaurantModal();
  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      limit: pagination.pageSize,
    });

  return (
    <Container>
      <Header between={true}>
        <PageTitle>门店列表</PageTitle>
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
            title: "分类",
            dataIndex: "categoryId",
            width: "18rem",
            render: (value) => (
              <>{categoryOptions.find((item) => item.id === value)?.name}</>
            ),
          },
          {
            title: "综合评分",
            dataIndex: "score",
            width: "22rem",
            render: (value) => (
              <>
                <Rate allowHalf value={value} />
                <span style={{ marginLeft: "1rem" }}>{value}</span>
              </>
            ),
          },
          {
            title: "创建时间",
            render: (value, restaurant) => (
              <span>
                {restaurant.createdAt
                  ? dayjs(restaurant.createdAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
          },
          {
            title: "更新时间",
            render: (value, restaurant) => (
              <span>
                {restaurant.updatedAt
                  ? dayjs(restaurant.updatedAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.updatedAt).valueOf() - dayjs(b.updatedAt).valueOf(),
          },
          {
            title: "操作",
            render(value, restaurant) {
              return <More id={restaurant.id} />;
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

const More = ({ id }: { id: number }) => {
  const { startEdit } = useRestaurantModal();
  const { mutate: deleteRestaurant } = useDeleteRestaurant(
    useRestaurantListQueryKey()
  );

  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: "确定删除该门店吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteRestaurant(id),
    });
  };

  return (
    <Dropdown
      overlay={
        <Menu
          items={[
            {
              label: <div onClick={() => startEdit(id)}>编辑</div>,
              key: "detail",
            },
            {
              label: <div onClick={() => confirmDelete(id)}>删除</div>,
              key: "delete",
            },
          ]}
        />
      }
    >
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
