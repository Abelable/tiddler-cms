import { BannerModal } from "./components/banner-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";

import styled from "@emotion/styled";
import { useBannerList } from "service/banner";
import { toNumber } from "utils";
import { useBannerListSearchParams } from "./util";

const positionOptions = [
  { text: "首页弹窗", value: 1, tips: "" },
  { text: "首页头图", value: 2, tips: "图片尺寸：355 * 200" },
  { text: "商城头图", value: 3, tips: "图片尺寸：355 * 180" },
];
const sceneOptions = [
  { text: "景点详情", value: 1 },
  { text: "酒店详情", value: 2 },
  { text: "餐馆详情", value: 3 },
  { text: "商品详情", value: 4 },
  { text: "H5活动", value: 5 },
  { text: "原生页面", value: 6 },
];

export const BannerList = () => {
  const [params, setParams] = useBannerListSearchParams();
  const { isLoading, error, data } = useBannerList(params);

  return (
    <Container>
      <Main>
        <SearchPanel
          positionOptions={positionOptions}
          sceneOptions={sceneOptions}
          params={params}
          setParams={setParams}
        />
        <List
          positionOptions={positionOptions}
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
          bordered
        />
      </Main>
      <BannerModal
        positionOptions={positionOptions}
        sceneOptions={sceneOptions}
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
