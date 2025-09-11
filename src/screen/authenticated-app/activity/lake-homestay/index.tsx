import { LakeHomestayModal } from "./components/homestay-modal";
import { List } from "./components/list";

import styled from "@emotion/styled";
import { useLakeHomestayList } from "service/lakeHomestay";
import { toNumber } from "utils";
import { useLakeHomestayListSearchParams } from "./util";
import { useHomestayOptions } from "service/hotel";

export const LakeHomestayList = () => {
  const [params, setParams] = useLakeHomestayListSearchParams();
  const { isLoading, error, data } = useLakeHomestayList(params);
  const { data: homestayOptions = [], error: homestayOptionsError } =
    useHomestayOptions();

  return (
    <Container>
      <Main>
        <List
          params={params}
          setParams={setParams}
          error={error || homestayOptionsError}
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
      <LakeHomestayModal homestayOptions={homestayOptions} />
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
