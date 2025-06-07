import { useState } from "react";
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { Button, Select } from "antd";

import type { CategoryOption } from "types/category";
import type { GoodsCategoriesSearchParams } from "types/goodsCategory";

export interface SearchPanelProps {
  shopCategoryOptions: CategoryOption[];
  params: Partial<GoodsCategoriesSearchParams>;
  setParams: (params: Partial<GoodsCategoriesSearchParams>) => void;
}

const defaultParmas: Partial<GoodsCategoriesSearchParams> = {
  shopCategoryId: undefined,
};

export const SearchPanel = ({
  shopCategoryOptions,
  params,
  setParams,
}: SearchPanelProps) => {
  const [tempParams, setTempParams] = useState(defaultParmas);

  const setShopCategory = (shopCategoryId: number) =>
    setTempParams({ ...tempParams, shopCategoryId });
  const clearShopCategory = () =>
    setTempParams({ ...tempParams, shopCategoryId: undefined });

  const clear = () => {
    setParams({ ...params, ...defaultParmas });
    setTempParams({ ...tempParams, ...defaultParmas });
  };

  return (
    <Container>
      <Item>
        <div>所属店铺分类：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.shopCategoryId}
          placeholder="请选择所属店铺分类"
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

      <ButtonWrap gap={true}>
        <Button onClick={clear}>重置</Button>
        <Button
          type={"primary"}
          style={{ marginRight: 0 }}
          onClick={() => setParams({ ...params, ...tempParams })}
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
