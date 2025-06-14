import { UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import styled from "@emotion/styled";
import { useTourismNoteModal, useTourismNoteListQueryKey } from "../util";

import {
  Dropdown,
  MenuProps,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
  Button,
  Popover,
  Image,
  InputNumber,
} from "antd";
import {
  ButtonNoPadding,
  ErrorBox,
  Row,
  PageTitle,
  OptionAvatar,
  Card,
  OptionCover,
} from "components/lib";
import { useDeleteTourismNote, useEditViews } from "service/tourismNote";
import { PlusOutlined } from "@ant-design/icons";
import { SearchPanelProps } from "./search-panel";

import type { TourismNote } from "types/tourismNote";

interface ListProps extends TableProps<TourismNote>, SearchPanelProps {
  error: Error | unknown;
}

export const List = ({
  userOptions,
  scenicOptions,
  hotelOptions,
  restaurantOptions,
  goodsOptions,
  error,
  params,
  setParams,
  ...restProps
}: ListProps) => {
  const { open } = useTourismNoteModal();
  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      limit: pagination.pageSize,
    });

  const { mutate: editViews } = useEditViews(useTourismNoteListQueryKey());

  return (
    <Container>
      <Header between={true}>
        <PageTitle>图文游记列表</PageTitle>
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
            dataIndex: "imageList",
            render: (value) => <Image width={68} src={value[0]} />,
            width: "10rem",
          },
          {
            title: "标题",
            dataIndex: "title",
            width: "30rem",
          },
          {
            title: "作者",
            dataIndex: "userId",
            render: (value) => {
              const user = userOptions.find((item) => item.id === value);
              return user ? (
                <Popover content={`id: ${user.id}`}>
                  <Card>
                    <OptionAvatar src={user.avatar} icon={<UserOutlined />} />
                    <div>{user.nickname}</div>
                  </Card>
                </Popover>
              ) : (
                <>暂无上级</>
              );
            },
            width: "18rem",
          },
          {
            title: "关联景点",
            dataIndex: "scenicIds",
            render: (value) =>
              value.length ? (
                <>
                  {value.map((id: number) => {
                    const scenic = scenicOptions.find(
                      (scenic) => scenic.id === id
                    );
                    return (
                      <Popover key={id} content={`id: ${scenic?.id}`}>
                        <Card>
                          <OptionCover src={scenic?.cover} size="2.4rem" />
                          <div>{scenic?.name}</div>
                        </Card>
                      </Popover>
                    );
                  })}
                </>
              ) : (
                <span style={{ color: "#999" }}>暂无关联景点</span>
              ),
            width: "24rem",
          },
          {
            title: "关联酒店",
            dataIndex: "hotelIds",
            render: (value) =>
              value.length ? (
                <>
                  {value.map((id: number) => {
                    const hotel = hotelOptions.find((hotel) => hotel.id === id);
                    return (
                      <Popover key={id} content={`id: ${hotel?.id}`}>
                        <Card>
                          <OptionCover src={hotel?.cover} size="2.4rem" />
                          <div>{hotel?.name}</div>
                        </Card>
                      </Popover>
                    );
                  })}
                </>
              ) : (
                <span style={{ color: "#999" }}>暂无关联酒店</span>
              ),
            width: "24rem",
          },
          {
            title: "关联餐馆",
            dataIndex: "restaurantIds",
            render: (value) =>
              value.length ? (
                <>
                  {value.map((id: number) => {
                    const restaurant = restaurantOptions.find(
                      (restaurant) => restaurant.id === id
                    );
                    return (
                      <Popover key={id} content={`id: ${restaurant?.id}`}>
                        <Card>
                          <OptionCover src={restaurant?.cover} size="2.4rem" />
                          <div>{restaurant?.name}</div>
                        </Card>
                      </Popover>
                    );
                  })}
                </>
              ) : (
                <span style={{ color: "#999" }}>暂无关联餐馆</span>
              ),
            width: "24rem",
          },
          {
            title: "关联商品",
            dataIndex: "goodsIds",
            render: (value) =>
              value.length ? (
                <>
                  {value.map((id: number) => {
                    const goods = goodsOptions.find((goods) => goods.id === id);
                    return (
                      <Popover key={id} content={`id: ${goods?.id}`}>
                        <Card>
                          <OptionCover src={goods?.cover} size="2.4rem" />
                          <div>{goods?.name}</div>
                        </Card>
                      </Popover>
                    );
                  })}
                </>
              ) : (
                <span style={{ color: "#999" }}>暂无关联商品</span>
              ),
            width: "24rem",
          },
          {
            title: "观看量",
            dataIndex: "views",
            render: (value, tourismNote) => (
              <InputNumber
                value={value}
                onChange={(views) => editViews({ id: tourismNote.id, views })}
              />
            ),
            width: "12rem",
          },
          {
            title: "创建时间",
            render: (value, tourismNote) => (
              <span>
                {tourismNote.createdAt
                  ? dayjs(tourismNote.createdAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
          },
          {
            title: "更新时间",
            render: (value, tourismNote) => (
              <span>
                {tourismNote.updatedAt
                  ? dayjs(tourismNote.updatedAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.updatedAt).valueOf() - dayjs(b.updatedAt).valueOf(),
          },
          {
            title: "操作",
            render(value, tourismNote) {
              return <More id={tourismNote.id} />;
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
  const { startEdit } = useTourismNoteModal();
  const { mutate: deleteTourismNote } = useDeleteTourismNote(
    useTourismNoteListQueryKey()
  );

  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: "确定删除该景区吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteTourismNote(id),
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
