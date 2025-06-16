import {
  Button,
  Dropdown,
  MenuProps,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
  Image,
} from "antd";
import { ButtonNoPadding, ErrorBox, Row, PageTitle } from "components/lib";
import { PlusOutlined } from "@ant-design/icons";

import styled from "@emotion/styled";
import dayjs from "dayjs";
import { useDeleteTopMedia } from "service/topMedia";
import { useTopMediaModal, useTopMediaListQueryKey } from "../util";

import type { TopMedia, TopMediaListSearchParams } from "types/topMedia";

interface ListProps extends TableProps<TopMedia> {
  error: Error | unknown;
  params: Partial<TopMediaListSearchParams>;
  setParams: (params: Partial<TopMediaListSearchParams>) => void;
}

export const List = ({ error, params, setParams, ...restProps }: ListProps) => {
  const { open } = useTopMediaModal();

  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      limit: pagination.pageSize,
    });

  return (
    <Container>
      <Header between={true}>
        <PageTitle>最佳游记</PageTitle>
        <Button onClick={() => open()} type={"primary"} icon={<PlusOutlined />}>
          新增
        </Button>
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
            title: "封面",
            dataIndex: "cover",
            render: (value) => <Image width={88} src={value} />,
            width: "14rem",
          },
          {
            title: "标题",
            dataIndex: "title",
          },
          {
            title: "类型",
            dataIndex: "mediaType",
            render: (value) => <>{value === 2 ? "视频游记" : "图文游记"}</>,
          },
          {
            title: "更新时间",
            render: (value, topMedia) => (
              <span>
                {topMedia.updatedAt
                  ? dayjs(topMedia.updatedAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.updatedAt).valueOf() - dayjs(b.updatedAt).valueOf(),
          },
          {
            title: "创建时间",
            render: (value, topMedia) => (
              <span>
                {topMedia.createdAt
                  ? dayjs(topMedia.createdAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
          },
          {
            title: "操作",
            render(value, topMedia) {
              return <More id={topMedia.id} />;
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
  const { startEdit } = useTopMediaModal();
  const { mutate: deleteTopMedia } = useDeleteTopMedia(
    useTopMediaListQueryKey()
  );

  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: "确定删除该最佳游记吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteTopMedia(id),
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
