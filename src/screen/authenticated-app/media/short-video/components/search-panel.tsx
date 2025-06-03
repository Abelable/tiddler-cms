import { useState } from "react";
import styled from "@emotion/styled";
import { OptionAvatar, Row } from "components/lib";
import { Button, Input, Select } from "antd";
import { UserOutlined } from "@ant-design/icons";

import type { ShortVideoListSearchParams } from "types/shortVideo";
import type { UserOption } from "types/user";

export interface SearchPanelProps {
  userOptions: UserOption[];
  params: Partial<ShortVideoListSearchParams>;
  setParams: (params: Partial<ShortVideoListSearchParams>) => void;
}

const defaultParmas: Partial<ShortVideoListSearchParams> = {
  title: "",
  userId: undefined,
};

export const SearchPanel = ({
  userOptions,
  params,
  setParams,
}: SearchPanelProps) => {
  const [tempParams, setTempParams] = useState(defaultParmas);

  const setTitle = (evt: any) => {
    if (!evt.target.value && evt.type !== "change") {
      setTempParams({
        ...tempParams,
        title: "",
      });
      return;
    }

    setTempParams({
      ...tempParams,
      title: evt.target.value,
    });
  };

  const setUser = (userId: number) => setTempParams({ ...tempParams, userId });
  const clearUser = () => setTempParams({ ...tempParams, userId: undefined });

  const clear = () => {
    setParams({ ...params, ...defaultParmas });
    setTempParams({ ...tempParams, ...defaultParmas });
  };

  return (
    <Container>
      <Item>
        <div>视频标题：</div>
        <Input
          style={{ width: "20rem" }}
          value={tempParams.title}
          onChange={setTitle}
          placeholder="请输入视频标题"
          allowClear={true}
        />
      </Item>
      <Item>
        <div>视频作者：</div>
        <Select
          style={{ width: "20rem" }}
          value={tempParams.userId}
          placeholder="请选择视频作者"
          allowClear
          onSelect={setUser}
          onClear={clearUser}
          showSearch
          filterOption={(input, option) =>
            (option!.children as any)[1].props.children
              .toLowerCase()
              .includes(input.toLowerCase())
          }
        >
          {userOptions?.map(({ id, avatar, nickname }) => (
            <Select.Option key={id} value={id}>
              <OptionAvatar src={avatar} icon={<UserOutlined />} />
              <span>{nickname}</span>
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
