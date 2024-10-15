import { useState } from "react";
import { useUserContext } from "../hooks/useUserContext";
import { TUser } from "../types/TUser";

export const UserModal = () => {
  const {
    users,
    userModalMode,
    selectedUserId,
    addUser,
    updateUser,
    hideAddUserModal,
    hideEditUserModal,
  } = useUserContext();

  const emptyUser: TUser = {
    id: "",
    username: "",
    name: "",
    email: "",
    role: "User",
  };

  const userData: TUser =
    userModalMode === "add"
      ? emptyUser
      : users.find((user) => user.id === selectedUserId) || emptyUser;

  const [userState, setUserState] = useState<TUser>(userData);
  const [errors, setErrors] = useState({ username: "", name: "", email: "" });

  const validate = () => {
    const newErrors = { username: "", name: "", email: "" };
    if (userState.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long";
    }
    if (userState.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters long";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userState.email)) {
      newErrors.email = "Email is not valid";
    }
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleHideUserModal = (mode: "add" | "edit") => {
    if (mode === "add") {
      hideAddUserModal();
    } else {
      hideEditUserModal();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      if (userModalMode === "add") {
        const userToAdd = { ...userState, id: String(Date.now()) };
        addUser(userToAdd);
      } else {
        updateUser(userState);
      }
    }
  };

  return (
    <>
      <div
        id={userModalMode === "add" ? "addUserModal" : "editUserModal"}
        className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center"
      >
        <div className="bg-white p-8 rounded-lg shadow-2xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {userModalMode === "add" ? "Add User" : "Edit User"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                className="block text-gray-700 font-semibold mb-2 after:content-['*'] after:text-red-500"
                htmlFor="input_username"
              >
                Username
              </label>
              <div className="relative group">
                <input
                  id="input_username"
                  value={userState.username}
                  onChange={(e) =>
                    setUserState((p) => ({ ...p, username: e.target.value }))
                  }
                  type="text"
                  className={`w-full px-4 py-2 border ${
                    errors.username ? "border-red-500" : "border-gray-300"
                  } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
                  placeholder="Enter username"
                />
                {errors.username && (
                  <div className="absolute z-10 opacity-85 left-0 top-full mt-1 hidden group-hover:block bg-white border border-red-500 text-red-500 text-sm p-2 rounded-lg shadow-lg">
                    {errors.username}
                  </div>
                )}
              </div>
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 font-semibold mb-2 after:content-['*'] after:text-red-500"
                htmlFor="input_name"
              >
                Name
              </label>
              <div className="relative group">
                <input
                  id="input_name"
                  value={userState.name}
                  onChange={(e) =>
                    setUserState((p) => ({ ...p, name: e.target.value }))
                  }
                  type="text"
                  className={`w-full px-4 py-2 border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
                  placeholder="Enter name"
                />
                {errors.name && (
                  <div className="absolute z-10 opacity-85 left-0 top-full mt-1 hidden group-hover:block bg-white border border-red-500 text-red-500 text-sm p-2 rounded-lg shadow-lg">
                    {errors.name}
                  </div>
                )}
              </div>
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 font-semibold mb-2 after:content-['*'] after:text-red-500"
                htmlFor="input_email"
              >
                Email
              </label>
              <div className="relative group">
                <input
                  id="input_email"
                  onChange={(e) =>
                    setUserState((p) => ({ ...p, email: e.target.value }))
                  }
                  value={userState.email}
                  type="text"
                  className={`w-full px-4 py-2 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
                  placeholder="Enter email"
                />
                {errors.email && (
                  <div className="absolute z-10 opacity-85 left-0 top-full mt-1 hidden group-hover:block bg-white border border-red-500 text-red-500 text-sm p-2 rounded-lg shadow-lg">
                    {errors.email}
                  </div>
                )}
              </div>
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 font-semibold mb-2 after:content-['*'] after:text-red-500"
                htmlFor="select_role"
              >
                Role
              </label>
              <select
                id="select_role"
                onChange={(e) =>
                  setUserState((p) => ({
                    ...p,
                    role: e.target.value as "User" | "Administrator",
                  }))
                }
                value={userState.role}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              >
                <option value="User">User</option>
                <option value="Administrator">Administrator</option>
              </select>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition duration-300"
                onClick={() => handleHideUserModal(userModalMode)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition duration-300"
              >
                {userModalMode === "add" ? "Add" : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
