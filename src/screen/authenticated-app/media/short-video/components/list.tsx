import { UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import styled from "@emotion/styled";
import { useShortVideoModal, useShortVideoListQueryKey } from "../util";

import {
  Dropdown,
  Menu,
  MenuProps,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
  Button,
  Popover,
  Image,
} from "antd";
import {
  ButtonNoPadding,
  ErrorBox,
  Row,
  PageTitle,
  OptionCover,
} from "components/lib";
import { useDeleteShortVideo } from "service/shortVideo";
import { PlusOutlined } from "@ant-design/icons";
import { SearchPanelProps } from "./search-panel";

import type { ShortVideo } from "types/shortVideo";

interface ListProps extends TableProps<ShortVideo>, SearchPanelProps {
  error: Error | unknown;
}

export const List = ({
  userOptions,
  error,
  params,
  setParams,
  ...restProps
}: ListProps) => {
  const { open } = useShortVideoModal();
  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      limit: pagination.pageSize,
    });

  return (
    <Container>
      <Header between={true}>
        <PageTitle>视频列表</PageTitle>
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
            title: "封面",
            dataIndex: "cover",
            render: (value) => <Image width={68} src={value} />,
            width: "14rem",
          },
          {
            title: "标题",
            dataIndex: "title",
          },
          {
            title: "作者",
            dataIndex: "userId",
            render: (value) => {
              const user = userOptions.find((item) => item.id === value);
              return user ? (
                <Popover content={`id: ${user.id}`}>
                  <div style={{ cursor: "pointer" }}>
                    <OptionCover src={user.avatar} icon={<UserOutlined />} />
                    <span>{user.nickname}</span>
                  </div>
                </Popover>
              ) : (
                <>暂无上级</>
              );
            },
            width: "32rem",
          },
          {
            title: "创建时间",
            render: (value, shortVideo) => (
              <span>
                {shortVideo.createdAt
                  ? dayjs(shortVideo.createdAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
          },
          {
            title: "更新时间",
            render: (value, shortVideo) => (
              <span>
                {shortVideo.updatedAt
                  ? dayjs(shortVideo.updatedAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.updatedAt).valueOf() - dayjs(b.updatedAt).valueOf(),
          },
          {
            title: "操作",
            render(value, shortVideo) {
              return <More id={shortVideo.id} />;
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
  const { startEdit } = useShortVideoModal();
  const { mutate: deleteShortVideo } = useDeleteShortVideo(
    useShortVideoListQueryKey()
  );

  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: "确定删除该景区吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteShortVideo(id),
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
