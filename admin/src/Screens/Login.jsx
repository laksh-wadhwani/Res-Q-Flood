import React from "react"
import CustomInput from "../Components/CustomInput"
import CustomButton from "../Components/CustomButton"
import { Link, useNavigate } from "react-router-dom"
import { BackendURL } from "../BackendContext"
import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

const Login = () => {

    const URL = BackendURL();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleChange = (name, value) => {
        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const Login = () => {
        setLoading(true);
        axios
            .post(`${URL}/api/admin/login`, user)
            .then((response) => {
                toast.success(response.data.message);
            })
            .catch((error) => {
                console.error(error);
                return toast.error(error.response?.data?.error);
            })
            .finally(() => {
                setLoading(false);
            });
    };


    return(
        <React.Fragment>
            <div className="w-full flex items-center justify-center">
                <div className="w-fit mt-12 flex flex-col gap-8 border border-gray-200 shadow-md rounded-lg py-8 px-12">
                    <h2 className="font-serif text-2xl font-semibold capitalize self-center text-[#0077B6]">Admin Login</h2>
                    <div className="flex flex-col gap-2">
                        <CustomInput label="Email" type="email" placeholder="Email" value={user.email} onChange={e => handleChange("email", e.target.value)}/>
                        <CustomInput label="Password" type="password" placeholder="Password" value={user.password} onChange={e => handleChange("password", e.target.value)}/>
                    </div>
                    <div className="flex flex-col items-center">
                        <CustomButton onClick={Login} disabled={loading}>
                            {loading ? <div className="w-5 h-5 border-2 border-t-transparent border-black rounded-full animate-spin" /> : "Login"}
                        </CustomButton>
                        <p className="font-serif text-base">Don't have an account <Link to="/"><strong className="cursor-pointer text-[#0077B6]">Signup</strong></Link></p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Login