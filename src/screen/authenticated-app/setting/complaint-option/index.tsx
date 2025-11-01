import styled from "@emotion/styled";
import { useComplaintOptionList } from "service/complaintOption";
import { toNumber } from "utils";
import { List } from "./components/list";
import { ComplaintOptionModal } from "./components/complaint-option-modal";
import { useComplaintOptionListSearchParams } from "./util";
import { SearchPanel } from "./components/search-panel";

const typeOptions = [
  { text: "投诉景点", value: 1 },
  { text: "投诉酒店", value: 2 },
  { text: "投诉餐饮门店", value: 3 },
  { text: "投诉商品", value: 4 },
  { text: "投诉家乡代言人", value: 5 },
];

export const ComplaintOptionList = () => {
  const [params, setParams] = useComplaintOptionListSearchParams();
  const { isLoading, error, data } = useComplaintOptionList(params);

  return (
    <Container>
      <Main>
        <SearchPanel
          typeOptions={typeOptions}
          params={params}
          setParams={setParams}
        />
        <List
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
          bordered
        />
      </Main>
      <ComplaintOptionModal typeOptions={typeOptions} />
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
