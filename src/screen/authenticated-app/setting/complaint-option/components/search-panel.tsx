import { useState } from "react";
import styled from "@emotion/styled";

import { Row } from "components/lib";
import { Button, Select } from "antd";

import type { Option } from "types/common";
import type { ComplaintOptionListSearchParams } from "types/complaintOption";

export interface SearchPanelProps {
  params: Partial<ComplaintOptionListSearchParams>;
  setParams: (params: Partial<ComplaintOptionListSearchParams>) => void;
  typeOptions: Option[];
}

const defaultParmas: Partial<ComplaintOptionListSearchParams> = {
  type: undefined,
};

export const SearchPanel = ({
  typeOptions,
  params,
  setParams,
}: SearchPanelProps) => {
  const [tempParams, setTempParams] = useState(defaultParmas);

  const setType = (type: number) => setTempParams({ ...tempParams, type });
  const clearType = () => setTempParams({ ...tempParams, type: undefined });

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
          placeholder="请选择投诉类型"
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
