import { Row } from "components/lib";
import { Button, Select } from "antd";

import { useState } from "react";
import styled from "@emotion/styled";

import type { Option } from "types/common";
import type { BannerListSearchParams } from "types/banner";

export interface SearchPanelProps {
  positionOptions: Option[];
  sceneOptions: Option[];
  params: Partial<BannerListSearchParams>;
  setParams: (params: Partial<BannerListSearchParams>) => void;
}

const defaultParmas: Partial<BannerListSearchParams> = {
  position: undefined,
  status: undefined,
  scene: undefined,
};

export const SearchPanel = ({
  positionOptions,
  sceneOptions,
  params,
  setParams,
}: SearchPanelProps) => {
  const [tempParams, setTempParams] = useState(defaultParmas);

  const setPosition = (position: number) =>
    setTempParams({ ...tempParams, position });
  const clearPosition = () =>
    setTempParams({ ...tempParams, position: undefined });

  const setScene = (scene: number) => setTempParams({ ...tempParams, scene });
  const clearScene = () => setTempParams({ ...tempParams, scene: undefined });

  const setStatus = (status: number) =>
    setTempParams({ ...tempParams, status });
  const clearStatus = () => setTempParams({ ...tempParams, status: undefined });

  const clear = () => {
    setParams({ ...params, ...defaultParmas, page: 1 });
    setTempParams({ ...tempParams, ...defaultParmas });
  };

  return (
    <Container>
      <Item>
        <div>使用场景：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.position}
          placeholder="请选择使用场景"
          allowClear
          onSelect={setPosition}
          onClear={clearPosition}
        >
          {positionOptions?.map(({ text, value }) => (
            <Select.Option key={value} value={value}>
              {text}
            </Select.Option>
          ))}
        </Select>
      </Item>
      <Item>
        <div>活动跳转场景：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.scene}
          placeholder="请选择跳转场景"
          allowClear
          onSelect={setScene}
          onClear={clearScene}
        >
          {sceneOptions?.map(({ text, value }) => (
            <Select.Option key={value} value={value}>
              {text}
            </Select.Option>
          ))}
        </Select>
      </Item>
      <Item>
        <div>活动状态：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.status}
          placeholder="请选择活动状态"
          allowClear
          onSelect={setStatus}
          onClear={clearStatus}
        >
          {[
            { text: "进行中", value: 1 },
            { text: "已结束", value: 2 },
          ].map(({ text, value }) => (
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
