import styled from "@emotion/styled";
import { useCateringProviders } from "service/cateringProvider";
import { toNumber } from "utils";
import { useCateringProvidersSearchParams } from "./util";

import { CateringProviderModal } from "./components/catering-provider-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { RejectModal } from "./components/reject-modal";

const typeOptions = [
  { text: "个体", value: 1 },
  { text: "企业", value: 2 },
];
const statusOptions = [
  { text: "待审核", value: 0 },
  { text: "待支付保证金", value: 1 },
  { text: "入驻成功", value: 2 },
  { text: "已驳回", value: 3 },
];

export const CateringProviderList = () => {
  const [params, setParams] = useCateringProvidersSearchParams();
  const { isLoading, error, data } = useCateringProviders(params);

  return (
    <Container>
      <Main>
        <SearchPanel
          statusOptions={statusOptions}
          typeOptions={typeOptions}
          params={params}
          setParams={setParams}
        />
        <List
          statusOptions={statusOptions}
          typeOptions={typeOptions}
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
      <CateringProviderModal />
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
