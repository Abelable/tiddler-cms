import styled from "@emotion/styled";
import { useMallBannerList } from "service/mallBanner";
import { toNumber } from "utils";
import { useMallBannerListSearchParams } from "./util";
import { MallBannerModal } from "./components/banner-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";

const sceneOptions = [
  { text: "H5活动", value: 1 },
  { text: "景点详情", value: 2 },
  { text: "酒店详情", value: 3 },
  { text: "餐饮门店详情", value: 4 },
  { text: "商品详情", value: 5 },
];

export const MallBannerList = () => {
  const [params, setParams] = useMallBannerListSearchParams();
  const { isLoading, error, data } = useMallBannerList(params);

  return (
    <Container>
      <Main>
        <SearchPanel
          sceneOptions={sceneOptions}
          params={params}
          setParams={setParams}
        />
        <List
          sceneOptions={sceneOptions}
          params={params}
          setParams={setParams}
          error={error}
          loading={isLoading}
          dataSource={data?.list}
          pagination={{
            current: toNumber(data?.page) || 1,
            pageSize: toNumber(data?.limit),
            total: toNumber(data?.total),
          }}
        />
      </Main>
      <MallBannerModal sceneOptions={sceneOptions} />
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
