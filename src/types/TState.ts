import { TUser } from "./TUser";

export type TState = {
  users: TUser[];
  filterTerm: string;
  userModalMode: "add" | "edit";
  selectedUserId: string;
  isVisibleAddUserModal: boolean;
  isVisibleEditUserModal: boolean;
  isVisibleRemoveUserModal: boolean;
};
