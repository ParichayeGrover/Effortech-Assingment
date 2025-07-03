import { useState } from 'react';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';
import ExcelUpload from './components/ExcelUpload';

import type { User } from './types';

function App() {
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [refresh, setRefresh] = useState(0);

  const handleSuccess = () => {
    setEditingUser(null);
    setRefresh(prev => prev + 1); 
  };

  return (
    <div className="max-w-5xl mx-auto sm:w-full p-6">
      <h1 className="text-3xl  justify-center items-center flex font-bold mb-6">User Management System</h1>

   <UserForm editingUser={editingUser} onSuccess={handleSuccess} />
      <ExcelUpload onSuccess={handleSuccess} />
      <UserTable onEdit={setEditingUser} refreshFlag={refresh} />
    </div>
  );
}

export default App;
