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
import { useDeleteLakeCycleMedia, useEditSort } from "service/lakeCycleMedia";
import { useLakeCycleMediaModal, useLakeCycleMediaListQueryKey } from "../util";

import type {
  LakeCycleMedia,
  LakeCycleMediaListSearchParams,
} from "types/lakeCycleMedia";

interface ListProps extends TableProps<LakeCycleMedia> {
  error: Error | unknown;
  params: Partial<LakeCycleMediaListSearchParams>;
  setParams: (params: Partial<LakeCycleMediaListSearchParams>) => void;
}

export const List = ({ error, params, setParams, ...restProps }: ListProps) => {
  const { open } = useLakeCycleMediaModal();

  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      limit: pagination.pageSize,
    });
  const { mutate: editSort } = useEditSort(useLakeCycleMediaListQueryKey());

  return (
    <Container>
      <Header between={true}>
        <PageTitle>骑行攻略</PageTitle>
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
            render: (value, lakeCycleMedia) => (
              <span>
                {lakeCycleMedia.updatedAt
                  ? dayjs(lakeCycleMedia.updatedAt).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.updatedAt).valueOf() - dayjs(b.updatedAt).valueOf(),
          },
          {
            title: "创建时间",
            render: (value, lakeCycleMedia) => (
              <span>
                {lakeCycleMedia.createdAt
                  ? dayjs(lakeCycleMedia.createdAt).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
          },
          {
            title: "操作",
            render(value, lakeCycleMedia) {
              return <More id={lakeCycleMedia.id} />;
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
  const { mutate: deleteLakeCycleMedia } = useDeleteLakeCycleMedia(
    useLakeCycleMediaListQueryKey()
  );

  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: "确定删除该骑行攻略吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteLakeCycleMedia(id),
    });
  };

  const items: MenuProps["items"] = [
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
