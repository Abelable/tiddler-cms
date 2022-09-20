import { Drawer } from "antd";
import { ErrorBox, ModalLoading } from "components/lib";
import { useUserModal } from "../util";

export const UserModal = () => {
  const { close, userModalOpen, error, isLoading } = useUserModal();
  return (
    <Drawer
      forceRender={true}
      title="用户详情"
      size={"large"}
      onClose={close}
      open={userModalOpen}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <ErrorBox error={error} />
      {isLoading ? <ModalLoading /> : <></>}
    </Drawer>
  );
};
