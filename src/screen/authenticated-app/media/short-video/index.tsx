import styled from "@emotion/styled";

import { useShortVideoList } from "service/shortVideo";
import { toNumber } from "utils";
import { useShortVideoListSearchParams } from "./util";

import { ShortVideoModal } from "./components/short-video-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { useUserOptions } from "service/user";

export const ShortVideoList = () => {
  const { data: userOptions = [], error: userOptionsError } = useUserOptions();
  const [params, setParams] = useShortVideoListSearchParams();
  const { isLoading, error, data } = useShortVideoList(params);

  return (
    <Container>
      <Main>
        <SearchPanel
          userOptions={userOptions}
          params={params}
          setParams={setParams}
        />
        <List
          userOptions={userOptions}
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
        />
      </Main>
      <ShortVideoModal userOptions={userOptions} />
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
