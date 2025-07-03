import React, { useState, useEffect } from 'react';
import type { User, UserFormInput } from '../types';
import { createUser, updateUser } from '../api';

type Props = {
    editingUser?: User | null;
    onSuccess: () => void;
};

const UserForm: React.FC<Props> = ({ editingUser, onSuccess }) => {
    const [formData, setFormData] = useState<UserFormInput>({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        pan: ''
    });

    const [showPan, setShowPan] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (editingUser) {
            setFormData({
                first_name: editingUser.first_name,
                last_name: editingUser.last_name,
                email: editingUser.email,
                phone: editingUser.phone,
                pan: editingUser.pan
            });
        }
    }, [editingUser]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

const [isLoading, setisLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setisLoading(true);
        setError('');
        setSuccess('');

        const panFormat = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
        const phoneFormat = /^\d{10}$/;

        if (!formData.first_name || !formData.last_name || !formData.email) {
            setError('Please fill in all required fields');
            return;
        }

        if (!phoneFormat.test(formData.phone)) {
            setError('Phone number must be 10 digits');
            alert('Phone number must be 10 digits');
            setisLoading(false);
            return;
        }
        
        if (!panFormat.test(formData.pan)) {
            setError('PAN must match format: ABCDE1234F');
          alert('PAN must match format: ABCDE1234F');
            setisLoading(false);
            return;
        }

        try {
            if (editingUser) {
                await updateUser(editingUser.id, formData);
                setSuccess('User updated');
                alert("User updated")
            } else {
                await createUser(formData);
                setSuccess('User created');
                alert("User Created");
                setFormData({
                    first_name: '',
                    last_name: '',
                    email: '',
                    phone: '',
                    pan: ''
                });
            }

            onSuccess();
        } catch (err: any) {
            alert('Submit error');
            setError(err.response?.data?.detail || 'Something went wrong');
        }finally{
            setisLoading(false);
        }
    };

    return (
    <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded mb-6 w-full max-w-xl mx-auto md:max-w-2xl sm:min-w-full">
            <h2 className="text-lg font-medium mb-4 w-full md:w-auto">
                {editingUser ? 'Edit User' : 'Add New User'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <input name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} className="input" required />
                <input name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} className="input" required />
                <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} className="input" required />
                <input name="phone" type="tel" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="input" required />

                <div className="relative">
                    <input
                        name="pan"
                        type={showPan ? 'text' : 'password'}
                        placeholder="PAN Number"
                        value={formData.pan}
                        onChange={handleChange}
                        className="input pr-10"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPan(!showPan)}
                        className="absolute top-2 right-2 text-gray-500 text-sm"
                    >
                        {showPan ? '👁' : '🙈'}
                    </button>
                </div>
            </div>

            <div className="mt-4 w-full md:w-auto">
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                    disabled={isLoading}
                >
                    {isLoading ? 'Processing...' : editingUser ? 'Update' : 'Create'}
                </button>

            </div>

            {error && <p className="text-red-500 mt-2 w-full md:w-auto">{error}</p>}
            {success && <p className="text-green-500 mt-2 w-full md:w-auto">{success}</p>}
        </form>
    );
};

export default UserForm;
