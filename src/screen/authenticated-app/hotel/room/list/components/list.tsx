import styled from "@emotion/styled";
import {
  Dropdown,
  InputNumber,
  MenuProps,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
  Tag,
  Tooltip,
} from "antd";
import { ButtonNoPadding, ErrorBox, Row, PageTitle } from "components/lib";
import dayjs from "dayjs";
import {
  useApproveRoom,
  useDeleteRoom,
  useEditRoomCommission,
} from "service/hotelRoom";
import {
  useRoomModal,
  useRoomListQueryKey,
  useRejectModal,
  useApproveModal,
} from "../util";
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

  const { mutate: editCommission } = useEditRoomCommission(
    useRoomListQueryKey()
  );

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
            width: "18rem",
          },
          {
            title: "关联酒店",
            dataIndex: "hotelName",
            width: "20rem",
            render: (value) => <Tag color="success">{value}</Tag>,
          },
          {
            title: "状态",
            dataIndex: "status",
            render: (value, ticket) =>
              value === 0 ? (
                <span style={{ color: "#faad14" }}>待审核</span>
              ) : value === 1 ? (
                <span style={{ color: "#296BEF" }}>售卖中</span>
              ) : (
                <Tooltip title={ticket.failureReason}>
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
            onFilter: (value, ticket) => ticket.status === value,
            width: "12rem",
          },
          {
            title: "价格",
            dataIndex: "price",
            render: (value) => <>{`¥${value}起`}</>,
            width: "12rem",
          },
          {
            title: "销售佣金比例",
            dataIndex: "salesCommissionRate",
            render: (value) => <>{`${value}%`}</>,
            width: "12rem",
          },
          {
            title: "代言奖励",
            children: [
              {
                title: "比例",
                dataIndex: "promotionCommissionRate",
                render: (value, ticket) => {
                  return (
                    <InputNumber
                      min={5}
                      max={20}
                      value={value}
                      onChange={(promotionCommissionRate) =>
                        editCommission({
                          id: ticket.id,
                          promotionCommissionRate,
                        })
                      }
                      suffix="%"
                    />
                  );
                },
                width: "12rem",
              },
              {
                title: "上限",
                dataIndex: "promotionCommissionUpperLimit",
                render: (value, ticket) => {
                  return (
                    <InputNumber
                      max={20}
                      value={value}
                      onChange={(promotionCommissionUpperLimit) =>
                        editCommission({
                          id: ticket.id,
                          promotionCommissionUpperLimit,
                        })
                      }
                      prefix="￥"
                    />
                  );
                },
                width: "12rem",
              },
            ],
          },
          {
            title: "上级代言奖励",
            children: [
              {
                title: "比例",
                dataIndex: "superiorPromotionCommissionRate",
                render: (value, ticket) => {
                  return (
                    <InputNumber
                      min={5}
                      max={20}
                      value={value}
                      onChange={(superiorPromotionCommissionRate) =>
                        editCommission({
                          id: ticket.id,
                          superiorPromotionCommissionRate,
                        })
                      }
                      suffix="%"
                    />
                  );
                },
                width: "12rem",
              },
              {
                title: "上限",
                dataIndex: "superiorPromotionCommissionUpperLimit",
                render: (value, ticket) => {
                  return (
                    <InputNumber
                      max={10}
                      value={value}
                      onChange={(superiorPromotionCommissionUpperLimit) =>
                        editCommission({
                          id: ticket.id,
                          superiorPromotionCommissionUpperLimit,
                        })
                      }
                      prefix="￥"
                    />
                  );
                },
                width: "12rem",
              },
            ],
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
  const { open: openApproveModal } = useApproveModal();
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

  const items = [
    status === 0
      ? {
          label: <div onClick={() => openApproveModal(id)}>通过</div>,
          key: "approve",
        }
      : undefined,
    status === 0
      ? {
          label: <div onClick={() => openRejectModal(id)}>驳回</div>,
          key: "reject",
        }
      : undefined,
    {
      label: <div onClick={() => open(id)}>详情</div>,
      key: "detail",
    },
    {
      label: <div onClick={() => confirmDelete(id)}>删除</div>,
      key: "delete",
    },
  ].filter((item) => item !== undefined) as MenuProps["items"];

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
