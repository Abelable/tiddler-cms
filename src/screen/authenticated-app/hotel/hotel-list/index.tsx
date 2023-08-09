import styled from "@emotion/styled";

import { useScenicCategoryOptions } from "service/scenicCategory";
import { useScenicList } from "service/scenic";
import { toNumber } from "utils";
import { useScenicListSearchParams } from "./util";

import { ScenicModal } from "./components/scenic-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { RejectModal } from "./components/reject-modal";

export const ScenicList = () => {
  const [params, setParams] = useScenicListSearchParams();
  const { isLoading, error, data } = useScenicList(params);
  const { data: scenicCategoryOptions, error: scenicOptionsError } =
    useScenicCategoryOptions();
  const statusOptions = [
    { text: "待审核", value: 0 },
    { text: "开放中", value: 1 },
    { text: "未过审", value: 2 },
  ];

  return (
    <Container>
      <Main>
        <SearchPanel
          categoryOptions={scenicCategoryOptions || []}
          statusOptions={statusOptions}
          params={params}
          setParams={setParams}
        />
        <List
          categoryOptions={scenicCategoryOptions || []}
          statusOptions={statusOptions}
          params={params}
          setParams={setParams}
          error={error || scenicOptionsError}
          loading={isLoading}
          dataSource={data?.list}
          pagination={{
            current: toNumber(data?.page),
            pageSize: toNumber(data?.limit),
            total: toNumber(data?.total),
          }}
        />
      </Main>
      <ScenicModal categoryOptions={scenicCategoryOptions || []} />
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
