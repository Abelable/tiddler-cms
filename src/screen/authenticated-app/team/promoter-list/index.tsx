import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";

import styled from "@emotion/styled";
import { usePromoterList } from "service/promoter";
import { toNumber } from "utils";
import { usePromoterListSearchParams } from "./util";
import { useUserNormalOptions } from "service/user";
import { PromoterModal } from "./components/promoter-modal";

const levelOptions = [
  { text: "家乡代言人Lv.1", value: 1, scene: 100 },
  { text: "家乡代言人Lv.2", value: 2, scene: 201 },
  { text: "家乡代言人Lv.3", value: 3, scene: 202 },
  { text: "家乡代言人Lv.4", value: 4, scene: 203 },
];
const pathOptions = [
  { text: "管理后台添加", value: 1 },
  { text: "选购好物", value: 2 },
];

export const PromoterList = () => {
  const [params, setParams] = usePromoterListSearchParams();
  const { isLoading, error, data } = usePromoterList(params);
  const { data: userOptions = [], error: userOptionsError } =
    useUserNormalOptions();

  return (
    <Container>
      <Main>
        <SearchPanel
          levelOptions={levelOptions}
          pathOptions={pathOptions}
          params={params}
          setParams={setParams}
        />
        <List
          levelOptions={levelOptions}
          pathOptions={pathOptions}
          params={params}
          setParams={setParams}
          error={error || userOptionsError}
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

      <PromoterModal userOptions={userOptions} levelOptions={levelOptions} />
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
