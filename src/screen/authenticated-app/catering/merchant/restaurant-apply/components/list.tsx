import styled from "@emotion/styled";
import {
  Dropdown,
  MenuProps,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
  Image,
} from "antd";
import { ButtonNoPadding, ErrorBox, Row, PageTitle } from "components/lib";
import dayjs from "dayjs";
import { ShopRestaurant } from "types/shopRestaurant";
import { useShopRestaurantListQueryKey, useRejectModal } from "../util";
import { SearchPanelProps } from "./search-panel";
import {
  useApproveShopRestaurant,
  useDeleteShopRestaurant,
} from "service/shopRestaurant";

interface ListProps extends TableProps<ShopRestaurant>, SearchPanelProps {
  error: Error | unknown;
}

export const List = ({
  statusOptions,
  error,
  params,
  setParams,
  ...restProps
}: ListProps) => {
  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      limit: pagination.pageSize,
    });

  return (
    <Container>
      <Header between={true}>
        <PageTitle>门店申请列表</PageTitle>
      </Header>
      <ErrorBox error={error} />
      <Table
        rowKey={"id"}
        scroll={{ x: 1600 }}
        columns={[
          {
            title: "id",
            dataIndex: "id",
            width: "8rem",
            fixed: "left",
          },
          {
            title: "门店图片",
            dataIndex: "restaurantCover",
            render: (value) => <Image width={68} src={value} />,
            width: "14rem",
          },
          {
            title: "门店名称",
            dataIndex: "restaurantName",
            width: "32rem",
          },
          {
            title: "申请商家",
            dataIndex: "merchantName",
            width: "32rem",
            render: (value) => <>{value || "个体商户"}</>,
          },
          {
            title: "商家资质",
            dataIndex: "businessLicense",
            render: (value) => <Image width={68} src={value} />,
            width: "14rem",
          },
          {
            title: "状态",
            dataIndex: "status",
            render: (value) => (
              <span style={{ color: statusOptions[value].color }}>
                {statusOptions[value].text}
              </span>
            ),
            filters: statusOptions,
            onFilter: (value, restaurant) => restaurant.status === value,
            width: "12rem",
          },
          {
            title: "申请时间",
            render: (value, apply) => (
              <span>
                {apply.createdAt
                  ? dayjs(apply.createdAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
          },
          {
            title: "更新时间",
            render: (value, apply) => (
              <span>
                {apply.updatedAt
                  ? dayjs(apply.updatedAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.updatedAt).valueOf() - dayjs(b.updatedAt).valueOf(),
          },
          {
            title: "操作",
            render(value, apply) {
              return <More id={apply.id} status={apply.status} />;
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

const More = ({ id, status }: { id: number; status: number }) => {
  const { mutate: approveShopRestaurant } = useApproveShopRestaurant(
    useShopRestaurantListQueryKey()
  );
  const { mutate: deleteShopRestaurant } = useDeleteShopRestaurant(
    useShopRestaurantListQueryKey()
  );
  const { open: openRejectModal } = useRejectModal();

  const confirmApprove = (id: number) => {
    Modal.confirm({
      title: "门店申请通过确认",
      content: "请确保在商家有门店相关资质的情况下进行该操作",
      okText: "确定",
      cancelText: "取消",
      onOk: () => approveShopRestaurant(id),
    });
  };

  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: "确定删除该门店申请吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteShopRestaurant(id),
    });
  };

  const items: MenuProps["items"] =
    status === 0
      ? [
          {
            label: <div onClick={() => confirmApprove(id)}>通过</div>,
            key: "approve",
          },
          {
            label: <div onClick={() => openRejectModal(id)}>驳回</div>,
            key: "reject",
          },
          {
            label: <div onClick={() => confirmDelete(id)}>删除</div>,
            key: "delete",
          },
        ]
      : [
          {
            label: <div onClick={() => confirmDelete(id)}>删除</div>,
            key: "delete",
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
  border-radius: 0.6rem;
`;

const Header = styled(Row)`
  margin-bottom: 2.4rem;
`;
