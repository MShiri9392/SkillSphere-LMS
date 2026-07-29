import { useState } from "react";
import { changePassword } from "../services/ProfileService";

function ChangePassword() {

    const id = localStorage.getItem("userId");

    const [data, setData] = useState({
        oldPassword: "",
        newPassword: ""
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!id) {
            alert("User ID not found. Please login again.");
            return;
        }

        if (!data.oldPassword || !data.newPassword) {
            alert("Please enter current password and new password");
            return;
        }

        if (data.newPassword.length < 6) {
            alert("New password must contain at least 6 characters");
            return;
        }

        try {

            await changePassword(id, data);

            alert("Password changed successfully");

            setData({
                oldPassword: "",
                newPassword: ""
            });

        } catch (error) {

            console.error(
                "CHANGE PASSWORD ERROR:",
                error.response?.status,
                error.response?.data
            );

            if (error.response?.status === 400) {
                alert(
                    typeof error.response.data === "string"
                        ? error.response.data
                        : "Invalid old password"
                );
            } else if (error.response?.status === 401) {
                alert("Session expired. Please login again.");
            } else if (error.response?.status === 403) {
                alert("Access denied. Please login again.");
            } else {
                alert("Unable to change password");
            }
        }
    };

    return (
        <div className="container mt-5">

            <div className="card shadow p-4">

                <h3 className="text-center mb-4">
                    Change Password
                </h3>

                <form onSubmit={handleSubmit}>

                    <input
                        type="password"
                        className="form-control mb-3"
                        placeholder="Current Password"
                        name="oldPassword"
                        value={data.oldPassword}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        className="form-control mb-3"
                        placeholder="New Password"
                        name="newPassword"
                        value={data.newPassword}
                        onChange={handleChange}
                        required
                    />

                    <div className="text-center">
                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            Update Password
                        </button>
                    </div>

                </form>

            </div>

        </div>
    );
}

export default ChangePassword;