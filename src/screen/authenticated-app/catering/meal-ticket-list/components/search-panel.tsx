import { useState } from "react";
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { Button, Input, Select } from "antd";

import type { TicketListSearchParams } from "types/mealTicket";
import type { Option, ProductOption } from "types/common";

export interface SearchPanelProps {
  restaurantOptions: ProductOption[];
  statusOptions: Option[];
  params: Partial<TicketListSearchParams>;
  setParams: (params: Partial<TicketListSearchParams>) => void;
}

const defaultParmas: Partial<TicketListSearchParams> = {
  name: "",
  restaurantId: undefined,
  status: undefined,
};

export const SearchPanel = ({
  restaurantOptions,
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

  const setRestaurantId = (restaurantId: number) =>
    setTempParams({ ...tempParams, restaurantId });
  const clearScenicId = () =>
    setTempParams({ ...tempParams, restaurantId: undefined });

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
        <div>餐券名称：</div>
        <Input
          style={{ width: "20rem" }}
          value={tempParams.name}
          onChange={setName}
          placeholder="请输入餐券名称"
          allowClear={true}
        />
      </Item>
      <Item>
        <div>关联门店：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.restaurantId}
          placeholder="请选择关联门店"
          allowClear={true}
          onSelect={setRestaurantId}
          onClear={clearScenicId}
        >
          {restaurantOptions?.map(({ id, name }) => (
            <Select.Option key={id} value={id}>
              {name}
            </Select.Option>
          ))}
        </Select>
      </Item>
      <Item>
        <div>餐券状态：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.status}
          placeholder="请选择餐券状态"
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
