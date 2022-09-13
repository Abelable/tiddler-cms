import styled from "@emotion/styled";
import { Button, Table, TableProps } from "antd";
import { Home, HomeSearchParams } from "types/home";
import { ErrorBox } from "components/lib";
import dayjs from "dayjs";
import { useAddSecondHome, useAddThirdHome } from "service/home";
import { useHomeQueryKey } from "../util";
import {
  MinusOutlined,
  PlusOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useState } from "react";

interface ListProps extends TableProps<Home> {
  params: Partial<HomeSearchParams>;
  total: Partial<Home> | undefined;
  error: Error | unknown;
}

export const List = ({ params, total, error, ...restProps }: ListProps) => {
  const { mutate: addSecondHome, isLoading: secondLoading } = useAddSecondHome(
    useHomeQueryKey()
  );
  const { mutate: addThirdHome, isLoading: thirdLoading } = useAddThirdHome(
    useHomeQueryKey()
  );
  const [recordKey, setRecordKey] = useState("");

  return (
    <Container>
      <Title>数据列表</Title>
      <ErrorBox error={error} />
      <Table
        rowKey={"key"}
        scroll={{ x: 1500 }}
        expandable={{
          expandIcon: ({ expanded, onExpand, record }) =>
            record.children &&
            ((record.key === recordKey && secondLoading) ||
            (record.key === recordKey && thirdLoading) ? (
              <Toggle
                icon={<LoadingOutlined style={{ fontSize: "1.1rem" }} />}
              />
            ) : expanded && record.children?.length ? (
              record.children ? (
                <Toggle
                  icon={<MinusOutlined style={{ fontSize: "1.1rem" }} />}
                  onClick={(e) => onExpand(record, e)}
                />
              ) : (
                <Placeholder />
              )
            ) : (
              <Toggle
                icon={<PlusOutlined style={{ fontSize: "1.1rem" }} />}
                onClick={(e) => onExpand(record, e)}
              />
            )),
          onExpand: (expanded, record) => {
            if (expanded && !record.children?.length) {
              setRecordKey(record?.key);
              if (record.agent_name === "*" && record.goods_name === "*") {
                addSecondHome({
                  date: record.date,
                  agent_id: params.agent_id,
                  goods_id: params.goods_id,
                });
              } else {
                addThirdHome({
                  key: record.key,
                  date: record.second_date,
                  agent_id: record.agent_id,
                  goods_id: params.goods_id,
                });
              }
            }
          },
        }}
        columns={[
          {
            title: "日期",
            dataIndex: "date",
            width: "20rem",
            sorter: (a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf(),
          },
          {
            title: "代理商",
            dataIndex: "agent_name",
            width: "20rem",
          },
          {
            title: "商品名称",
            dataIndex: "goods_name",
            width: "20rem",
          },
          {
            title: "订单数",
            dataIndex: "count",
            sorter: (a, b) => Number(a.count) - Number(b.count),
          },
          {
            title: "发货数",
            dataIndex: "shipped_count",
            sorter: (a, b) => Number(a.shipped_count) - Number(b.shipped_count),
          },
          {
            title: "激活数",
            dataIndex: "activated_count",
            sorter: (a, b) =>
              Number(a.activated_count) - Number(b.activated_count),
          },
          {
            title: "发货率",
            dataIndex: "shipped_rate",
            sorter: (a, b) => Number(a.shipped_rate) - Number(b.shipped_rate),
          },
          {
            title: "激活率",
            dataIndex: "activated_rate",
            sorter: (a, b) =>
              Number(a.activated_rate) - Number(b.activated_rate),
          },
          {
            title: "充值数",
            dataIndex: "recharged_count",
            sorter: (a, b) =>
              Number(a.recharged_count) - Number(b.recharged_count),
          },
          {
            title: "充值率",
            dataIndex: "recharged_rate",
            sorter: (a, b) =>
              Number(a.recharged_rate) - Number(b.recharged_rate),
          },
          {
            title: "中转率",
            dataIndex: "transfer_rate",
            sorter: (a, b) => Number(a.transfer_rate) - Number(b.transfer_rate),
          },
        ]}
        summary={() => (
          <Table.Summary.Row style={{ fontWeight: 600, background: "#fafafa" }}>
            <Table.Summary.Cell index={0}>合计</Table.Summary.Cell>
            <Table.Summary.Cell index={1}></Table.Summary.Cell>
            <Table.Summary.Cell index={2}></Table.Summary.Cell>
            <Table.Summary.Cell index={3}>{total?.count}</Table.Summary.Cell>
            <Table.Summary.Cell index={4}>
              {total?.shipped_count}
            </Table.Summary.Cell>
            <Table.Summary.Cell index={5}>
              {total?.activated_count}
            </Table.Summary.Cell>
            <Table.Summary.Cell index={6}>
              {total?.shipped_rate}
            </Table.Summary.Cell>
            <Table.Summary.Cell index={7}>
              {total?.activated_rate}
            </Table.Summary.Cell>
            <Table.Summary.Cell index={8}>
              {total?.recharged_count}
            </Table.Summary.Cell>
            <Table.Summary.Cell index={9}>
              {total?.recharged_rate}
            </Table.Summary.Cell>
            <Table.Summary.Cell index={10}>
              {total?.transfer_rate}
            </Table.Summary.Cell>
          </Table.Summary.Row>
        )}
        {...restProps}
        pagination={false}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 2.4rem;
  background: #fff;
`;

const Title = styled.h3`
  margin-bottom: 2.4rem;
`;

const Toggle = styled(Button)`
  margin-right: 8px;
  padding: 0;
  width: 17px;
  height: 17px;
  transform: translateY(-0.22rem);
`;

const Placeholder = styled.div`
  display: inline-block;
  margin-right: 8px;
  width: 17px;
  height: 17px;
`;
