import axios from 'axios';
import type { User, UserFormInput } from './types';

const API_BASE = 'http://localhost:8000';

export const getUsers = async (): Promise<User[]> => {
    const res = await axios.get(`${API_BASE}/users`);
    return res.data;
};

export const createUser = async (data: UserFormInput): Promise<User> => {
    const res = await axios.post(`${API_BASE}/users`, data);
    return res.data;
};

export const updateUser = async (id: number, data: UserFormInput): Promise<User> => {
    const res = await axios.put(`${API_BASE}/users/${id}`, data);
    return res.data;
};

export const deleteUser = async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE}/users/${id}`);
};

export const uploadExcel = async (file: File): Promise<any> => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await axios.post(`${API_BASE}/upload-excel`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
};

export const downloadTemplate = () => {
    window.open(`${API_BASE}/download-template`, "_blank");
};
