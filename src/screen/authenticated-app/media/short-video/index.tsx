import { ShortVideoModal } from "./components/short-video-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";

import styled from "@emotion/styled";
import { useUserOptions } from "service/user";
import { useScenicOptions } from "service/scenic";
import { useHotelOptions } from "service/hotel";
import { useRestaurantOptions } from "service/restaurant";
import { useGoodsOptions } from "service/goods";
import { useShortVideoList } from "service/shortVideo";
import { toNumber } from "utils";
import { useShortVideoListSearchParams } from "./util";

export const ShortVideoList = () => {
  const { data: userOptions = [], error: userOptionsError } = useUserOptions();
  const { data: scenicOptions = [], error: scenicOptionsError } =
    useScenicOptions();
  const { data: hotelOptions = [], error: hotelOptionsError } =
    useHotelOptions();
  const { data: restaurantOptions = [], error: restaurantOptionsError } =
    useRestaurantOptions();
  const { data: goodsOptions = [], error: goodsOptionsError } =
    useGoodsOptions();

  const [params, setParams] = useShortVideoListSearchParams();
  const { isLoading, error, data } = useShortVideoList(params);

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
        />
      </Main>
      <ShortVideoModal
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
