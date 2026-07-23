import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { resetPassword } from "../services/AuthService";

function ResetPassword() {

    const [searchParams] = useSearchParams();

    const token = searchParams.get("token");

    const [password, setPassword] = useState("");

    const submit = async (e) => {

        e.preventDefault();

        try {

            await resetPassword(token, password);

            alert("Password changed successfully");

        } catch {

            alert("Invalid or expired token");

        }

    };

    return (

        <div className="container mt-5">

            <div className="card p-4">

                <h3>Reset Password</h3>

                <form onSubmit={submit}>

                    <input
                        type="password"
                        className="form-control mb-3"
                        placeholder="New Password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />

                    <button className="btn btn-success">
                        Update Password
                    </button>

                </form>

            </div>

        </div>

    );

}

export default ResetPassword;