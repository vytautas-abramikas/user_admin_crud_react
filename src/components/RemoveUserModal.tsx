import { useUserContext } from "../hooks/useUserContext";

export const RemoveUserModal = () => {
  const { users, selectedUserId, deleteUser, hideRemoveUserModal } =
    useUserContext();

  return (
    <>
      <div
        id="confirmRemoveUserModal"
        className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center"
      >
        <div className="bg-white p-8 rounded-lg shadow-2xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Confirm Remove User
          </h2>
          <p className="text-gray-700 mb-6">
            Are you sure you want to remove the user "
            {users?.find((user) => user?.id === selectedUserId)?.username}"?
          </p>
          <div className="flex justify-between">
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition duration-300"
              onClick={hideRemoveUserModal}
            >
              No
            </button>
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition duration-300"
              onClick={() => deleteUser(selectedUserId)}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
