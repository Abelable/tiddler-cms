import { Row } from "components/lib";
import { Button, Input, Select } from "antd";

import { useState } from "react";
import styled from "@emotion/styled";

import type { Option } from "types/common";
import type { TaskListSearchParams } from "types/task";

export interface SearchPanelProps {
  statusOptions: Option[];
  productTypeOptions: Option[];
  params: Partial<TaskListSearchParams>;
  setParams: (params: Partial<TaskListSearchParams>) => void;
}

const defaultParmas: Partial<TaskListSearchParams> = {
  status: undefined,
  productType: undefined,
  productName: "",
};

export const SearchPanel = ({
  statusOptions,
  productTypeOptions,
  params,
  setParams,
}: SearchPanelProps) => {
  const [tempParams, setTempParams] = useState(defaultParmas);

  const setStatus = (status: number) =>
    setTempParams({ ...tempParams, status });
  const clearStatus = () => setTempParams({ ...tempParams, status: undefined });

  const setProductType = (productType: number) =>
    setTempParams({ ...tempParams, productType });
  const clearPosition = () =>
    setTempParams({ ...tempParams, productType: undefined });

  const setProductName = (evt: any) => {
    if (!evt.target.value && evt.type !== "change") {
      setTempParams({
        ...tempParams,
        productName: "",
      });
      return;
    }

    setTempParams({
      ...tempParams,
      productName: evt.target.value,
    });
  };

  const clear = () => {
    setParams({ ...params, ...defaultParmas, page: 1 });
    setTempParams({ ...tempParams, ...defaultParmas });
  };

  return (
    <Container>
      <Item>
        <div>任务状态：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.status}
          placeholder="请选择任务状态"
          allowClear
          onSelect={setStatus}
          onClear={clearStatus}
        >
          {statusOptions.map(({ text, value }) => (
            <Select.Option key={value} value={value}>
              {text}
            </Select.Option>
          ))}
        </Select>
      </Item>
      <Item>
        <div>产品类型：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.productType}
          placeholder="请选择产品类型"
          allowClear
          onSelect={setProductType}
          onClear={clearPosition}
        >
          {productTypeOptions?.map(({ text, value }) => (
            <Select.Option key={value} value={value}>
              {text}
            </Select.Option>
          ))}
        </Select>
      </Item>
      <Item>
        <div>产品名称：</div>
        <Input
          style={{ width: "20rem" }}
          value={tempParams.productName}
          onChange={setProductName}
          placeholder="请输入产品名称"
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
