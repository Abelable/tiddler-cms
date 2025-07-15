import { useState } from "react";
import styled from "@emotion/styled";
import { Row, ErrorBox } from "components/lib";
import { Button, Select } from "antd";

import { useHotelOptions } from "service/hotel";
import { useHotelRoomTypeOptions } from "service/hotelRoomType";

import type { RoomListSearchParams } from "types/hotelRoom";
import type { Option } from "types/common";

export interface SearchPanelProps {
  statusOptions: Option[];
  params: Partial<RoomListSearchParams>;
  setParams: (params: Partial<RoomListSearchParams>) => void;
}

const defaultParmas: Partial<RoomListSearchParams> = {
  hotelId: undefined,
  typeId: undefined,
  status: undefined,
};

export const SearchPanel = ({
  statusOptions,
  params,
  setParams,
}: SearchPanelProps) => {
  const [tempParams, setTempParams] = useState(defaultParmas);

  const { data: hotelOptions, error: hotelOptionsError } = useHotelOptions();
  const { data: typeOptions, error: typeOptionsError } =
    useHotelRoomTypeOptions(tempParams?.hotelId);

  const setTypeId = (typeId: number) =>
    setTempParams({ ...tempParams, typeId });
  const clearTypeId = () => setTempParams({ ...tempParams, typeId: undefined });

  const setHotelId = (hotelId: number) =>
    setTempParams({ ...tempParams, hotelId });
  const clearHotelId = () =>
    setTempParams({ ...tempParams, hotelId: undefined });

  const setStatus = (status: number) =>
    setTempParams({ ...tempParams, status });
  const clearStatus = () => setTempParams({ ...tempParams, status: undefined });

  const clear = () => {
    setParams({ ...params, ...defaultParmas, page: 1 });
    setTempParams({ ...tempParams, ...defaultParmas });
  };

  return (
    <Container>
      <ErrorBox error={hotelOptionsError || typeOptionsError} />
      <Item>
        <div>关联酒店：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.hotelId}
          placeholder="请选择关联酒店"
          allowClear={true}
          onSelect={setHotelId}
          onClear={clearHotelId}
        >
          {hotelOptions?.map(({ id, name }) => (
            <Select.Option key={id} value={id}>
              {name}
            </Select.Option>
          ))}
        </Select>
      </Item>
      <Item>
        <div>房间类型：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.typeId}
          placeholder="请选择房间类型"
          allowClear={true}
          onSelect={setTypeId}
          onClear={clearTypeId}
        >
          {typeOptions?.map(({ id, name }) => (
            <Select.Option key={id} value={id}>
              {name}
            </Select.Option>
          ))}
        </Select>
      </Item>
      <Item>
        <div>房间状态：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.status}
          placeholder="请选择房间状态"
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
