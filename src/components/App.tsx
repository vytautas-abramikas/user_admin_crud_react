import { Header } from "./Header";
import { UsersTable } from "./UsersTable";
import { UserModal } from "./UserModal";
import { RemoveUserModal } from "./RemoveUserModal";
import { useUserContext } from "../hooks/useUserContext";

export const App = () => {
  const {
    isVisibleAddUserModal,
    isVisibleEditUserModal,
    isVisibleRemoveUserModal,
  } = useUserContext();

  return (
    <>
      <div className="lg:bg-gradient-to-r from-blue-100 to-purple-100 lg:min-h-screen lg:p-6">
        <div className="lg:container lg:mx-auto bg-white lg:shadow-lg lg:rounded-lg p-6">
          <Header />
          <UsersTable />
          {isVisibleAddUserModal && <UserModal />}
          {isVisibleEditUserModal && <UserModal />}
          {isVisibleRemoveUserModal && <RemoveUserModal />}
        </div>
      </div>
    </>
  );
};
