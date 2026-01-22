import styled from "@emotion/styled";

import { useCommissionWithdrawList } from "service/commissionWithdraw";
import { toNumber } from "utils";
import { useCommissionWithdrawListSearchParams } from "./util";

import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { RejectModal } from "./components/reject-modal";
import { usePromoterOptions } from "service/promoter";

const statusOptions = [
  { text: "待审核", value: 0 },
  { text: "已提现", value: 1 },
  { text: "已驳回", value: 2 },
];
const sceneOptions = [
  { text: "自购奖励", value: 1 },
  { text: "分享奖励", value: 2 },
  { text: "团队奖励", value: 3 },
];
const pathOptions = [
  { text: "微信", value: 1 },
  { text: "银行卡", value: 2 },
  { text: "余额", value: 3 },
];

export const CommissionWithdrawList = () => {
  const { data: userOptions = [], error: promoterError } = usePromoterOptions();
  const [params, setParams] = useCommissionWithdrawListSearchParams();
  const { isLoading, error, data } = useCommissionWithdrawList(params);

  return (
    <Container>
      <Main>
        <SearchPanel
          statusOptions={statusOptions}
          sceneOptions={sceneOptions}
          pathOptions={pathOptions}
          userOptions={userOptions}
          params={params}
          setParams={setParams}
        />
        <List
          statusOptions={statusOptions}
          sceneOptions={sceneOptions}
          pathOptions={pathOptions}
          params={params}
          setParams={setParams}
          error={error || promoterError}
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
