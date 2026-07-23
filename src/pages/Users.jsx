import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getUsers,
    deleteUser
} from "../services/UserService";

function Users() {

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const response = await getUsers();
            setUsers(response.data);
        } catch (error) {
            console.error("Error loading users:", error);
        }
    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) return;

        try {
            await deleteUser(id);
            loadUsers();
        } catch (error) {
            console.error("Delete Error:", error);
        }
    };

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.role.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container-fluid mt-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>👥 User Management</h2>

                <button
                    className="btn btn-primary"
                    onClick={() => navigate("/add-user")}
                >
                    + Add User
                </button>

            </div>

            <div className="row mb-3">

                <div className="col-md-6">

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search user..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

            </div>

            <div className="card shadow">

                <div className="card-body">

                    <table className="table table-hover table-bordered">

                        <thead className="table-dark">

                            <tr>

                                <th>ID</th>

                                <th>Name</th>

                                <th>Email</th>

                                <th>Role</th>

                                <th width="220">Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {filteredUsers.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="text-center"
                                    >
                                        No users found
                                    </td>

                                </tr>

                            ) : (

                                filteredUsers.map((user) => (

                                    <tr key={user.id}>

                                        <td>{user.id}</td>

                                        <td>{user.name}</td>

                                        <td>{user.email}</td>

                                        <td>{user.role}</td>

                                        <td>

                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() =>
                                                    navigate(`/edit-user/${user.id}`)
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() =>
                                                    handleDelete(user.id)
                                                }
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}

export default Users;