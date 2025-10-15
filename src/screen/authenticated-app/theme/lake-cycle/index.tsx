import { LakeCycleModal } from "./components/lake-cycle-modal";
import { List } from "./components/list";

import styled from "@emotion/styled";
import { useLakeCycleList } from "service/lakeCycle";
import { toNumber } from "utils";
import { useLakeCycleListSearchParams } from "./util";
import { useScenicOptions } from "service/scenic";

const lakeOptions = [
  { id: 1, name: "环东北湖区路线" },
  { id: 2, name: "千汾线" },
  { id: 3, name: "淳杨线" },
];

export const LakeCycleList = () => {
  const [params, setParams] = useLakeCycleListSearchParams();
  const { isLoading, error, data } = useLakeCycleList(params);
  const { data: scenicOptions = [], error: scenicOptionsError } =
    useScenicOptions();

  return (
    <Container>
      <Main>
        <List
          lakeOptions={lakeOptions}
          params={params}
          setParams={setParams}
          error={error || scenicOptionsError}
          loading={isLoading}
          dataSource={data?.list}
          pagination={{
            current: toNumber(data?.page) || 1,
            pageSize: toNumber(data?.limit),
            total: toNumber(data?.total),
          }}
          bordered
        />
      </Main>
      <LakeCycleModal lakeOptions={lakeOptions} scenicOptions={scenicOptions} />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 100%;
`;

const Main = styled.div`
  padding: 2.4rem;
  height: 100%;
  overflow: scroll;
`;
