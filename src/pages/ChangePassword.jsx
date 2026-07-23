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

        try {
            await changePassword(id, data);
            alert("Password changed successfully");

            setData({
                oldPassword: "",
                newPassword: ""
            });

        } catch (error) {
            alert("Invalid old password");
        }
    };

    return (

        <div className="container mt-5">

            <div className="card p-4">

                <h3>Change Password</h3>

                <form onSubmit={handleSubmit}>

                    <input
                        type="password"
                        className="form-control mb-3"
                        placeholder="Current Password"
                        name="oldPassword"
                        value={data.oldPassword}
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        className="form-control mb-3"
                        placeholder="New Password"
                        name="newPassword"
                        value={data.newPassword}
                        onChange={handleChange}
                    />

                    <button className="btn btn-primary">
                        Update Password
                    </button>

                </form>

            </div>

        </div>

    );
}

export default ChangePassword;