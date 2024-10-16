import {
  createContext,
  useReducer,
  ReactNode,
  useEffect,
  useMemo,
} from "react";
import axios from "axios";
import { TUser } from "../types/TUser";
import { TState } from "../types/TState";
import { TAction } from "../types/TAction";

const initialState: TState = {
  users: [],
  filterTerm: "",
  userModalMode: "add",
  selectedUserId: "",
  isVisibleAddUserModal: false,
  isVisibleEditUserModal: false,
  isVisibleRemoveUserModal: false,
};

export const UserContext = createContext<{
  state: TState;
  filteredUsers: TUser[];
  setFilterTerm: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  setUserModalMode: (mode: "add" | "edit") => void;
  setSelectedUserId: (id: string) => void;
  addUser: (user: TUser) => void;
  updateUser: (user: TUser) => void;
  deleteUser: (id: string) => void;
  setModalVisibility: (
    modal: "add" | "edit" | "remove",
    visibility: boolean
  ) => void;
}>({
  state: initialState,
  filteredUsers: [],
  setFilterTerm: () => null,
  setUserModalMode: () => null,
  setSelectedUserId: () => null,
  addUser: () => null,
  updateUser: () => null,
  deleteUser: () => null,
  setModalVisibility: () => null,
});

const userReducer = (state: TState, action: TAction): TState => {
  switch (action.type) {
    case "SET_FILTER_TERM":
      return { ...state, filterTerm: action.payload };
    case "SET_USER_MODAL_MODE":
      return { ...state, userModalMode: action.payload };
    case "SET_SELECTED_USER_ID":
      return { ...state, selectedUserId: action.payload };
    case "ADD_USER":
      return { ...state, users: [...state.users, action.payload] };
    case "UPDATE_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    case "SET_USERS":
      return { ...state, users: action.payload };
    case "SET_MODAL_VISIBILITY":
      switch (action.payload.modal) {
        case "add":
          return { ...state, isVisibleAddUserModal: action.payload.visibility };
        case "edit":
          return {
            ...state,
            isVisibleEditUserModal: action.payload.visibility,
          };
        case "remove":
          return {
            ...state,
            isVisibleRemoveUserModal: action.payload.visibility,
          };
        default:
          return state;
      }

    default:
      return state;
  }
};

export const UserContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    axios
      .get("http://localhost:3001/users")
      .then((response) => {
        dispatch({ type: "SET_USERS", payload: response.data });
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const addUser = (user: TUser) => {
    axios
      .post("http://localhost:3001/users", user)
      .then((response) => {
        dispatch({ type: "ADD_USER", payload: response.data });
        setModalVisibility("add", false);
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });
  };

  const updateUser = (user: TUser) => {
    axios
      .put(`http://localhost:3001/users/${user.id}`, user)
      .then((response) => {
        dispatch({ type: "UPDATE_USER", payload: response.data });
        setModalVisibility("edit", false);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  const deleteUser = (id: string) => {
    axios
      .delete(`http://localhost:3001/users/${id}`)
      .then(() => {
        dispatch({ type: "DELETE_USER", payload: id });
        setModalVisibility("remove", false);
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const filteredUsers = useMemo(() => {
    const filterTerm = state.filterTerm.toLowerCase();

    if (filterTerm === "") {
      return state.users;
    } else {
      return state.users.filter(
        (user) =>
          user.name.toLowerCase().includes(filterTerm) ||
          user.username.toLowerCase().includes(filterTerm) ||
          user.email.toLowerCase().includes(filterTerm) ||
          user.role.toLowerCase().includes(filterTerm)
      );
    }
  }, [state.users, state.filterTerm]);

  const setFilterTerm = (e: React.KeyboardEvent<HTMLInputElement>) =>
    dispatch({ type: "SET_FILTER_TERM", payload: e.currentTarget.value });

  const setUserModalMode = (mode: "add" | "edit") =>
    dispatch({ type: "SET_USER_MODAL_MODE", payload: mode });

  const setSelectedUserId = (id: string) =>
    dispatch({ type: "SET_SELECTED_USER_ID", payload: id });

  const setModalVisibility = (
    modal: "add" | "edit" | "remove",
    visibility: boolean
  ) =>
    dispatch({ type: "SET_MODAL_VISIBILITY", payload: { modal, visibility } });

  return (
    <UserContext.Provider
      value={{
        state,
        filteredUsers,
        setFilterTerm,
        setUserModalMode,
        setSelectedUserId,
        addUser,
        updateUser,
        deleteUser,
        setModalVisibility,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
