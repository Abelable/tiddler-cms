import styled from "@emotion/styled";
import {
  Avatar,
  Descriptions,
  Dropdown,
  MenuProps,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
  Tag,
  Tooltip,
} from "antd";
import { ButtonNoPadding, ErrorBox, Row, PageTitle } from "components/lib";
import { UserOutlined } from "@ant-design/icons";

import dayjs from "dayjs";
import {
  useApprovedCommissionWithdraw,
  useDeleteCommissionWithdraw,
} from "service/commissionWithdraw";
import { useCommissionWithdrawListQueryKey, useRejectModal } from "../util";
import { SearchPanelProps } from "./search-panel";

import type { CommissionWithdraw } from "types/commissionWithdraw";

interface ListProps
  extends TableProps<CommissionWithdraw>,
    Omit<SearchPanelProps, "userOptions"> {
  error: Error | unknown;
}

export const List = ({
  statusOptions,
  sceneOptions,
  pathOptions,
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
        <PageTitle>提现列表</PageTitle>
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
            title: "状态",
            dataIndex: "status",
            render: (value, withdraw) =>
              value === 0 ? (
                <span style={{ color: "#faad14" }}>待审核</span>
              ) : value === 1 ? (
                <span style={{ color: "#52c41a" }}>已提现</span>
              ) : (
                <Tooltip title={withdraw.failureReason}>
                  <span style={{ color: "#ff4d4f", cursor: "pointer" }}>
                    已驳回
                  </span>
                </Tooltip>
              ),
            filters: statusOptions,
            onFilter: (value, withdraw) => withdraw.status === value,
            width: "10rem",
          },
          {
            title: "奖励场景",
            dataIndex: "scene",
            render: (value) => (
              <Tag color={["gold", "blue", "green", "purple"][value]}>
                {sceneOptions.find((item) => item.value === value)?.text}
              </Tag>
            ),
            width: "10rem",
          },
          {
            title: "提现用户",
            dataIndex: "userInfo",
            render: (value) => (
              <>
                <Avatar
                  size="small"
                  src={value.avatar}
                  icon={<UserOutlined />}
                />
                <span style={{ marginLeft: "0.6rem" }}>
                  {value.nickname.length > 8
                    ? `${value.nickname.slice(0, 8)}...`
                    : value.nickname}
                </span>
              </>
            ),
            width: "20rem",
          },
          {
            title: "提现金额",
            dataIndex: "withdrawAmount",
            render: (value) => <>¥{value}</>,
            width: "12rem",
          },
          {
            title: "税费",
            dataIndex: "taxFee",
            render: (value) => <>¥{value}</>,
            width: "10rem",
          },
          {
            title: "手续费",
            dataIndex: "handlingFee",
            render: (value) => <>¥{value}</>,
            width: "12rem",
          },
          {
            title: "到账金额",
            dataIndex: "actualAmount",
            render: (value) => <div style={{ color: "red" }}>¥{value}</div>,
            width: "14rem",
          },
          {
            title: "提现方式",
            dataIndex: "path",
            render: (value) => (
              <>{pathOptions.find((item) => item.value === value)?.text}</>
            ),
            width: "14rem",
          },
          {
            title: "备注",
            dataIndex: "remark",
            width: "28rem",
          },
          {
            title: "提交时间",
            render: (value, withdraw) => (
              <span>
                {withdraw.createdAt
                  ? dayjs(withdraw.createdAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            sorter: (a, b) =>
              dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
            width: "16rem",
          },
          {
            title: "处理时间",
            render: (value, withdraw) => (
              <span>
                {withdraw.updatedAt
                  ? dayjs(withdraw.updatedAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            sorter: (a, b) =>
              dayjs(a.updatedAt).valueOf() - dayjs(b.updatedAt).valueOf(),
            width: "16rem",
          },
          {
            title: "操作",
            render(value, withdraw) {
              return <More withdraw={withdraw} />;
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

const More = ({ withdraw }: { withdraw: CommissionWithdraw }) => {
  const { open: openRejectModal } = useRejectModal();
  const { mutate: approvedCommissionWithdraw } = useApprovedCommissionWithdraw(
    useCommissionWithdrawListQueryKey()
  );
  const { mutate: deleteCommissionWithdraw } = useDeleteCommissionWithdraw(
    useCommissionWithdrawListQueryKey()
  );

  const confirmApproved = () => {
    Modal.confirm({
      title:
        withdraw.path === 1
          ? "请核实信息之后，再确定提现申请"
          : "请完成银行打款之后，再点击确定",
      content:
        withdraw.path === 1 ? (
          "点击确定同意提现"
        ) : (
          <Descriptions size={"small"} column={1} bordered>
            <Descriptions.Item label="卡号">
              {withdraw.bankCardInfo?.code}
            </Descriptions.Item>
            <Descriptions.Item label="姓名">
              {withdraw.bankCardInfo?.name}
            </Descriptions.Item>
            <Descriptions.Item label="开户行">
              {withdraw.bankCardInfo?.bankName}
            </Descriptions.Item>
            <Descriptions.Item label="打款金额">
              <span style={{ color: "red" }}>¥{withdraw.actualAmount}</span>
            </Descriptions.Item>
          </Descriptions>
        ),
      okText: "确定",
      cancelText: "取消",
      onOk: () => approvedCommissionWithdraw(withdraw.id),
    });
  };

  const confirmDelete = () => {
    Modal.confirm({
      title: "确定删除该提现申请吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteCommissionWithdraw(withdraw.id),
    });
  };

  let items: MenuProps["items"];
  switch (withdraw.status) {
    case 0:
      items = [
        {
          label: <div onClick={() => confirmApproved()}>同意提现</div>,
          key: "approved",
        },
        {
          label: (
            <div onClick={() => openRejectModal(withdraw.id)}>拒绝提现</div>
          ),
          key: "reject",
        },
      ];
      break;

    case 1:
    case 2:
      items = [
        {
          label: <div onClick={() => confirmDelete()}>删除</div>,
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
