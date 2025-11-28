import { useState } from "react";
import styled from "@emotion/styled";
import { OptionCover, Row } from "components/lib";
import { Button, Input, Select } from "antd";

import type { DataOption } from "types/common";
import type { GoodsListSearchParams } from "types/goods";
import type { GoodsCategoryOption } from "types/goodsCategory";
import type { ShopOption } from "types/shop";

export interface SearchPanelProps {
  statusOptions: { text: string; value: number }[];
  shopCategoryOptions: DataOption[];
  goodsCategoryOptions: GoodsCategoryOption[];
  shopOptions: ShopOption[];
  params: Partial<GoodsListSearchParams>;
  setParams: (params: Partial<GoodsListSearchParams>) => void;
}

const defaultParmas: Partial<GoodsListSearchParams> = {
  name: "",
  shopCategoryId: undefined,
  categoryId: undefined,
  status: undefined,
  shopId: undefined,
};

export const SearchPanel = ({
  shopCategoryOptions,
  goodsCategoryOptions,
  statusOptions,
  shopOptions,
  params,
  setParams,
}: SearchPanelProps) => {
  const [tempParams, setTempParams] = useState(defaultParmas);

  const setName = (evt: any) => {
    if (!evt.target.value && evt.type !== "change") {
      setTempParams({
        ...tempParams,
        name: "",
      });
      return;
    }

    setTempParams({
      ...tempParams,
      name: evt.target.value,
    });
  };

  const setStatus = (status: number) =>
    setTempParams({ ...tempParams, status });
  const clearStatus = () => setTempParams({ ...tempParams, status: undefined });

  const setShopCategory = (shopCategoryId: number) =>
    setTempParams({ ...tempParams, shopCategoryId });
  const clearShopCategory = () =>
    setTempParams({ ...tempParams, shopCategoryId: undefined });

  const setCategory = (categoryId: number) =>
    setTempParams({ ...tempParams, categoryId });
  const clearCategory = () =>
    setTempParams({ ...tempParams, categoryId: undefined });

  const setShop = (shopId: number) => setTempParams({ ...tempParams, shopId });
  const clearShop = () => setTempParams({ ...tempParams, shopId: undefined });

  const clear = () => {
    setParams({ ...params, ...defaultParmas, page: 1 });
    setTempParams({ ...tempParams, ...defaultParmas });
  };

  return (
    <Container>
      <Item>
        <div>商品名称：</div>
        <Input
          style={{ width: "20rem" }}
          value={tempParams.name}
          onChange={setName}
          placeholder="请输入商品名称"
          allowClear={true}
        />
      </Item>
      <Item>
        <div>商品状态：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.status}
          placeholder="请选择商品状态"
          allowClear={true}
          onSelect={setStatus}
          onClear={clearStatus}
        >
          {statusOptions?.map(({ text, value }) => (
            <Select.Option key={value} value={value}>
              {text}
            </Select.Option>
          ))}
        </Select>
      </Item>
      <Item>
        <div>商品一级分类：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.shopCategoryId}
          placeholder="请选择一级商品分类"
          allowClear={true}
          onSelect={setShopCategory}
          onClear={clearShopCategory}
        >
          {shopCategoryOptions?.map(({ id, name }) => (
            <Select.Option key={id} value={id}>
              {name}
            </Select.Option>
          ))}
        </Select>
      </Item>
      <Item>
        <div>商品二级分类：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.categoryId}
          placeholder="请选择二级商品分类"
          allowClear={true}
          onSelect={setCategory}
          onClear={clearCategory}
          showSearch
          filterOption={(input, option) =>
            (option!.children as unknown as string)
              .toLowerCase()
              .includes(input.toLowerCase())
          }
        >
          {goodsCategoryOptions
            .filter((item) =>
              tempParams.shopCategoryId
                ? item.shopCategoryId === tempParams.shopCategoryId
                : true
            )
            ?.map(({ id, name }) => (
              <Select.Option key={id} value={id}>
                {name}
              </Select.Option>
            ))}
        </Select>
      </Item>
      <Item>
        <div>所属店铺：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.shopId}
          placeholder="请选择所属店铺"
          allowClear
          onSelect={setShop}
          onClear={clearShop}
          showSearch
          filterOption={(input, option) =>
            (option!.children as any)[1].props.children
              .toLowerCase()
              .includes(input.toLowerCase())
          }
        >
          {shopOptions?.map(({ id, logo, name }) => (
            <Select.Option key={id} value={id}>
              <OptionCover src={logo} />
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
