import styled from "@emotion/styled";
import { useMerchants } from "service/hotelMerchant";
import { toNumber } from "utils";
import { useMerchantsSearchParams } from "./util";

import { MerchantModal } from "./components/merchant-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { RejectModal } from "./components/reject-modal";

const statusOptions = [
  { text: "待审核", value: 0 },
  { text: "待支付保证金", value: 1 },
  { text: "入驻成功", value: 2 },
  { text: "已驳回", value: 3 },
];

export const HotelMarchantList = () => {
  const [params, setParams] = useMerchantsSearchParams();
  const { isLoading, error, data } = useMerchants(params);

  return (
    <Container>
      <Main>
        <SearchPanel
          statusOptions={statusOptions}
          params={params}
          setParams={setParams}
        />
        <List
          statusOptions={statusOptions}
          params={params}
          setParams={setParams}
          error={error}
          loading={isLoading}
          dataSource={data?.list}
          pagination={{
            current: toNumber(data?.page) || 1 || 1,
            pageSize: toNumber(data?.limit),
            total: toNumber(data?.total),
          }}
          bordered
        />
      </Main>
      <MerchantModal />
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
