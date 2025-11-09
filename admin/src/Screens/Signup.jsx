import React, { useRef, useState } from "react"
import CustomInput from "../Components/CustomInput"
import CustomButton from "../Components/CustomButton"
import { Link, useNavigate } from "react-router-dom"
import { BackendURL } from "../BackendContext"
import { toast } from "react-toastify";
import axios from "axios"

const Signup = () => {

    const URL = BackendURL()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isVerify, setIsVerify] = useState(false)
    const [user, setUser] = useState({
        fullname: "",
        contact: "",
        email: "",
        password: "",
        c: "",
        o: "",
        d: "",
        e: ""
    })

    const { c, o, d, e, email } = user
    const otp = c + o + d + e

    const cRef = useRef(null)
    const oRef = useRef(null)
    const dRef = useRef(null)
    const eRef = useRef(null)

    const handleChange = (name, value, nextRef) => {
        setUser(prev => ({
            ...prev,
            [name]: value
        }))

        if (name === "c" || name === "o" || name === "d" || name === "e") {
            if (value.length === 1 && nextRef?.current) {
                nextRef.current.focus();
            }
        }
    }

    const CreateAccount = () => {
        setLoading(true);
        axios.post(`${URL}/api/admin/signup`, user)
            .then(response => {
                toast.success(response.data.message)
                setTimeout(() => { setIsVerify(true) }, 2500)
            })
            .catch(error => {
                console.error(error)
                return toast.error(error.response?.data?.error)
            })
            .finally(() => { setLoading(false) })
    }

    const VerifyOtp = () => {
        setLoading(true)
        axios.put(`${URL}/api/admin/verify-otp/${email}`, { otp })
            .then(response => {
                toast.success(response.data.message)
                setTimeout(() => { navigate("/login") }, 2500)
            })
            .catch(error => {
                console.error(error)
                return toast.error(error.response?.data?.error)
            })
            .finally(() => setLoading(false))
    }

    return (
        <React.Fragment>
            <div className="w-full flex items-center justify-center">
                <div className="w-fit mt-12 flex flex-col gap-8 border border-gray-200 shadow-md rounded-lg py-8 px-12">
                    <h2 className="font-serif text-2xl font-semibold capitalize self-center text-[#0077B6]">{isVerify ? `Verify` : `Admin Signup`}</h2>
                    {isVerify ?
                        <>
                            <div className="flex items-center gap-2">
                                <input type="text" className="p-2 border border-black rounded-xl size-14 text-center" value={user.c} maxLength={1} ref={cRef} onChange={e => handleChange("c", e.target.value, oRef)} />
                                <input type="text" className="p-2 border border-black rounded-xl size-14 text-center" value={user.o} maxLength={1} ref={oRef} onChange={e => handleChange("o", e.target.value, dRef)} />
                                <input type="text" className="p-2 border border-black rounded-xl size-14 text-center" value={user.d} maxLength={1} ref={dRef} onChange={e => handleChange("d", e.target.value, eRef)} />
                                <input type="text" className="p-2 border border-black rounded-xl size-14 text-center" value={user.e} maxLength={1} ref={eRef} onChange={e => handleChange("e", e.target.value)} />                            
                            </div>
                            <CustomButton onClick={VerifyOtp} disabled={loading}>
                                {loading ? <div className="w-5 h-5 border-2 border-t-transparent border-black rounded-full animate-spin" /> : "Verify"}
                            </CustomButton>
                        </>
                        :
                        <>
                            <div className="flex flex-col gap-2">
                                <CustomInput label="Full Name" type="text" placeholder="Full Name" value={user.fullname} onChange={e => handleChange("fullname", e.target.value)} />
                                <CustomInput label="Contact" type="text" placeholder="Phone Number" value={user.contact} onChange={e => handleChange("contact", e.target.value)} />
                                <CustomInput label="Email" type="email" placeholder="Email" value={user.email} onChange={e => handleChange("email", e.target.value)} />
                                <CustomInput label="Password" type="password" placeholder="Password" showPasswordRules={true} value={user.password} onChange={e => handleChange("password", e.target.value)} />
                            </div>
                            <div className="flex flex-col items-center">
                                <CustomButton onClick={CreateAccount} disabled={loading}>
                                    {loading ? <div className="w-5 h-5 border-2 border-t-transparent border-black rounded-full animate-spin" /> : "Create Account"}
                                </CustomButton>
                                <p className="font-serif text-base">Already have an account <Link to="/login"><strong className="cursor-pointer text-[#0077B6]">Login</strong></Link></p>
                            </div>
                        </>
                    }

                </div>
            </div>
        </React.Fragment>
    )
}

export default Signup