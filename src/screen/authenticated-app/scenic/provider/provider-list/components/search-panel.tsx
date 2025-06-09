import { useState } from "react";
import styled from "@emotion/styled";

import { Row } from "components/lib";
import { Button, Input, Select } from "antd";

import type { Option } from "types/common";
import type { ProvidersSearchParams } from "types/scenicProvider";

export interface SearchPanelProps {
  statusOptions: Option[];
  params: Partial<ProvidersSearchParams>;
  setParams: (params: Partial<ProvidersSearchParams>) => void;
}

const defaultParmas: Partial<ProvidersSearchParams> = {
  status: undefined,
  name: "",
  mobile: "",
};

export const SearchPanel = ({
  statusOptions,
  params,
  setParams,
}: SearchPanelProps) => {
  const [tempParams, setTempParams] = useState(defaultParmas);

  const setStatus = (status: number) =>
    setTempParams({ ...tempParams, status });
  const clearStatus = () => setTempParams({ ...tempParams, status: undefined });

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

  const clear = () => {
    setParams({ ...params, ...defaultParmas, page: 1 });
    setTempParams({ ...tempParams, ...defaultParmas });
  };

  return (
    <Container>
      <Item>
        <div>服务商状态：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.status}
          placeholder="请选择服务商状态"
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
        <div>联系人姓名：</div>
        <Input
          style={{ width: "20rem" }}
          value={tempParams.name}
          onChange={setNickname}
          placeholder="请输入姓名"
          allowClear={true}
        />
      </Item>
      <Item>
        <div>联系人手机号：</div>
        <Input
          style={{ width: "20rem" }}
          value={tempParams.mobile}
          onChange={setMobile}
          placeholder="请输入手机号"
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
