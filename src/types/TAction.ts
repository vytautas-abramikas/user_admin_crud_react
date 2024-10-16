import { TUser } from "./TUser";

export type TAction =
  | { type: "SET_FILTER_TERM"; payload: string }
  | { type: "SET_USER_MODAL_MODE"; payload: "add" | "edit" }
  | { type: "SET_SELECTED_USER_ID"; payload: string }
  | { type: "ADD_USER"; payload: TUser }
  | { type: "UPDATE_USER"; payload: TUser }
  | { type: "DELETE_USER"; payload: string }
  | { type: "SET_USERS"; payload: TUser[] }
  | {
      type: "SET_MODAL_VISIBILITY";
      payload: { modal: "add" | "edit" | "remove"; visibility: boolean };
    };
