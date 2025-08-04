import { NightTripModal } from "./components/night-trip-modal";
import { List } from "./components/list";

import styled from "@emotion/styled";
import { useNightTripList } from "service/nightTrip";
import { toNumber } from "utils";
import { useNightTripListSearchParams } from "./util";
import { useScenicOptions } from "service/scenic";

export const NightTripList = () => {
  const [params, setParams] = useNightTripListSearchParams();
  const { isLoading, error, data } = useNightTripList(params);
  const { data: scenicOptions = [], error: scenicOptionsError } =
    useScenicOptions();

  return (
    <Container>
      <Main>
        <List
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
      <NightTripModal scenicOptions={scenicOptions} />
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
