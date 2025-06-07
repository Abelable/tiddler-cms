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
import { AuthInfo } from "types/authInfo";
import {
  useAuthInfoModal,
  useAuthInfoListQueryKey,
  useRejectModal,
} from "../util";
import { SearchPanelProps } from "./search-panel";
import { useApprovedAuthInfo } from "service/authInfo";

interface ListProps extends TableProps<AuthInfo>, SearchPanelProps {
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
        <PageTitle>实名认证</PageTitle>
      </Header>
      <ErrorBox error={error} />
      <Table
        rowKey={"id"}
        columns={[
          {
            title: "id",
            dataIndex: "id",
            width: "8rem",
          },
          {
            title: "用户id",
            dataIndex: "userId",
            width: "8rem",
          },
          {
            title: "姓名",
            dataIndex: "name",
          },
          {
            title: "手机号",
            dataIndex: "mobile",
          },
          {
            title: "状态",
            dataIndex: "status",
            render: (value, authInfo) =>
              value === 0 ? (
                <span style={{ color: "#faad14" }}>待审核</span>
              ) : value === 1 ? (
                <span style={{ color: "#52c41a" }}>审核通过</span>
              ) : (
                <Tooltip title={authInfo.failureReason}>
                  <span style={{ color: "#ff4d4f", cursor: "pointer" }}>
                    已驳回
                  </span>
                </Tooltip>
              ),
            filters: statusOptions,
            onFilter: (value, authInfo) => authInfo.status === value,
          },
          {
            title: "更新时间",
            render: (value, authInfo) => (
              <span>
                {authInfo.updatedAt
                  ? dayjs(authInfo.updatedAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.updatedAt).valueOf() - dayjs(b.updatedAt).valueOf(),
          },
          {
            title: "提交时间",
            render: (value, authInfo) => (
              <span>
                {authInfo.createdAt
                  ? dayjs(authInfo.createdAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
          },
          {
            title: "操作",
            render(value, authInfo) {
              return <More id={authInfo.id} status={authInfo.status} />;
            },
            width: "8rem",
          },
        ]}
        onChange={setPagination}
        {...restProps}
      />
    </Container>
  );
};

const More = ({ id, status }: { id: number; status: number }) => {
  const { open } = useAuthInfoModal();
  const { mutate: approvedAuthInfo } = useApprovedAuthInfo(
    useAuthInfoListQueryKey()
  );
  const { open: openRejectModal } = useRejectModal();

  const confirmApproved = (id: number) => {
    Modal.confirm({
      title: "实名认证审核通过确认",
      content: "请确保在实名认证信息无误的情况下进行该操作",
      okText: "确定",
      cancelText: "取消",
      onOk: () => approvedAuthInfo(id),
    });
  };

  const items: MenuProps["items"] =
    status === 0
      ? [
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
        ]
      : [
          {
            label: <div onClick={() => open(id)}>详情</div>,
            key: "detail",
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
