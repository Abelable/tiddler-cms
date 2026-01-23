import {
  Button,
  Dropdown,
  MenuProps,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
  Image,
  InputNumber,
  Switch,
  Tag,
} from "antd";
import { ButtonNoPadding, ErrorBox, Row, PageTitle } from "components/lib";
import { PlusOutlined } from "@ant-design/icons";

import styled from "@emotion/styled";
import dayjs from "dayjs";
import {
  useDeletePrize,
  useEditSort,
  useUpPrize,
  useDownPrize,
  useEditIsBig,
} from "service/new-year/prize";
import { usePrizeModal, usePrizeListQueryKey } from "../util";

import type { Prize } from "types/new-year/prize";
import type { SearchPanelProps } from "./search-panel";

interface ListProps extends TableProps<Prize>, SearchPanelProps {
  error: Error | unknown;
}

export const List = ({
  typeOptions,
  error,
  params,
  setParams,
  ...restProps
}: ListProps) => {
  const { open } = usePrizeModal();

  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      limit: pagination.pageSize,
    });

  const { mutate: editIsBig } = useEditIsBig(usePrizeListQueryKey());
  const { mutate: editSort } = useEditSort(usePrizeListQueryKey());

  return (
    <Container>
      <Header between={true}>
        <PageTitle>奖品列表</PageTitle>
        <Button onClick={() => open()} type={"primary"} icon={<PlusOutlined />}>
          新增
        </Button>
      </Header>
      <ErrorBox error={error} />
      <Table
        rowKey={"id"}
        scroll={{ x: 2500 }}
        columns={[
          { title: "ID", dataIndex: "id", width: "6rem", fixed: "left" },
          {
            title: "状态",
            dataIndex: "status",
            render: (value) =>
              value === 1 ? <Tag color="green">上架中</Tag> : <Tag>已下架</Tag>,
            width: "10rem",
          },
          {
            title: "图片",
            dataIndex: "cover",
            render: (value) => <Image width={58} src={value} />,
            width: "8rem",
          },
          { title: "名称", dataIndex: "name", width: "16rem" },
          {
            title: "大奖",
            dataIndex: "isBig",
            render: (value, prize) => (
              <Switch
                checked={value === 1}
                onChange={(truthy) =>
                  editIsBig({ id: prize.id, isBig: truthy ? 1 : 0 })
                }
              />
            ),
            width: "8rem",
          },
          {
            title: "类型",
            dataIndex: "type",
            render: (value) => (
              <>{typeOptions.find((item) => item.value === +value)?.text}</>
            ),
            width: "10rem",
          },
          {
            title: "单次成本",
            dataIndex: "cost",
            width: "8rem",
          },
          {
            title: "抽奖概率",
            dataIndex: "rate",
            render: (value) => (+value).toFixed(4),
            sorter: (a, b) => a.rate - b.rate,
            width: "10rem",
          },
          {
            title: "库存",
            dataIndex: "stock",
            render: (value) => (value === -1 ? "不限" : value),
            width: "8rem",
          },
          {
            title: "单用户限制",
            dataIndex: "limitPerUser",
            render: (value) => (value === 0 ? "不限" : value),
            width: "10rem",
          },
          {
            title: "降级奖品ID",
            dataIndex: "fallbackPrizeId",
            width: "10rem",
          },
          {
            title: "生效时间",
            dataIndex: "startAt",
            render: (value) =>
              value ? dayjs(value).format("YYYY-MM-DD HH:mm") : "-",
            width: "15rem",
          },
          {
            title: "结束时间",
            dataIndex: "endAt",
            render: (value) =>
              value ? dayjs(value).format("YYYY-MM-DD HH:mm") : "-",
            width: "15rem",
          },
          {
            title: "排序",
            dataIndex: "sort",
            render: (value, prize) => (
              <InputNumber
                value={value}
                onChange={(sort) => editSort({ id: prize.id, sort })}
              />
            ),
            sorter: (a, b) => a.sort - b.sort,
            width: "10rem",
          },
          {
            title: "更新时间",
            dataIndex: "updatedAt",
            render: (value) =>
              value ? dayjs(value).format("YYYY-MM-DD HH:mm:ss") : "无",
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.updatedAt).valueOf() - dayjs(b.updatedAt).valueOf(),
          },
          {
            title: "创建时间",
            dataIndex: "createdAt",
            render: (value) =>
              value ? dayjs(value).format("YYYY-MM-DD HH:mm:ss") : "无",
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
          },
          {
            title: "操作",
            render(value, prize) {
              return <More id={prize.id} status={prize.status} />;
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
  const { startEdit } = usePrizeModal();
  const { mutate: upPrize } = useUpPrize(usePrizeListQueryKey());
  const { mutate: downPrize } = useDownPrize(usePrizeListQueryKey());
  const { mutate: deletePrize } = useDeletePrize(usePrizeListQueryKey());

  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: "确定删除该奖品吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deletePrize(id),
    });
  };

  const items: MenuProps["items"] = [
    { label: <div onClick={() => startEdit(id)}>编辑</div>, key: "edit" },
    {
      label: (
        <div onClick={() => (status === 1 ? downPrize(id) : upPrize(id))}>
          {status === 1 ? "结束" : "恢复"}
        </div>
      ),
      key: "status",
    },
    { label: <div onClick={() => confirmDelete(id)}>删除</div>, key: "delete" },
  ];

  return (
    <Dropdown menu={{ items }}>
      <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
    </Dropdown>
  );
};

const Container = styled.div`
  padding: 2.4rem;
  background: #fff;
  border-radius: 0.6rem;
`;

const Header = styled(Row)`
  margin-bottom: 2.4rem;
`;
