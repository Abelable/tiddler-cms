import styled from "@emotion/styled";
import {
  Dropdown,
  MenuProps,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
  Tooltip,
} from "antd";
import { ButtonNoPadding, ErrorBox, Row, PageTitle } from "components/lib";
import dayjs from "dayjs";
import { useApproveRoom, useDeleteRoom } from "service/hotelRoom";
import { useRoomModal, useRoomListQueryKey, useRejectModal } from "../util";
import { SearchPanelProps } from "./search-panel";

import type { Room } from "types/hotelRoom";

interface ListProps extends TableProps<Room>, SearchPanelProps {
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
        <PageTitle>房间列表</PageTitle>
      </Header>
      <ErrorBox error={error} />
      <Table
        rowKey={"id"}
        scroll={{ x: 2000 }}
        columns={[
          {
            title: "id",
            dataIndex: "id",
            width: "8rem",
            fixed: "left",
          },
          {
            title: "房型名称",
            dataIndex: "typeName",
            width: "24rem",
          },
          {
            title: "关联酒店",
            dataIndex: "hotelName",
            width: "24rem",
          },
          {
            title: "状态",
            dataIndex: "status",
            render: (value, ticket) =>
              value === 0 ? (
                <span style={{ color: "#87d068" }}>待审核</span>
              ) : value === 1 ? (
                <span style={{ color: "#296BEF" }}>售卖中</span>
              ) : (
                <Tooltip title={ticket.failureReason}>
                  <span style={{ color: "#f50", cursor: "pointer" }}>
                    未过审
                  </span>
                </Tooltip>
              ),
            filters: statusOptions,
            onFilter: (value, ticket) => ticket.status === value,
            width: "16rem",
          },
          {
            title: "价格",
            dataIndex: "price",
            render: (value) => <>{`¥${value}起`}</>,
            width: "16rem",
          },
          {
            title: "销售佣金比例",
            dataIndex: "salesCommissionRate",
            render: (value) => <>{`${value}%`}</>,
            width: "16rem",
          },
          {
            title: "代言奖励比例",
            dataIndex: "promotionCommissionRate",
            render: (value) => <>{`${value}%`}</>,
            width: "16rem",
          },
          {
            title: "销量",
            dataIndex: "salesVolume",
            sorter: (a, b) => Number(a) - Number(b),
            width: "16rem",
          },
          {
            title: "早餐数量",
            dataIndex: "breakfastNum",
            render: (value) => <>{value ? `${value}份早餐` : "不含早餐"}</>,
            width: "16rem",
          },
          {
            title: "入住人数",
            dataIndex: "guestNum",
            width: "16rem",
          },
          {
            title: "免费取消",
            dataIndex: "cancellable",
            render: (value) =>
              value ? (
                <span style={{ color: "#87d068" }}>可免费取消</span>
              ) : (
                <span style={{ color: "#f50" }}>不可取消</span>
              ),
            width: "16rem",
          },
          {
            title: "创建时间",
            render: (value, ticket) => (
              <span>
                {ticket.createdAt
                  ? dayjs(ticket.createdAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
          },
          {
            title: "更新时间",
            render: (value, ticket) => (
              <span>
                {ticket.updatedAt
                  ? dayjs(ticket.updatedAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.updatedAt).valueOf() - dayjs(b.updatedAt).valueOf(),
          },
          {
            title: "操作",
            render(value, ticket) {
              return <More id={ticket.id} status={ticket.status} />;
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
  const { open } = useRoomModal();
  const { mutate: deleteRoom } = useDeleteRoom(useRoomListQueryKey());
  const { mutate: approveRoom } = useApproveRoom(useRoomListQueryKey());
  const { open: openRejectModal } = useRejectModal();

  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: "确定删除该房间吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteRoom(id),
    });
  };

  const confirmApprove = (id: number) => {
    Modal.confirm({
      title: "房间审核通过确认",
      content: "请确保在房间信息无误的情况下进行该操作",
      okText: "确定",
      cancelText: "取消",
      onOk: () => approveRoom(id),
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
