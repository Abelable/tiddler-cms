import styled from "@emotion/styled";
import { Button, Spin, Typography, Avatar } from "antd";

export const ButtonNoPadding = styled(Button)`
  padding: 0;
`;

export const LongButton = styled(Button)`
  width: 100%;
`;

// 类型守卫
const isError = (value: any): value is Error => value?.message;
export const ErrorBox = ({ error }: { error: unknown }) => {
  if (isError(error)) {
    return <Typography.Text type="danger">{error.message}</Typography.Text>;
  }
  return null;
};

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FullPageLoading = () => (
  <FullPage>
    <Spin size="large" />
  </FullPage>
);

const ModalLoadingWarp = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalLoading = () => (
  <ModalLoadingWarp>
    <Spin size={"large"} />
  </ModalLoadingWarp>
);

export const FullPageErrorFallback = ({ error }: { error: Error | null }) => (
  <FullPage>
    <ErrorBox error={error} />
  </FullPage>
);

export const ScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3.2rem;
  width: 100%;
`;

export const Row = styled.div<{
  gap?: number | boolean;
  between?: boolean;
  flexWrap?: boolean;
  marginBottom?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.between ? "space-between" : undefined)};
  flex-wrap: ${(props) => (props.flexWrap ? "wrap" : undefined)};
  margin-bottom: ${(props) => props.marginBottom + "rem"};
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
      typeof props.gap === "number"
        ? props.gap + "rem"
        : props.gap
        ? "2rem"
        : undefined};
  }
`;

export const PageTitle = styled.div`
  position: relative;
  margin: 4.8rem 0 2.4rem;
  padding-left: 1rem;
  height: 1.6rem;
  font-size: 1.6rem;
  font-weight: bold;
  line-height: 1;
  &::after {
    position: absolute;
    left: 0;
    content: "";
    width: 0.4rem;
    height: 1.6rem;
    background: #1890ff;
  }
  &:first-of-type {
    margin-top: 0;
  }
`;

export const OptionAvatar = styled(Avatar)`
  margin-right: 0.6rem;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 0.6rem;
`;

export const OptionCover = styled.img<{
  size?: string;
}>`
  margin-right: 0.6rem;
  width: ${(props) => props.size || "1.8rem"};
  height: ${(props) => props.size || "1.8rem"};
  border-radius: 0.4rem;
`;

// export const Card = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 12px;
//   padding: 6px;
//   border: 1px solid rgba(0, 0, 0, 0.06);
//   border-radius: 8px;
//   :last-child {
//     margin-bottom: 0;
//   }
//   > img {
//     margin-right: 0.6rem;
//     width: 2.4rem;
//     height: 2.4rem;
//     border-radius: 0.6rem;
//   }
//   > div {
//     -webkit-line-clamp: 1;
//     overflow: hidden;
//     text-overflow: ellipsis;
//     display: -webkit-box;
//     -webkit-box-orient: vertical;
//   }
// `;

export const Card = styled.div`
  margin-bottom: 12px;
  padding: 6px;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  :last-child {
    margin-bottom: 0;
  }
`;
