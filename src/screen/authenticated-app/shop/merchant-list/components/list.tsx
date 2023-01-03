import styled from "@emotion/styled";
import {
  Dropdown,
  Menu,
  MenuProps,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
} from "antd";
import { ButtonNoPadding, ErrorBox, Row, PageTitle } from "components/lib";
import dayjs from "dayjs";
import { useDeleteMerchant } from "service/merchant";
import { Merchant } from "types/merchant";
import { useMerchantModal, useMerchantsQueryKey } from "../util";
import { SearchPanelProps } from "./search-panel";

interface ListProps extends TableProps<Merchant>, SearchPanelProps {
  error: Error | unknown;
}

export const List = ({ error, params, setParams, ...restProps }: ListProps) => {
  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      limit: pagination.pageSize,
    });

  return (
    <Container>
      <Header between={true}>
        <PageTitle>管理员列表</PageTitle>
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
            title: "商家类型",
            dataIndex: "type",
            render: (value) => <>{value === 1 ? "个人" : "企业"}</>,
            filters: [
              { text: "个人", value: 1 },
              { text: "企业", value: 2 },
            ],
            onFilter: (value, merchant) => merchant.type === value,
          },
          {
            title: "联系人/法人姓名",
            dataIndex: "name",
          },
          {
            title: "联系人/法人手机号",
            dataIndex: "mobile",
          },
          {
            title: "状态",
            dataIndex: "type",
            render: (value) => (
              <>
                {["待审核", "待支付", "支付成功", "审核失败"].find(
                  (item, index) => index === value
                )}
              </>
            ),
            filters: [
              { text: "待审核", value: 0 },
              { text: "待支付", value: 1 },
              { text: "支付成功", value: 2 },
              { text: "审核失败", value: 3 },
            ],
            onFilter: (value, merchant) => merchant.status === value,
          },
          {
            title: "入驻时间",
            render: (value, merchant) => (
              <span>
                {merchant.createdAt
                  ? dayjs(merchant.createdAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
          },
          {
            title: "更新时间",
            render: (value, merchant) => (
              <span>
                {merchant.updatedAt
                  ? dayjs(merchant.updatedAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.updatedAt).valueOf() - dayjs(b.updatedAt).valueOf(),
          },
          {
            title: "操作",
            render(value, merchant) {
              return <More id={merchant.id} />;
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

const More = ({ id }: { id: number }) => {
  const { open } = useMerchantModal();
  const { mutate: deleteMerchant } = useDeleteMerchant(useMerchantsQueryKey());

  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: "确定删除该用户吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteMerchant(id),
    });
  };

  const items: MenuProps["items"] = [
    {
      label: <div onClick={() => open(id)}>详情</div>,
      key: "detail",
    },
    {
      label: <div onClick={() => confirmDelete(id)}>删除</div>,
      key: "delete",
    },
  ];

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
