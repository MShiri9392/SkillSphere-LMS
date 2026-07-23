import { useState } from "react";
import axios from "axios";

function Register() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const register = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8082/api/users/register", user);
            alert("Registration Successful");
        } catch (error) {
            alert("Registration Failed");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card p-4 shadow" style={{ width: "420px" }}>
                <h2 className="text-center mb-4">Register</h2>

                <form onSubmit={register}>
                    <input
                        className="form-control mb-3"
                        name="name"
                        placeholder="Full Name"
                        onChange={handleChange}
                    />

                    <input
                        className="form-control mb-3"
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={handleChange}
                    />

                    <input
                        className="form-control mb-3"
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                    />

                    <button className="btn btn-success w-100">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;