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
} from "antd";
import { ButtonNoPadding, ErrorBox, Row, PageTitle } from "components/lib";
import { PlusOutlined } from "@ant-design/icons";

import styled from "@emotion/styled";
import dayjs from "dayjs";
import { useDeleteLakeCycle, useEditSort } from "service/lakeCycle";
import { useLakeCycleModal, useLakeCycleListQueryKey } from "../util";

import type { DataOption } from "types/common";
import type { LakeCycle, LakeCycleListSearchParams } from "types/lakeCycle";

interface ListProps extends TableProps<LakeCycle> {
  lakeOptions: DataOption[];
  error: Error | unknown;
  params: Partial<LakeCycleListSearchParams>;
  setParams: (params: Partial<LakeCycleListSearchParams>) => void;
}

export const List = ({
  lakeOptions,
  error,
  params,
  setParams,
  ...restProps
}: ListProps) => {
  const { open } = useLakeCycleModal();

  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      limit: pagination.pageSize,
    });

  const { mutate: editSort } = useEditSort(useLakeCycleListQueryKey());

  return (
    <Container>
      <Header between={true}>
        <PageTitle>沿途景点</PageTitle>
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
            title: "路线",
            dataIndex: "routeId",
            render: (value) => (
              <>{lakeOptions.find((item) => item.id === value)?.name}</>
            ),
            width: "10rem",
          },
          {
            title: "景点封面",
            dataIndex: "scenicCover",
            render: (value) => <Image width={88} src={value} />,
            width: "10rem",
          },
          {
            title: "景点名称",
            dataIndex: "scenicName",
            width: "24rem",
          },
          {
            title: "景点描述",
            dataIndex: "desc",
            width: "24rem",
          },
          {
            title: "行程里数（km）",
            dataIndex: "distance",
            width: "12rem",
          },
          {
            title: "行程时长（h）",
            dataIndex: "duration",
            width: "12rem",
          },
          {
            title: "最佳时间（月）",
            dataIndex: "time",
            width: "12rem",
          },
          {
            title: "排序",
            dataIndex: "sort",
            render: (value, lakeCycle) => (
              <InputNumber
                value={value}
                onChange={(sort) => editSort({ id: lakeCycle.id, sort })}
              />
            ),
            sorter: (a, b) => a.sort - b.sort,
            width: "12rem",
          },
          {
            title: "更新时间",
            render: (value, banner) => (
              <span>
                {banner.updatedAt
                  ? dayjs(banner.updatedAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.updatedAt).valueOf() - dayjs(b.updatedAt).valueOf(),
          },
          {
            title: "创建时间",
            render: (value, banner) => (
              <span>
                {banner.createdAt
                  ? dayjs(banner.createdAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
          },
          {
            title: "操作",
            render(value, banner) {
              return <More id={banner.id} />;
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

const More = ({ id }: { id: number }) => {
  const { startEdit } = useLakeCycleModal();
  const { mutate: deleteLakeCycle } = useDeleteLakeCycle(
    useLakeCycleListQueryKey()
  );

  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: "确定删除该banner吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteLakeCycle(id),
    });
  };

  const items: MenuProps["items"] = [
    {
      label: <div onClick={() => startEdit(id)}>编辑</div>,
      key: "edit",
    },
    {
      label: <div onClick={() => confirmDelete(id)}>删除</div>,
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
  padding: 2.4rem;
  background: #fff;
  border-radius: 0.6rem;
`;

const Header = styled(Row)`
  margin-bottom: 2.4rem;
`;
