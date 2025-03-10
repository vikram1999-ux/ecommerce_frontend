import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import {FcGoogle} from "../components/Icons";
import { auth } from "../firebase";
import { useLoginMutation } from "../redux/api/userAPI";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import { MessageResponse } from "../types/api-types";
const Login = () => {
    const [gender, setGender] = useState<string>("");
    const [date, setDate] = useState<string>("");

    const [login] = useLoginMutation()

    const loginHandler = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const { user } = await signInWithPopup(auth, provider);
            const res = await login({
                name: user.displayName!,
                email: user.email!,
                photo: user.photoURL!,
                gender,
                role: "user",
                dob: date,
                _id: user.uid,
            });

            // Safely check if `res.data` exists
            if (res.data) {
                toast.success(res.data.message); // Use res.data safely
            } else if (res.error) {
                const error = res.error as FetchBaseQueryError;
                const message = (error.data as MessageResponse).message;
                toast.error(message);
            }
            
        } catch (error) {
            toast.error("Sign In Fail");
        }
    };

  return (
    <div className="login">
        <main>
            <h1 className="heading">Login</h1>
            <div>
                <label>Gender</label>
                <select 
                value={gender}
                onChange={(e) => setGender(e.target.value)}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                </select>
            </div>

            <div>
                <label>Date of Birth</label>
                <input type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)} />
            </div>

            <div>
                <p>Already Signed In Once</p>
                <button onClick={loginHandler}>
                    <FcGoogle /> <span>Sign in with Google</span>
                </button>
            </div>
        </main>
    </div>
  );
};

export default Login;