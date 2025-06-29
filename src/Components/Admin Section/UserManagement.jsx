import { useState, useEffect } from 'react';

function UserManagement() {
  const BASE_URL = "http://localhost:8000/app";
  const token = localStorage.getItem('token');
  const [role, setRole] = useState("All");
  const [usersdata, serusersdata] = useState([]);
  const [searchterm, setSearchterm] = useState("");

  const filteredUsers = usersdata.filter((user) => {
    const lowerSearch = searchterm.toLowerCase();
    return (
      user.name.toLowerCase().includes(lowerSearch) ||
      user.email.toLowerCase().includes(lowerSearch)
    );
  });

  async function getAllusers() {
    try {
      const response = await fetch(`${BASE_URL}/getAllUsers`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responsedata = await response.json();
      if (response.ok) {
        serusersdata(responsedata.users);
      } else {
        console.log("No users found.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    getAllusers();
  }, []);

  async function deleteUser(user) {
    try {
      const response = await fetch(`${BASE_URL}/deleteUser/${user._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responsedata = await response.json();
      if (response.ok) {
        getAllusers();
      } else {
        console.log(responsedata.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function updateUser(user, newrole) {
    try {
      const response = await fetch(`${BASE_URL}/updateUserRole/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: newrole }),
      });

      const responsedata = await response.json();
      if (response.ok) {
        alert("Role updated");
        getAllusers(); // optional: refresh user list after update
      } else {
        console.log(responsedata.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className='w-full px-4 md:px-10 py-6 bg-gray-50 min-h-screen'>
      <div className='bg-white w-full flex flex-col px-5 py-6 gap-6 rounded-lg shadow-lg'>

        {/* Header */}
        <div className='w-full flex flex-col sm:flex-row justify-between items-start sm:items-center px-3 py-3 rounded-lg bg-blue-100'>
          <div className='flex gap-4 items-center'>
            <div className="text-blue-600 text-2xl">👥</div>
            <div className='flex flex-col gap-1'>
              <h1 className='text-xl sm:text-2xl font-semibold text-gray-800'>User Management</h1>
              <p className='text-sm text-gray-600'>Manage user roles and permissions</p>
            </div>
          </div>
          <h1 className='text-sm sm:text-base font-medium text-gray-700 mt-2 sm:mt-0'>Total Users: {usersdata.length}</h1>
        </div>

        {/* Search + Filter */}
        <div className='w-full flex flex-col md:flex-row justify-between items-stretch md:items-center px-3 py-3 gap-4 rounded-lg bg-gray-100'>
          <div className='w-full flex items-center gap-3'>
            <span className='text-blue-500 text-lg'>🔎</span>
            <input
              onChange={(e) => setSearchterm(e.target.value)}
              className='w-full outline-none border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 transition'
              type="text"
              placeholder='Search by name or email'
            />
          </div>

          <select
            className='mt-2 md:mt-0 w-full md:w-1/3 border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="All">All Roles</option>
            <option value="customer">Customer</option>
            <option value="owner">Owner</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* User List */}
        {filteredUsers.length === 0 ? (
          <div className='text-center text-gray-500 py-4'>No Users</div>
        ) : (
          filteredUsers.map((user, index) => (
            <div
              key={index}
              className='w-full flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 py-4 rounded-lg bg-white border border-gray-200 shadow-sm gap-4'
            >
              <div className='flex gap-4 items-center'>
                <div className="text-gray-500 text-xl">👤</div>
                <div className='flex flex-col gap-1'>
                  <h1 className='text-base font-semibold text-gray-800'>{user.name}</h1>
                  <h1 className='text-sm text-gray-500'>{user.email}</h1>
                </div>
              </div>

              <div className='flex flex-wrap sm:flex-nowrap gap-3 items-center'>
                <span className='px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm'>{user.role}</span>
                <select
                  value={user.role} // ✅ key fix
                  className='border border-gray-300 px-3 py-1 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-300'
                  onChange={(e) => updateUser(user, e.target.value)}
                >
                  <option value="customer">customer</option>
                  <option value="owner">owner</option>
                  <option value="admin">admin</option>
                </select>
                <button
                  onClick={() => deleteUser(user)}
                  className='text-red-500 hover:text-red-700 text-sm transition'
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UserManagement;
