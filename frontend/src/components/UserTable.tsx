import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../api';
import type { User } from '../types';

type Props = {
  onEdit: (user: User) => void;
  refreshFlag: number;
};

const UserTable: React.FC<Props> = ({ onEdit, refreshFlag }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, [refreshFlag]);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    await deleteUser(id);
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  return (
    <div className="bg-white shadow p-6 rounded mt-6 w-full overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4 text-center sm:text-left">All Users</h2>

      <table className="min-w-[600px] w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border whitespace-nowrap">First</th>
            <th className="p-2 border whitespace-nowrap">Last</th>
            <th className="p-2 border whitespace-nowrap">Email</th>
            <th className="p-2 border whitespace-nowrap">Phone</th>
            <th className="p-2 border whitespace-nowrap">PAN</th>
            <th className="p-2 border whitespace-nowrap">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-500">No users found.</td>
            </tr>
          )}
          {users.map(user => (
            <tr key={user.id}>
              <td className="p-2 border">{user.first_name}</td>
              <td className="p-2 border">{user.last_name}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.phone}</td>
              <td className="p-2 border">{user.pan.replace(/.(?=.{4})/g, '*')}</td>
              <td className="p-2 border text-center space-x-2">
                <button onClick={() => onEdit(user)} className="text-blue-600 hover:underline">Edit</button>
                <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
