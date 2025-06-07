import {
  Avatar,
  Button,
  Dropdown,
  Menu,
  MenuProps,
  Modal,
  Progress,
  Table,
  TablePaginationConfig,
  TableProps,
  Tag,
} from "antd";
import { ErrorBox, Row, PageTitle, ButtonNoPadding } from "components/lib";
import { UserOutlined, PlusOutlined } from "@ant-design/icons";

import styled from "@emotion/styled";
import dayjs from "dayjs";
import { useDeletePromoter } from "service/promoter";
import { usePromoterModal, usePromoterListQueryKey } from "../util";

import type { SearchPanelProps } from "./search-panel";
import type { Promoter } from "types/promoter";

interface ListProps extends TableProps<Promoter>, SearchPanelProps {
  error: Error | unknown;
}

export const List = ({
  levelOptions,
  pathOptions,
  error,
  params,
  setParams,
  ...restProps
}: ListProps) => {
  const { open } = usePromoterModal();

  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      limit: pagination.pageSize,
    });

  return (
    <Container>
      <Header between={true}>
        <PageTitle>家乡代言人列表</PageTitle>
        <Button onClick={() => open()} type={"primary"} icon={<PlusOutlined />}>
          新增
        </Button>
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
            title: "头像",
            dataIndex: "avatar",
            render: (value) => <Avatar src={value} icon={<UserOutlined />} />,
            width: "8rem",
          },
          {
            title: "昵称",
            dataIndex: "nickname",
            width: "16rem",
          },
          {
            title: "手机号",
            dataIndex: "mobile",
            width: "16rem",
          },
          {
            title: "家乡代言人身份",
            dataIndex: "level",
            render: (value, promoter) => {
              const levelItem = levelOptions.find(
                (item) => item.value === value
              );
              return (
                <Tag
                  color={
                    levelItem?.scene === promoter.scene
                      ? ["blue", "green", "orange", "red"][value - 1]
                      : "error"
                  }
                >
                  {`${levelItem?.text}${
                    levelItem?.scene !== promoter.scene ? "（身份异常）" : ""
                  }`}
                </Tag>
              );
            },
            width: "15rem",
          },
          {
            title: "生成场景",
            dataIndex: "path",
            render: (value) => (
              <>{pathOptions.find((item) => item.value === value)?.text}</>
            ),
            width: "12rem",
          },
          {
            title: "推广人数",
            dataIndex: "promotedUserNumber",
          },
          {
            title: "提现进度",
            render: (value, promoter) => (
              <>
                <Progress
                  percent={Math.round(
                    (promoter.settledCommissionSum /
                      (promoter.commissionSum + promoter.teamCommissionSum)) *
                      100
                  )}
                  size="small"
                  status="active"
                />
              </>
            ),
            width: "20rem",
          },
          {
            title: "商品奖励",
            dataIndex: "commissionSum",
            render: (value) => <>¥{value ? value.toFixed(2) : 0}</>,
          },
          {
            title: "团队奖励",
            dataIndex: "teamCommissionSum",
            render: (value) => <>¥{value ? value.toFixed(2) : 0}</>,
          },
          {
            title: "已提现奖励",
            dataIndex: "settledCommissionSum",
            render: (value) => (
              <span style={{ color: "#f56c6c" }}>
                -¥{value ? value.toFixed(2) : 0}
              </span>
            ),
          },

          {
            title: "创建时间",
            render: (value, promoter) => (
              <span>
                {promoter.createdAt
                  ? dayjs(promoter.createdAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
          },
          {
            title: "更新时间",
            render: (value, promoter) => (
              <span>
                {promoter.updatedAt
                  ? dayjs(promoter.updatedAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.updatedAt).valueOf() - dayjs(b.updatedAt).valueOf(),
          },
          {
            title: "操作",
            render(value, promoter) {
              return <More promoter={promoter} />;
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

const More = ({ promoter }: { promoter: Promoter }) => {
  const { startEdit } = usePromoterModal();

  const { mutate: deletePromoter } = useDeletePromoter(
    usePromoterListQueryKey()
  );

  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: "确定删除该用户吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deletePromoter(id),
    });
  };

  const items: MenuProps["items"] = [
    {
      label: <div onClick={() => startEdit(promoter.id)}>更改等级</div>,
      key: "change",
    },
    {
      label: <div onClick={() => confirmDelete(promoter.id)}>删除</div>,
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
