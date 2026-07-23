import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUser } from "../services/UserService";

function AddUser() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        role: "STUDENT"
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await addUser(user);

            alert("User Added Successfully!");

            navigate("/users");

        } catch (error) {
            console.error(error);
            alert("Failed to add user.");
        }
    };

    return (

        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-header bg-primary text-white">

                    <h3>Add User</h3>

                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <label>Name</label>

                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label>Email</label>

                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label>Password</label>

                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label>Role</label>

                            <select
                                className="form-select"
                                name="role"
                                value={user.role}
                                onChange={handleChange}
                            >
                                <option value="ADMIN">Admin</option>
                                <option value="INSTRUCTOR">Instructor</option>
                                <option value="STUDENT">Student</option>
                            </select>

                        </div>

                        <button
                            type="submit"
                            className="btn btn-success me-2"
                        >
                            Save User
                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate("/users")}
                        >
                            Cancel
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default AddUser;