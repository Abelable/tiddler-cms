import { StarTripModal } from "./components/star-trip-modal";
import { List } from "./components/list";

import styled from "@emotion/styled";
import { useStarTripList } from "service/starTrip";
import { useScenicOptions } from "service/scenic";
import { useHotelOptions } from "service/hotel";
import { toNumber } from "utils";
import { useStarTripListSearchParams } from "./util";

export const StarTripList = () => {
  const [params, setParams] = useStarTripListSearchParams();
  const { isLoading, error, data } = useStarTripList(params);
  const { data: scenicOptions = [], error: scenicOptionsError } =
    useScenicOptions();
  const { data: hotelOptions = [], error: hotelOptionsError } =
    useHotelOptions();

  return (
    <Container>
      <Main>
        <List
          params={params}
          setParams={setParams}
          error={error || scenicOptionsError || hotelOptionsError}
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
      <StarTripModal
        scenicOptions={scenicOptions}
        hotelOptions={hotelOptions}
      />
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
