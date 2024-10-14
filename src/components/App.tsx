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
      <div className="bg-gradient-to-r from-blue-100 to-purple-100 min-h-screen p-6">
        <div className="container mx-auto bg-white shadow-lg rounded-lg p-6">
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
