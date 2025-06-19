import styled from "@emotion/styled";

import { useScenicCategoryOptions } from "service/scenicCategory";
import { useScenicList } from "service/scenic";
import { toNumber } from "utils";
import { useScenicListSearchParams } from "./util";

import { ScenicModal } from "./components/scenic-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";

export const ScenicList = () => {
  const [params, setParams] = useScenicListSearchParams();
  const { isLoading, error, data } = useScenicList(params);
  const { data: scenicCategoryOptions, error: scenicCategroryOptionsError } =
    useScenicCategoryOptions();

  return (
    <Container>
      <Main>
        <SearchPanel
          categoryOptions={scenicCategoryOptions || []}
          params={params}
          setParams={setParams}
        />
        <List
          categoryOptions={scenicCategoryOptions || []}
          params={params}
          setParams={setParams}
          error={error || scenicCategroryOptionsError}
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
      <ScenicModal categoryOptions={scenicCategoryOptions || []} />
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
