import { LakeTripModal } from "./components/lake-trip-modal";
import { List } from "./components/list";

import styled from "@emotion/styled";
import { useLakeTripList } from "service/lakeTrip";
import { toNumber } from "utils";
import { useLakeTripListSearchParams } from "./util";
import { useScenicOptions } from "service/scenic";

const lakeOptions = [
  { id: 1, name: "中心湖区" },
  { id: 2, name: "东南湖区" },
  { id: 3, name: "西南湖区" },
  { id: 4, name: "城中湖" },
];

export const LakeTripList = () => {
  const [params, setParams] = useLakeTripListSearchParams();
  const { isLoading, error, data } = useLakeTripList(params);
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
      <LakeTripModal lakeOptions={lakeOptions} scenicOptions={scenicOptions} />
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
