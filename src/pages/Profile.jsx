import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../services/ProfileService";

function Profile() {

    const id = localStorage.getItem("userId");

    const [user, setUser] = useState({
        name: "",
        email: ""
    });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        const response = await getProfile(id);
        setUser(response.data);
    };

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const saveProfile = async () => {
        await updateProfile(id, user);
        alert("Profile Updated Successfully");
    };

    return (
        <div className="container mt-4">

            <h2>My Profile</h2>

            <div className="card p-4">

                <label>Name</label>
                <input
                    className="form-control mb-3"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                />

                <label>Email</label>
                <input
                    className="form-control mb-3"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                />

                <button
                    className="btn btn-primary"
                    onClick={saveProfile}
                >
                    Update Profile
                </button>

            </div>

        </div>
    );
}

export default Profile;