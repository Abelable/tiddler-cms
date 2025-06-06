import styled from "@emotion/styled";
import { toNumber } from "utils";
import { useGiftTypeListSearchParams } from "./util";
import { useGiftTypeList } from "service/giftType";

import { List } from "./components/list";
import { GiftTypeModal } from "./components/activity-tag-modal";

export const GiftTypeList = () => {
  const [params, setParams] = useGiftTypeListSearchParams();
  const { isLoading, error, data } = useGiftTypeList(params);

  return (
    <Container>
      <Main>
        <List
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
          bordered
        />
      </Main>
      <GiftTypeModal />
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
