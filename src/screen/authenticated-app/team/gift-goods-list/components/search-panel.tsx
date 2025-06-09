import { Button, Select } from "antd";
import { OptionCover, Row } from "components/lib";

import { useState } from "react";
import styled from "@emotion/styled";

import type { GiftListSearchParams } from "types/giftGoods";
import type { DataOption, ProductOption } from "types/common";

export interface SearchPanelProps {
  typeOptions: DataOption[];
  goodsOptions: ProductOption[];
  params: Partial<GiftListSearchParams>;
  setParams: (params: Partial<GiftListSearchParams>) => void;
}

const defaultParmas: Partial<GiftListSearchParams> = {
  typeId: undefined,
  goodsId: undefined,
};

export const SearchPanel = ({
  typeOptions,
  goodsOptions,
  params,
  setParams,
}: SearchPanelProps) => {
  const [tempParams, setTempParams] = useState(defaultParmas);

  const setType = (typeId: number) => setTempParams({ ...tempParams, typeId });
  const clearType = () => setTempParams({ ...tempParams, typeId: undefined });

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
        <div>好物类型：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.typeId}
          placeholder="请选择好物类型"
          allowClear={true}
          onSelect={setType}
          onClear={clearType}
        >
          {typeOptions?.map(({ id, name }) => (
            <Select.Option key={id} value={id}>
              {name}
            </Select.Option>
          ))}
        </Select>
      </Item>
      <Item>
        <div>相关商品：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.goodsId}
          placeholder="请选择相关商品"
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
