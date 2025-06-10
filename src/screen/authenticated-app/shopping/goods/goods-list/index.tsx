import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { GoodsModal } from "./components/goods-modal";
import { DetailModal } from "./components/detail-modal";
import { RejectModal } from "./components/reject-modal";

import styled from "@emotion/styled";
import { useFreightTemplateOptions } from "service/freightTemplate";
import { useShopOptions } from "service/shop";
import { useGoodsCategoryOptions } from "service/goodsCategory";
import { useShopCategoryOptions } from "service/shopCategory";
import { useGoodsList } from "service/goods";
import { toNumber } from "utils";
import { useGoodsListSearchParams } from "./util";
import { useRefundAddressOptions } from "service/refundAddress";
import { usePickupAddressOptions } from "service/pickupAddress";

const statusOptions = [
  { text: "待审核", value: 0 },
  { text: "售卖中", value: 1 },
  { text: "未过审", value: 2 },
];

export const GoodsList = () => {
  const [params, setParams] = useGoodsListSearchParams();
  const { isLoading, error, data } = useGoodsList(params);
  const { data: shopCategoryOptions, error: shopCategoryOptionsError } =
    useShopCategoryOptions();

  const { data: goodsCategoryOptions, error: goodsCategoryOptionsError } =
    useGoodsCategoryOptions();

  const { data: originalShopOptions = [], error: shopOptionsError } =
    useShopOptions();
  const shopOptions = [{ id: 0, name: "官方自营" }, ...originalShopOptions];

  const {
    data: originalFreightTemplateOptions = [],
    error: freightTemplateOptionsError,
  } = useFreightTemplateOptions();
  const freightTemplateOptions = [
    { id: 0, name: "全国包邮" },
    ...originalFreightTemplateOptions,
  ];
  const { data: pickupAddressOptions = [], error: pickupAddressOptionsError } =
    usePickupAddressOptions();
  const { data: refundAddressOptions = [], error: refundAddressOptionsError } =
    useRefundAddressOptions();

  return (
    <Container>
      <Main>
        <SearchPanel
          statusOptions={statusOptions}
          shopCategoryOptions={shopCategoryOptions || []}
          goodsCategoryOptions={goodsCategoryOptions || []}
          shopOptions={shopOptions}
          params={params}
          setParams={setParams}
        />
        <List
          statusOptions={statusOptions}
          shopCategoryOptions={shopCategoryOptions || []}
          goodsCategoryOptions={goodsCategoryOptions || []}
          shopOptions={shopOptions}
          params={params}
          setParams={setParams}
          error={
            error ||
            goodsCategoryOptionsError ||
            shopCategoryOptionsError ||
            freightTemplateOptionsError ||
            pickupAddressOptionsError ||
            refundAddressOptionsError ||
            shopOptionsError
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
      <GoodsModal
        shopCategoryOptions={shopCategoryOptions || []}
        goodsCategoryOptions={goodsCategoryOptions || []}
        freightTemplateOptions={freightTemplateOptions}
        pickupAddressOptions={pickupAddressOptions}
        refundAddressOptions={refundAddressOptions}
      />
      <DetailModal
        shopCategoryOptions={shopCategoryOptions || []}
        goodsCategoryOptions={goodsCategoryOptions || []}
      />
      <RejectModal />
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
