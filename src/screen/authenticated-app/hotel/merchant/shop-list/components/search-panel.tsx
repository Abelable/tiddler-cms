import { Row } from "components/lib";
import { Button, Input } from "antd";

import { useState } from "react";
import styled from "@emotion/styled";

import type { ShopsSearchParams } from "types/hotelShop";

export interface SearchPanelProps {
  params: Partial<ShopsSearchParams>;
  setParams: (params: Partial<ShopsSearchParams>) => void;
}

const defaultParmas: Partial<ShopsSearchParams> = {
  name: "",
};

export const SearchPanel = ({ params, setParams }: SearchPanelProps) => {
  const [tempParams, setTempParams] = useState(defaultParmas);

  const setNickname = (evt: any) => {
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

  const clear = () => {
    setParams({ ...params, ...defaultParmas, page: 1 });
    setTempParams({ ...tempParams, ...defaultParmas });
  };

  return (
    <Container>
      <Item>
        <div>店铺名称：</div>
        <Input
          style={{ width: "20rem" }}
          value={tempParams.name}
          onChange={setNickname}
          placeholder="请输入店铺名称"
          allowClear={true}
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
