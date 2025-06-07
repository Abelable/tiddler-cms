import { useState } from "react";
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { Button, Select } from "antd";

import type { Option } from "types/common";
import type { MallBannerListSearchParams } from "types/mallBanner";

export interface SearchPanelProps {
  sceneOptions: Option[];
  params: Partial<MallBannerListSearchParams>;
  setParams: (params: Partial<MallBannerListSearchParams>) => void;
}

const defaultParmas: Partial<MallBannerListSearchParams> = {
  status: undefined,
  scene: undefined,
};

export const SearchPanel = ({
  sceneOptions,
  params,
  setParams,
}: SearchPanelProps) => {
  const [tempParams, setTempParams] = useState(defaultParmas);

  const setScene = (scene: number) => setTempParams({ ...tempParams, scene });
  const clearScene = () => setTempParams({ ...tempParams, scene: undefined });

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
        <div>活动跳转场景：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.scene}
          placeholder="请选择场景"
          allowClear={true}
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
          allowClear={true}
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
