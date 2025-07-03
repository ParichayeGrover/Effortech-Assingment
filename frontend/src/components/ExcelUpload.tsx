import React, { useState } from 'react';
import { uploadExcel, downloadTemplate } from '../api';

type Props = {
  onSuccess: () => void;
};

const ExcelUpload: React.FC<Props> = ({ onSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<any[]>([]);
  const [message, setMessage] = useState('');

  const handleUpload = async () => {
    setErrors([]);
    setMessage('');

    if (!file) return;

    try {
      const result = await uploadExcel(file);
      setMessage(result.message || 'Upload successful');
      setFile(null);
      onSuccess();
    } catch (err: any) {
      const detail = err.response?.data;
      if (detail?.errors) {
        setErrors(detail.errors);
      } else {
        setMessage('Upload failed');
      }
    }
  };

  return (
    <div className="bg-white shadow p-6 rounded mb-6 w-full">
      <h2 className="text-xl font-semibold mb-4">Bulk Upload Users</h2>

      <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:items-center sm:gap-4">
        <input
          type="file"
          accept=".xlsx"
          onChange={e => setFile(e.target.files?.[0] || null)}
          className="border px-3 py-1 rounded w-full sm:w-auto"
        />
        <button
          onClick={handleUpload}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full sm:w-auto"
        >
          Upload Excel
        </button>
        <button
          onClick={downloadTemplate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto"
        >
          Download Sample
        </button>
      </div>

      {message && <p className="mt-3 text-green-600 text-sm">{message}</p>}

      {errors.length > 0 && (
        <div className="mt-4">
          <p className="text-red-600 font-semibold mb-2">Errors:</p>
          <ul className="text-sm text-red-500 space-y-1">
            {errors.map((e, i) => (
              <li key={i}>Row {e.row}: {e.error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExcelUpload;
