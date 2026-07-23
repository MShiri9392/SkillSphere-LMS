import { useState } from "react";
import { forgotPassword } from "../services/AuthService";

function ForgotPassword() {
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await forgotPassword(email);
            alert(response.data);
        } catch (error) {
            alert("Error sending reset password request.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="card p-4">
                <h3>Forgot Password</h3>

                <form onSubmit={handleSubmit}>
                    <input
                        className="form-control mb-3"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <button className="btn btn-primary w-100">
                        Send Reset Link
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;