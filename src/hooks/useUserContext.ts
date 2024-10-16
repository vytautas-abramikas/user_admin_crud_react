import { useContext } from "react";
import { UserContext } from "../contexts/UserContextProvider";

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  const {
    state,
    filteredUsers,
    setFilterTerm,
    setUserModalMode,
    setSelectedUserId,
    addUser,
    updateUser,
    deleteUser,
    setModalVisibility,
  } = context;

  return {
    userModalMode: state.userModalMode,
    selectedUserId: state.selectedUserId,
    isVisibleAddUserModal: state.isVisibleAddUserModal,
    isVisibleEditUserModal: state.isVisibleEditUserModal,
    isVisibleRemoveUserModal: state.isVisibleRemoveUserModal,
    users: filteredUsers,
    setFilterTerm,
    setUserModalMode,
    setSelectedUserId,
    addUser,
    updateUser,
    deleteUser,
    setModalVisibility,
  };
};
