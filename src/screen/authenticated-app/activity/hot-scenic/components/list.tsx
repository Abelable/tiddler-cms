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
import {
  useDeleteHotScenic,
  useEditInterestedNumber,
  useEditSort,
} from "service/hotScenic";
import { useHotScenicModal, useHotScenicListQueryKey } from "../util";

import type { HotScenic, HotScenicListSearchParams } from "types/hotScenic";

interface ListProps extends TableProps<HotScenic> {
  error: Error | unknown;
  params: Partial<HotScenicListSearchParams>;
  setParams: (params: Partial<HotScenicListSearchParams>) => void;
}

export const List = ({ error, params, setParams, ...restProps }: ListProps) => {
  const { open } = useHotScenicModal();

  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      limit: pagination.pageSize,
    });

  const { mutate: editSort } = useEditSort(useHotScenicListQueryKey());
  const { mutate: editInterestedNumber } = useEditInterestedNumber(
    useHotScenicListQueryKey()
  );

  return (
    <Container>
      <Header between={true}>
        <PageTitle>网红打卡地</PageTitle>
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
            title: "封面",
            dataIndex: "scenicCover",
            render: (value) => <Image width={88} src={value} />,
            width: "10rem",
          },
          {
            title: "名称",
            dataIndex: "scenicName",
            width: "24rem",
          },
          {
            title: "推荐理由",
            dataIndex: "recommendReason",
            width: "24rem",
          },
          {
            title: "感兴趣人数",
            dataIndex: "interestedUserNumber",
            render: (value, hotScenic) => (
              <InputNumber
                value={value}
                onChange={(number) =>
                  editInterestedNumber({ id: hotScenic.id, number })
                }
              />
            ),
            sorter: (a, b) => a.sort - b.sort,
            width: "12rem",
          },
          {
            title: "排序",
            dataIndex: "sort",
            render: (value, hotScenic) => (
              <InputNumber
                value={value}
                onChange={(sort) => editSort({ id: hotScenic.id, sort })}
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
  const { startEdit } = useHotScenicModal();
  const { mutate: deleteHotScenic } = useDeleteHotScenic(
    useHotScenicListQueryKey()
  );

  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: "确定删除该网红打开地吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteHotScenic(id),
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
