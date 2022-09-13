import { useState } from "react";
import { Button, DatePicker, Divider, Select } from "antd";
import { Row } from "components/lib";
import { HomeSearchParams } from "types/home";
import moment from "moment";
import styled from "@emotion/styled";
import { AgentOption } from "types/agent";
import dayjs from "dayjs";
import { useExportHome } from "service/home";
import { GoodsOption } from "types/product";
export interface SearchPanelProps {
  agentOptions: AgentOption[];
  goodsOptions: GoodsOption[];
  params: Partial<HomeSearchParams>;
  setParams: (params: Partial<HomeSearchParams>) => void;
}

export const SearchPanel = ({
  agentOptions,
  goodsOptions,
  params,
  setParams,
}: SearchPanelProps) => {
  const date = new Date();
  date.setDate(date.getDate() - 6);
  const defaultParams = {
    start_created_at: dayjs(date).format("YYYY-MM-DD"),
    end_created_at: dayjs().format("YYYY-MM-DD"),
    agent_id: undefined,
    goods_id: undefined,
  } as Partial<HomeSearchParams>;

  const [temporaryParams, setTemporaryParams] =
    useState<Partial<HomeSearchParams>>(defaultParams);

  const exportHome = useExportHome();
  const [dates, setDates] = useState<any[]>([]);
  const disabledDate = (current: any) => {
    if (!dates || dates.length === 0) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], "days") > 29;
    const tooEarly = dates[1] && dates[1].diff(current, "days") > 29;
    return tooEarly || tooLate;
  };
  const setDateRange = (dates: any, formatString: [string, string]) =>
    setTemporaryParams({
      ...temporaryParams,
      start_created_at: formatString[0],
      end_created_at: formatString[1],
    });

  const setAgent = (agent_id: number) =>
    setTemporaryParams({ ...temporaryParams, agent_id });
  const clearAgent = () =>
    setTemporaryParams({ ...temporaryParams, agent_id: undefined });

  const setGoods = (goods_id: number) =>
    setTemporaryParams({ ...temporaryParams, goods_id });
  const clearGoods = () =>
    setTemporaryParams({ ...temporaryParams, goods_id: undefined });

  const clear = () => {
    setParams({ ...params, ...defaultParams });
    setTemporaryParams({ ...temporaryParams, ...defaultParams });
  };

  const query = () => {
    setParams({
      ...params,
      start_created_at:
        temporaryParams.start_created_at || defaultParams.start_created_at,
      end_created_at:
        temporaryParams.end_created_at || defaultParams.end_created_at,
      agent_id: temporaryParams.agent_id,
      goods_id: temporaryParams.goods_id,
    });
    if (!temporaryParams.start_created_at) {
      setTemporaryParams({
        ...temporaryParams,
        start_created_at: defaultParams.start_created_at,
        end_created_at: defaultParams.end_created_at,
      });
    }
  };

  return (
    <Container>
      <Item>
        <div>注册时间：</div>
        <DatePicker.RangePicker
          disabledDate={disabledDate}
          onCalendarChange={(val) => setDates(val as any)}
          value={
            temporaryParams.start_created_at
              ? [
                  moment(temporaryParams.start_created_at),
                  moment(temporaryParams.end_created_at),
                ]
              : undefined
          }
          onChange={setDateRange}
        />
      </Item>
      <Item>
        <div>代理商店铺：</div>
        <Select
          style={{ width: "20rem" }}
          value={temporaryParams.agent_id}
          allowClear={true}
          onSelect={setAgent}
          onClear={clearAgent}
          showSearch
          filterOption={(input, option) =>
            (option!.children as unknown as string)
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          placeholder="请选择代理商"
        >
          {agentOptions.map(({ id, name }) => (
            <Select.Option key={id} value={id}>
              {name}
            </Select.Option>
          ))}
        </Select>
      </Item>
      <Item>
        <div>商品名称：</div>
        <Select
          style={{ width: "20rem" }}
          value={temporaryParams.goods_id}
          allowClear={true}
          onSelect={setGoods}
          onClear={clearGoods}
          showSearch
          filterOption={(input, option) =>
            (option!.children as unknown as string)
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          placeholder="请选择商品"
        >
          {goodsOptions.map(({ id, name }) => (
            <Select.Option key={id} value={id}>
              {name}
            </Select.Option>
          ))}
        </Select>
      </Item>
      <ButtonWrap gap={true}>
        <Button onClick={clear}>重置</Button>
        <Button type={"primary"} onClick={query}>
          查询
        </Button>
        <Divider style={{ height: "3rem", marginLeft: 0 }} type={"vertical"} />
        <Button
          style={{ marginRight: 0 }}
          type={"primary"}
          onClick={() => exportHome(params)}
        >
          导出
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
  padding: 2.4rem 22rem 0 2.4rem;
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
