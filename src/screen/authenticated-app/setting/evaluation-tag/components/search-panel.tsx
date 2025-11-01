import { useState } from "react";
import styled from "@emotion/styled";

import { Row } from "components/lib";
import { Button, Select } from "antd";

import type { Option } from "types/common";
import type { EvaluationTagListSearchParams } from "types/evaluationTag";

export interface SearchPanelProps {
  params: Partial<EvaluationTagListSearchParams>;
  setParams: (params: Partial<EvaluationTagListSearchParams>) => void;
  typeOptions: Option[];
  sceneOptions: Option[];
}

const defaultParmas: Partial<EvaluationTagListSearchParams> = {
  scene: undefined,
  type: undefined,
};

export const SearchPanel = ({
  typeOptions,
  sceneOptions,
  params,
  setParams,
}: SearchPanelProps) => {
  const [tempParams, setTempParams] = useState(defaultParmas);

  const setType = (type: number) => setTempParams({ ...tempParams, type });
  const clearType = () => setTempParams({ ...tempParams, type: undefined });

  const setScene = (scene: number) => setTempParams({ ...tempParams, scene });
  const clearStatus = () => setTempParams({ ...tempParams, scene: undefined });

  const clear = () => {
    setParams({ ...params, ...defaultParmas, page: 1 });
    setTempParams({ ...tempParams, ...defaultParmas });
  };

  return (
    <Container>
      <Item>
        <div>评价类型：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.type}
          placeholder="请选择评价类型"
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
        <div>使用场景：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.scene}
          placeholder="请选择使用场景"
          allowClear={true}
          onSelect={setScene}
          onClear={clearStatus}
        >
          {sceneOptions?.map(({ text, value }) => (
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
