import { Row } from "components/lib";
import { Button, Input, Select } from "antd";

import { useState } from "react";
import styled from "@emotion/styled";

import type { PromoterListSearchParams } from "types/promoter";

export interface SearchPanelProps {
  params: Partial<PromoterListSearchParams>;
  setParams: (params: Partial<PromoterListSearchParams>) => void;
  levelOptions: { text: string; value: number; scene: number }[];
  pathOptions: { text: string; value: number }[];
}

const defaultParmas: Partial<PromoterListSearchParams> = {
  nickname: "",
  mobile: "",
  level: undefined,
  path: undefined,
};

export const SearchPanel = ({
  params,
  setParams,
  levelOptions,
  pathOptions,
}: SearchPanelProps) => {
  const [tempParams, setTempParams] = useState(defaultParmas);

  const setNickname = (evt: any) => {
    if (!evt.target.value && evt.type !== "change") {
      setTempParams({
        ...tempParams,
        nickname: "",
      });
      return;
    }

    setTempParams({
      ...tempParams,
      nickname: evt.target.value,
    });
  };

  const setMobile = (evt: any) => {
    if (!evt.target.value && evt.type !== "change") {
      setTempParams({
        ...tempParams,
        mobile: "",
      });
      return;
    }

    setTempParams({
      ...tempParams,
      mobile: evt.target.value,
    });
  };

  const setLevel = (level: number) => setTempParams({ ...tempParams, level });
  const clearLevel = () => setTempParams({ ...tempParams, level: undefined });

  const clear = () => {
    setParams({ ...params, ...defaultParmas, page: 1 });
    setTempParams({ ...tempParams, ...defaultParmas });
  };

  return (
    <Container>
      <Item>
        <div>推荐官昵称：</div>
        <Input
          style={{ width: "20rem" }}
          value={tempParams.nickname}
          onChange={setNickname}
          placeholder="请输入推荐官昵称"
          allowClear
        />
      </Item>
      <Item>
        <div>推荐官手机号：</div>
        <Input
          style={{ width: "20rem" }}
          value={tempParams.mobile}
          onChange={setMobile}
          placeholder="请输入推荐官手机号"
          allowClear
        />
      </Item>
      <Item>
        <div>推荐官身份：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.level}
          placeholder="请选择推荐官身份"
          allowClear
          onSelect={setLevel}
          onClear={clearLevel}
        >
          {levelOptions?.map(({ text, value }) => (
            <Select.Option key={value} value={value}>
              {text}
            </Select.Option>
          ))}
        </Select>
      </Item>
      <Item>
        <div>生成场景：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.path}
          placeholder="请选择场景"
          allowClear
          onSelect={setLevel}
          onClear={clearLevel}
        >
          {pathOptions?.map(({ text, value }) => (
            <Select.Option key={value} value={value}>
              {text}
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
