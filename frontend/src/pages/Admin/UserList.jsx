import React, { useEffect, useState } from 'react';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import { useDeleteUserMutation, useGetUserQuery, useUpdateUserMutation } from '../../redux/api/usersSlice';
import Message from '../../components/Message';
import AdminMenue from './AdminMenue';

const UserList = () => {
    const { data: users, refetch, isLoading, error } = useGetUserQuery();
    const [deleteUser] = useDeleteUserMutation();
    const [updateUser] = useUpdateUserMutation();

    const [editableUserId, setEditableUserId] = useState(null);
    const [editableUserName, setEditableUserName] = useState('');
    const [editableEmail, setEditableEmail] = useState('');

    useEffect(() => {
        refetch();
    }, [refetch]);

    const deleteHandler = async (id) => {
        if (window.confirm("Are you sure?")) {
            try {
                await deleteUser(id);
            } catch (error) {
                toast.error(error?.data?.message || error.message);
            }
        }
    };

    const toggleEdit = (id, username, email) => {
        setEditableUserId(id);
        setEditableUserName(username);
        setEditableEmail(email);
    };

    const updateHandeler = async (id) => {
        try {
            await updateUser({
                userId: id,
                username: editableUserName,
                email: editableEmail,
            });
            setEditableUserId(null);
            refetch();
        } catch (error) {
            toast.error(error.data.message || error.error);
        }
    };
    

    return (
        <div className='p-4'>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error?.data?.Message || error.message}</Message>
            ) : (
                <div className='flex flex-col md:flex-row'>
                <AdminMenue />
                    <table className="w-full md:w-4/5 mx-auto">
                        <thead>
                            <tr>
                                <th className='px-4 py-2 text-left'>ID</th>
                                <th className='px-4 py-2 text-left'>Name</th>
                                <th className='px-4 py-2 text-left'>Email</th>
                                <th className='px-4 py-2 text-left'>Admin</th>
                                <th className='px-4 py-2 text-left'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td className="px-4 py-2">{user._id}</td>
                                    <td className="px-4 py-2">
                                        {editableUserId === user._id ? (
                                            <div className="flex items-center">
                                                <input type="text" value={editableUserName} onChange={e => setEditableUserName(e.target.value)} className="w-full p-2 rounded-lg border" />
                                                <button onClick={() => updateHandeler(user._id)} className='ml-2 bg-blue-500 py-2 px-4 rounded-lg'><FaCheck /></button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center">
                                                {user.username}
                                                <button onClick={() => toggleEdit(user._id, user.username, user.email)}><FaEdit className='ml-1' /></button>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        {editableUserId === user._id ? (
                                            <div className="flex items-center">
                                                <input type="text" value={editableEmail} onChange={e => setEditableEmail(e.target.value)} className="w-full p-2 rounded-lg border" />
                                                <button onClick={() => updateHandeler(user._id)} className='ml-2 bg-blue-500 py-2 px-4 rounded-lg'><FaCheck /></button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center">
                                                <p>{user.email}</p>
                                                <button onClick={() => toggleEdit(user._id, user.username, user.email)}><FaEdit className='ml-1' /></button>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        {user.isAdmin ? (
                                            <FaCheck style={{ color: 'green' }} />
                                        ) : (
                                            <FaTimes style={{ color: 'red' }} />
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        {!user.isAdmin && (
                                            <div className="flex">
                                                <button onClick={() => deleteHandler(user._id)} className='bg-red-600 hover:bg-red-700 font-bold py-2 px-4 rounded'>
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserList;
