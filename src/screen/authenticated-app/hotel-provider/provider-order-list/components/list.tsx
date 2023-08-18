import styled from "@emotion/styled";
import { Table, TablePaginationConfig, TableProps, Tooltip } from "antd";
import { ErrorBox, Row, PageTitle } from "components/lib";
import dayjs from "dayjs";
import { ProviderOrder, ProviderOrdersSearchParams } from "types/hotelProvider";

interface ListProps extends TableProps<ProviderOrder> {
  params: Partial<ProviderOrdersSearchParams>;
  setParams: (params: Partial<ProviderOrdersSearchParams>) => void;
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
        <PageTitle>入驻订单列表</PageTitle>
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
            title: "入驻服务商",
            dataIndex: "companyName",
          },
          {
            title: "订单编号",
            dataIndex: "orderSn",
          },
          {
            title: "支付金额（元）",
            dataIndex: "paymentAmount",
          },
          {
            title: "状态",
            dataIndex: "status",
            render: (value, order) =>
              value === 0 ? (
                <span style={{ color: "#f50" }}>待支付</span>
              ) : (
                <Tooltip title={`支付id：${order.payId}`}>
                  <span style={{ color: "#87d068", cursor: "pointer" }}>
                    支付成功
                  </span>
                </Tooltip>
              ),
            filters: [
              { text: "待支付", value: 0 },
              { text: "支付成功", value: 1 },
            ],
            onFilter: (value, order) => order.status === value,
          },
          {
            title: "创建时间",
            render: (value, order) => (
              <span>
                {order.createdAt
                  ? dayjs(order.createdAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
          },
          {
            title: "更新时间",
            render: (value, order) => (
              <span>
                {order.updatedAt
                  ? dayjs(order.updatedAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.updatedAt).valueOf() - dayjs(b.updatedAt).valueOf(),
          },
        ]}
        onChange={setPagination}
        {...restProps}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 2.4rem;
  background: #fff;
`;

const Header = styled(Row)`
  margin-bottom: 2.4rem;
`;
