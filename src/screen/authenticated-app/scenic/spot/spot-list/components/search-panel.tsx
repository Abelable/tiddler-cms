import { useState } from "react";
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { Button, Input, Select } from "antd";

import type { ScenicListSearchParams } from "types/scenic";
import type { CategoryOption } from "types/category";

export interface SearchPanelProps {
  categoryOptions: CategoryOption[];
  params: Partial<ScenicListSearchParams>;
  setParams: (params: Partial<ScenicListSearchParams>) => void;
}

const defaultParmas: Partial<ScenicListSearchParams> = {
  name: "",
  categoryId: undefined,
};

export const SearchPanel = ({
  categoryOptions,
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

  const setCategory = (categoryId: number) =>
    setTempParams({ ...tempParams, categoryId });
  const clearCategory = () =>
    setTempParams({ ...tempParams, categoryId: undefined });

  const clear = () => {
    setParams({ ...params, ...defaultParmas });
    setTempParams({ ...tempParams, ...defaultParmas });
  };

  return (
    <Container>
      <Item>
        <div>景区名称：</div>
        <Input
          style={{ width: "20rem" }}
          value={tempParams.name}
          onChange={setName}
          placeholder="请输入景区名称"
          allowClear={true}
        />
      </Item>
      <Item>
        <div>景区分类：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.categoryId}
          placeholder="请选择景区分类"
          allowClear={true}
          onSelect={setCategory}
          onClear={clearCategory}
        >
          {categoryOptions?.map(({ id, name }) => (
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
