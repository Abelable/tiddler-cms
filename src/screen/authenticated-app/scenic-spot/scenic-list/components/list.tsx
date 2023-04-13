import styled from "@emotion/styled";
import {
  Image,
  Dropdown,
  Menu,
  MenuProps,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
  Tooltip,
} from "antd";
import { ButtonNoPadding, ErrorBox, Row, PageTitle } from "components/lib";
import dayjs from "dayjs";
import { useApprovedScenic, useDeleteScenic } from "service/scenic";
import { useScenicModal, useScenicListQueryKey, useRejectModal } from "../util";
import { SearchPanelProps } from "./search-panel";

import type { Scenic } from "types/scenic";

interface ListProps extends TableProps<Scenic>, SearchPanelProps {
  error: Error | unknown;
}

export const List = ({
  categoryOptions,
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
        <PageTitle>商品列表</PageTitle>
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
            dataIndex: "image",
            render: (value) => <Image width={68} src={value} />,
          },
          {
            title: "名称",
            dataIndex: "name",
            width: "24rem",
          },
          {
            title: "分类",
            dataIndex: "categoryId",
            render: (value) => (
              <>{categoryOptions.find((item) => item.id === value)?.name}</>
            ),
          },
          {
            title: "价格",
            dataIndex: "price",
            render: (value) => <>{`¥${value}`}</>,
          },
          {
            title: "库存",
            dataIndex: "stock",
          },
          {
            title: "分佣",
            dataIndex: "commissionRate",
            render: (value) => <>{`${value * 100}%`}</>,
          },
          {
            title: "销量",
            dataIndex: "salesVolume",
            sorter: (a, b) => Number(a) - Number(b),
          },
          {
            title: "状态",
            dataIndex: "status",
            render: (value, scenic) =>
              value === 0 ? (
                <span style={{ color: "#87d068" }}>待审核</span>
              ) : value === 1 ? (
                <span>售卖中</span>
              ) : (
                <Tooltip title={scenic.failureReason}>
                  <span style={{ color: "#f50", cursor: "pointer" }}>
                    未过审
                  </span>
                </Tooltip>
              ),
            filters: [
              { text: "待审核", value: 0 },
              { text: "售卖中", value: 1 },
              { text: "未过审", value: 2 },
            ],
            onFilter: (value, scenic) => scenic.status === value,
          },
          {
            title: "添加时间",
            render: (value, scenic) => (
              <span>
                {scenic.createdAt
                  ? dayjs(scenic.createdAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
          },
          {
            title: "修改时间",
            render: (value, scenic) => (
              <span>
                {scenic.updatedAt
                  ? dayjs(scenic.updatedAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.updatedAt).valueOf() - dayjs(b.updatedAt).valueOf(),
          },
          {
            title: "操作",
            render(value, scenic) {
              return <More id={scenic.id} status={scenic.status} />;
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
  const { open } = useScenicModal();
  const { mutate: deleteScenic } = useDeleteScenic(useScenicListQueryKey());
  const { mutate: approvedScenic } = useApprovedScenic(useScenicListQueryKey());
  const { open: openRejectModal } = useRejectModal();

  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: "确定删除该商品吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteScenic(id),
    });
  };

  const confirmApproved = (id: number) => {
    Modal.confirm({
      title: "商品审核通过确认",
      content: "请确保在商品信息无误的情况下进行该操作",
      okText: "确定",
      cancelText: "取消",
      onOk: () => approvedScenic(id),
    });
  };

  let items: MenuProps["items"];
  switch (status) {
    case 0:
      items = [
        {
          label: <div onClick={() => open(id)}>详情</div>,
          key: "detail",
        },
        {
          label: <div onClick={() => confirmApproved(id)}>通过</div>,
          key: "approved",
        },
        {
          label: <div onClick={() => openRejectModal(id)}>驳回</div>,
          key: "reject",
        },

        {
          label: <div onClick={() => confirmDelete(id)}>删除</div>,
          key: "delete",
        },
      ];
      break;

    case 1:
      items = [
        {
          label: <div onClick={() => open(id)}>详情</div>,
          key: "detail",
        },
        {
          label: <div onClick={() => openRejectModal(id)}>驳回重审</div>,
          key: "reject",
        },
        {
          label: <div onClick={() => confirmDelete(id)}>删除</div>,
          key: "delete",
        },
      ];
      break;

    case 2:
      items = [
        {
          label: <div onClick={() => open(id)}>详情</div>,
          key: "detail",
        },
        {
          label: <div onClick={() => confirmDelete(id)}>删除</div>,
          key: "delete",
        },
      ];
      break;
  }

  return (
    <Dropdown overlay={<Menu items={items} />}>
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
