import dayjs from "dayjs";
import styled from "@emotion/styled";
import { useScenicModal, useScenicListQueryKey } from "../util";

import {
  Dropdown,
  MenuProps,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
  Button,
  Rate,
  Tag,
  InputNumber,
} from "antd";
import { ButtonNoPadding, ErrorBox, Row, PageTitle } from "components/lib";
import { useDeleteScenic, useEditViews } from "service/scenic";
import { PlusOutlined } from "@ant-design/icons";
import { SearchPanelProps } from "./search-panel";

import type { Scenic } from "types/scenic";

interface ListProps extends TableProps<Scenic>, SearchPanelProps {
  error: Error | unknown;
}

export const List = ({
  categoryOptions,
  error,
  params,
  setParams,
  ...restProps
}: ListProps) => {
  const { open } = useScenicModal();
  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      limit: pagination.pageSize,
    });
  const { mutate: editViews } = useEditViews(useScenicListQueryKey());

  return (
    <Container>
      <Header between={true}>
        <PageTitle>景区列表</PageTitle>
        <Button onClick={() => open()} type={"primary"} icon={<PlusOutlined />}>
          新增
        </Button>
      </Header>
      <ErrorBox error={error} />
      <Table
        rowKey={"id"}
        scroll={{ x: 1500 }}
        columns={[
          {
            title: "id",
            dataIndex: "id",
            width: "8rem",
            fixed: "left",
          },
          {
            title: "名称",
            render: (value, spot) => (
              <Row gap={1}>
                <span>{spot.name}</span>
                {spot.level ? <Tag color="gold">{spot.level}</Tag> : <></>}
              </Row>
            ),
          },
          {
            title: "分类",
            dataIndex: "categoryId",
            width: "18rem",
            render: (value) => (
              <>{categoryOptions.find((item) => item.id === value)?.name}</>
            ),
          },
          {
            title: "评分",
            dataIndex: "score",
            width: "22rem",
            render: (value) => (
              <>
                <Rate allowHalf value={value} />
                <span style={{ marginLeft: "1rem" }}>{value}</span>
              </>
            ),
          },
          {
            title: "点击率",
            dataIndex: "views",
            render: (value, shortVideo) => (
              <InputNumber
                value={value}
                onChange={(views) => editViews({ id: shortVideo.id, views })}
              />
            ),
            width: "12rem",
          },
          {
            title: "创建时间",
            render: (value, scenic) => (
              <span>
                {scenic.createdAt
                  ? dayjs(scenic.createdAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
          },
          {
            title: "更新时间",
            render: (value, scenic) => (
              <span>
                {scenic.updatedAt
                  ? dayjs(scenic.updatedAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.updatedAt).valueOf() - dayjs(b.updatedAt).valueOf(),
          },
          {
            title: "操作",
            render(value, scenic) {
              return <More id={scenic.id} />;
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
  const { startEdit } = useScenicModal();
  const { mutate: deleteScenic } = useDeleteScenic(useScenicListQueryKey());

  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: "确定删除该景区吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteScenic(id),
    });
  };

  const items: MenuProps["items"] = [
    {
      label: <div onClick={() => startEdit(id)}>编辑</div>,
      key: "detail",
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
  margin-top: 2.4rem;
  padding: 2.4rem;
  background: #fff;
  border-radius: 0.6rem;
`;

const Header = styled(Row)`
  margin-bottom: 2.4rem;
`;
