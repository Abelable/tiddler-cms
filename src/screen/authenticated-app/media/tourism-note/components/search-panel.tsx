import { useState } from "react";
import styled from "@emotion/styled";
import { OptionAvatar, OptionCover, Row } from "components/lib";
import { Button, Input, Select } from "antd";
import { UserOutlined } from "@ant-design/icons";

import type { ProductOption } from "types/common";
import type { UserOption } from "types/user";
import type { ShortVideoListSearchParams } from "types/shortVideo";

export interface SearchPanelProps {
  userOptions: UserOption[];
  scenicOptions: ProductOption[];
  hotelOptions: ProductOption[];
  restaurantOptions: ProductOption[];
  goodsOptions: ProductOption[];
  params: Partial<ShortVideoListSearchParams>;
  setParams: (params: Partial<ShortVideoListSearchParams>) => void;
}

const defaultParmas: Partial<ShortVideoListSearchParams> = {
  title: "",
  userId: undefined,
  scenicId: undefined,
  hotelId: undefined,
  restaurantId: undefined,
  goodsId: undefined,
};

export const SearchPanel = ({
  userOptions,
  scenicOptions,
  hotelOptions,
  restaurantOptions,
  goodsOptions,
  params,
  setParams,
}: SearchPanelProps) => {
  const [tempParams, setTempParams] = useState(defaultParmas);

  const setTitle = (evt: any) => {
    if (!evt.target.value && evt.type !== "change") {
      setTempParams({
        ...tempParams,
        title: "",
      });
      return;
    }

    setTempParams({
      ...tempParams,
      title: evt.target.value,
    });
  };

  const setUser = (userId: number) => setTempParams({ ...tempParams, userId });
  const clearUser = () => setTempParams({ ...tempParams, userId: undefined });

  const setScenicId = (scenicId: number) =>
    setTempParams({ ...tempParams, scenicId });
  const clearScenicId = () =>
    setTempParams({ ...tempParams, scenicId: undefined });

  const setHotelId = (hotelId: number) =>
    setTempParams({ ...tempParams, hotelId });
  const clearHotelId = () =>
    setTempParams({ ...tempParams, hotelId: undefined });

  const setRestaurantId = (restaurantId: number) =>
    setTempParams({ ...tempParams, restaurantId });
  const clearRestaurantId = () =>
    setTempParams({ ...tempParams, restaurantId: undefined });

  const setGoodsId = (goodsId: number) =>
    setTempParams({ ...tempParams, goodsId });
  const clearGoodsId = () =>
    setTempParams({ ...tempParams, goodsId: undefined });

  const clear = () => {
    setParams({ ...params, ...defaultParmas, page: 1 });
    setTempParams({ ...tempParams, ...defaultParmas });
  };

  return (
    <Container>
      <Item>
        <div>标题：</div>
        <Input
          style={{ width: "20rem" }}
          value={tempParams.title}
          onChange={setTitle}
          placeholder="请输入标题"
          allowClear={true}
        />
      </Item>
      <Item>
        <div>作者：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.userId}
          placeholder="请选择作者"
          allowClear
          onSelect={setUser}
          onClear={clearUser}
          showSearch
          filterOption={(input, option) =>
            (option!.children as any)[1].props.children
              .toLowerCase()
              .includes(input.toLowerCase())
          }
        >
          {userOptions?.map(({ id, avatar, nickname }) => (
            <Select.Option key={id} value={id}>
              <OptionAvatar src={avatar} icon={<UserOutlined />} />
              <span>{nickname}</span>
            </Select.Option>
          ))}
        </Select>
      </Item>
      <Item>
        <div>关联景点：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.scenicId}
          placeholder="请选择关联景点"
          allowClear
          onSelect={setScenicId}
          onClear={clearScenicId}
          showSearch
          filterOption={(input, option) =>
            (option!.children as any)[1].props.children
              .toLowerCase()
              .includes(input.toLowerCase())
          }
        >
          {scenicOptions.map(({ id, cover, name }) => (
            <Select.Option key={id} value={id}>
              <OptionCover src={cover} />
              <span>{name}</span>
            </Select.Option>
          ))}
        </Select>
      </Item>
      <Item>
        <div>关联酒店：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.hotelId}
          placeholder="请选择关联酒店"
          allowClear
          onSelect={setHotelId}
          onClear={clearHotelId}
          showSearch
          filterOption={(input, option) =>
            (option!.children as any)[1].props.children
              .toLowerCase()
              .includes(input.toLowerCase())
          }
        >
          {hotelOptions.map(({ id, cover, name }) => (
            <Select.Option key={id} value={id}>
              <OptionCover src={cover} />
              <span>{name}</span>
            </Select.Option>
          ))}
        </Select>
      </Item>
      <Item>
        <div>关联餐馆：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.restaurantId}
          placeholder="请选择关联餐馆"
          allowClear
          onSelect={setRestaurantId}
          onClear={clearRestaurantId}
          showSearch
          filterOption={(input, option) =>
            (option!.children as any)[1].props.children
              .toLowerCase()
              .includes(input.toLowerCase())
          }
        >
          {restaurantOptions.map(({ id, cover, name }) => (
            <Select.Option key={id} value={id}>
              <OptionCover src={cover} />
              <span>{name}</span>
            </Select.Option>
          ))}
        </Select>
      </Item>
      <Item>
        <div>关联商品：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.goodsId}
          placeholder="请选择关联商品"
          allowClear
          onSelect={setGoodsId}
          onClear={clearGoodsId}
          showSearch
          filterOption={(input, option) =>
            (option!.children as any)[1].props.children
              .toLowerCase()
              .includes(input.toLowerCase())
          }
        >
          {goodsOptions.map(({ id, cover, name }) => (
            <Select.Option key={id} value={id}>
              <OptionCover src={cover} />
              <span>{name}</span>
            </Select.Option>
          ))}
        </Select>
      </Item>

      <ButtonWrap gap={true}>
        <Button onClick={clear}>重置</Button>
        <Button
          type={"primary"}
          style={{ marginRight: 0 }}
          onClick={() => setParams({ ...params, ...tempParams, page: 1 })}
        >
          查询
        </Button>
      </ButtonWrap>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1.6rem;
  padding: 2.4rem 16.8rem 0 2.4rem;
  background: #fff;
  border-radius: 0.6rem;
`;

const Item = styled(Row)`
  margin-right: 2rem;
  padding-bottom: 2.4rem;
`;

const ButtonWrap = styled(Row)`
  position: absolute;
  right: 2.4rem;
  bottom: 2.4rem;
`;
