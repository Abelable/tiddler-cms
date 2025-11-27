import { useState } from "react";
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { Button, Input } from "antd";

import type { ExpressesSearchParams } from "types/express";

export interface SearchPanelProps {
  params: Partial<ExpressesSearchParams>;
  setParams: (params: Partial<ExpressesSearchParams>) => void;
}

const defaultParmas: Partial<ExpressesSearchParams> = {
  name: "",
  code: "",
};

export const SearchPanel = ({ params, setParams }: SearchPanelProps) => {
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

  const setCode = (evt: any) => {
    if (!evt.target.value && evt.type !== "change") {
      setTempParams({
        ...tempParams,
        code: "",
      });
      return;
    }

    setTempParams({
      ...tempParams,
      code: evt.target.value,
    });
  };

  const clear = () => {
    setParams({ ...params, ...defaultParmas, page: 1 });
    setTempParams({ ...tempParams, ...defaultParmas });
  };

  return (
    <Container>
      <Item>
        <div>快递名称：</div>
        <Input
          style={{ width: "20rem" }}
          value={tempParams.name}
          onChange={setName}
          placeholder="请输入快递名称"
          allowClear
        />
      </Item>
      <Item>
        <div>快递编号：</div>
        <Input
          style={{ width: "20rem" }}
          value={tempParams.code}
          onChange={setCode}
          placeholder="请输入快递编号"
          allowClear
        />
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
