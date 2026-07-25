import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/users/login`,
                {
                    email,
                    password,
                }
            );
            console.log("LOGIN RESPONSE");
            console.log(response.data);
            console.log("ROLE:", response.data.role);

            // Save JWT and user details
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);
            localStorage.setItem("email", response.data.email);
            localStorage.setItem("name", response.data.name);
            localStorage.setItem("userId", response.data.id);

            // Debugging
            console.log("Token Saved:", response.data.token);
            console.log("Stored Token:", localStorage.getItem("token"));

            alert("Login Successful");

            // Go to Dashboard
            navigate("/dashboard");

        } catch (err) {
            console.error(err);
            alert("Invalid Credentials");
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh", background: "#f5f7fb" }}
        >
            <div
                className="card shadow p-4"
                style={{ width: "400px", borderRadius: "15px" }}
            >
                <h2 className="text-center mb-4">SkillSphere LMS</h2>

                <form onSubmit={login}>
                    <div className="mb-3">
                        <label>Email</label>

                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label>Password</label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;