import { MediaModal } from "./components/media-modal";
import { List } from "./components/list";

import styled from "@emotion/styled";
import { useShortVideoOptions } from "service/shortVideo";
import { useTourismNoteOptions } from "service/tourismNote";
import { useLakeCycleMediaList } from "service/lakeCycleMedia";
import { toNumber } from "utils";
import { useLakeCycleMediaListSearchParams } from "./util";

export const LakeCycleMediaList = () => {
  const { data: shortVideoOptions = [], error: shortVideoOptionsError } =
    useShortVideoOptions();
  const { data: tourismNoteOptions = [], error: tourismNoteOptionsError } =
    useTourismNoteOptions();

  const [params, setParams] = useLakeCycleMediaListSearchParams();
  const { isLoading, error, data } = useLakeCycleMediaList(params);

  return (
    <Container>
      <Main>
        <List
          params={params}
          setParams={setParams}
          error={error || shortVideoOptionsError || tourismNoteOptionsError}
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
      <MediaModal
        shortVideoOptions={shortVideoOptions}
        tourismNoteOptions={tourismNoteOptions}
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
