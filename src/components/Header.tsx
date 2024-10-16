import { useUserContext } from "../hooks/useUserContext";

export const Header = () => {
  const { setFilterTerm, setUserModalMode, setModalVisibility } =
    useUserContext();

  const handleShowAddUserModal = () => {
    setUserModalMode("add");
    setModalVisibility("add", true);
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        Users' Administration Panel
      </h1>
      <div className="flex justify-between items-center mb-6">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition duration-300"
          onClick={handleShowAddUserModal}
        >
          Add User
        </button>
        <input
          type="text"
          id="searchInput"
          className="border border-gray-300 rounded-lg px-4 py-2 w-1/3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          placeholder="Filter users..."
          onKeyUp={setFilterTerm}
        />
      </div>
    </>
  );
};
