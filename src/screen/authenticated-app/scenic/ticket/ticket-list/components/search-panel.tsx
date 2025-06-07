import { useState } from "react";
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { Button, Input, Select } from "antd";

import type { TicketListSearchParams } from "types/scenicTicket";
import type { Option, ProductOption } from "types/common";

export interface SearchPanelProps {
  scenicOptions: ProductOption[];
  typeOptions: Option[];
  statusOptions: Option[];
  params: Partial<TicketListSearchParams>;
  setParams: (params: Partial<TicketListSearchParams>) => void;
}

const defaultParmas: Partial<TicketListSearchParams> = {
  name: "",
  type: undefined,
  scenicId: undefined,
  status: undefined,
};

export const SearchPanel = ({
  scenicOptions,
  typeOptions,
  statusOptions,
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

  const setType = (type: number) => setTempParams({ ...tempParams, type });
  const clearType = () => setTempParams({ ...tempParams, type: undefined });

  const setScenicId = (scenicId: number) =>
    setTempParams({ ...tempParams, scenicId });
  const clearScenicId = () =>
    setTempParams({ ...tempParams, scenicId: undefined });

  const setStatus = (status: number) =>
    setTempParams({ ...tempParams, status });
  const clearStatus = () => setTempParams({ ...tempParams, status: undefined });

  const clear = () => {
    setParams({ ...params, ...defaultParmas });
    setTempParams({ ...tempParams, ...defaultParmas });
  };

  return (
    <Container>
      <Item>
        <div>门票名称：</div>
        <Input
          style={{ width: "20rem" }}
          value={tempParams.name}
          onChange={setName}
          placeholder="请输入门票名称"
          allowClear={true}
        />
      </Item>
      <Item>
        <div>门票类型：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.type}
          placeholder="请选择门票类型"
          allowClear={true}
          onSelect={setType}
          onClear={clearType}
        >
          {typeOptions?.map(({ text, value }) => (
            <Select.Option key={value} value={value}>
              {text}
            </Select.Option>
          ))}
        </Select>
      </Item>
      <Item>
        <div>关联景区：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.scenicId}
          placeholder="请选择关联景区"
          allowClear={true}
          onSelect={setScenicId}
          onClear={clearScenicId}
        >
          {scenicOptions?.map(({ id, name }) => (
            <Select.Option key={id} value={id}>
              {name}
            </Select.Option>
          ))}
        </Select>
      </Item>
      <Item>
        <div>门票状态：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.status}
          placeholder="请选择门票状态"
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
