import { TourismNoteModal } from "./components/tourism-note-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";

import styled from "@emotion/styled";
import { useUserOptions } from "service/user";
import { useScenicOptions } from "service/scenic";
import { useHotelOptions } from "service/hotel";
import { useRestaurantOptions } from "service/restaurant";
import { useGoodsOptions } from "service/goods";
import { useTourismNoteList } from "service/tourismNote";
import { toNumber } from "utils";
import { useTourismNoteListSearchParams } from "./util";

export const TourismNoteList = () => {
  const { data: userOptions = [], error: userOptionsError } = useUserOptions();
  const { data: scenicOptions = [], error: scenicOptionsError } =
    useScenicOptions();
  const { data: hotelOptions = [], error: hotelOptionsError } =
    useHotelOptions();
  const { data: restaurantOptions = [], error: restaurantOptionsError } =
    useRestaurantOptions();
  const { data: goodsOptions = [], error: goodsOptionsError } =
    useGoodsOptions();

  const [params, setParams] = useTourismNoteListSearchParams();
  const { isLoading, error, data } = useTourismNoteList(params);

  return (
    <Container>
      <Main>
        <SearchPanel
          userOptions={userOptions}
          scenicOptions={scenicOptions}
          hotelOptions={hotelOptions}
          restaurantOptions={restaurantOptions}
          goodsOptions={goodsOptions}
          params={params}
          setParams={setParams}
        />
        <List
          userOptions={userOptions}
          scenicOptions={scenicOptions}
          hotelOptions={hotelOptions}
          restaurantOptions={restaurantOptions}
          goodsOptions={goodsOptions}
          params={params}
          setParams={setParams}
          error={
            error ||
            userOptionsError ||
            scenicOptionsError ||
            hotelOptionsError ||
            restaurantOptionsError ||
            goodsOptionsError
          }
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
      <TourismNoteModal
        userOptions={userOptions}
        scenicOptions={scenicOptions}
        hotelOptions={hotelOptions}
        restaurantOptions={restaurantOptions}
        goodsOptions={goodsOptions}
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
