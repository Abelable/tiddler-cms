import { HotScenicModal } from "./components/hot-scenic-modal";
import { List } from "./components/list";

import styled from "@emotion/styled";
import { useHotScenicList } from "service/hotScenic";
import { toNumber } from "utils";
import { useHotScenicListSearchParams } from "./util";
import { useScenicOptions } from "service/scenic";

export const HotScenicList = () => {
  const [params, setParams] = useHotScenicListSearchParams();
  const { isLoading, error, data } = useHotScenicList(params);
  const { data: scenicOptions = [], error: scenicOptionsError } =
    useScenicOptions();

  return (
    <Container>
      <Main>
        <List
          params={params}
          setParams={setParams}
          error={error || scenicOptionsError}
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
      <HotScenicModal scenicOptions={scenicOptions} />
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
