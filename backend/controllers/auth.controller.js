import { transporter } from "../config/mailer.js";
import AdminModel from "../models/Admin.js";
import { decryptPassword, encryptPassword } from "../utils/bcrypt.js";
import { otpEmailTemplate } from "../utils/emailTemplates.js";
import GenerateOTP from "../utils/OtpGenerator.js";

export const Signup = async (request, response) => {
    const { fullname, contact, email, password } = request.body;
    const userCheck = await AdminModel.findOne({ email })

    if (userCheck)
        return response.status(400).json({ error: "User already exists" })

    const hashPassword = await encryptPassword(password)
    const otp = GenerateOTP();
    const otpExpiry = new Date(Date.now() + 2 * 60 * 1000)


    const newUser = new AdminModel({
        fullname,
        contact,
        email,
        password: hashPassword,
        otp,
        otpExpiry
    })

    await transporter.sendMail({
        from: `"ResQFloof" <no-reply@mytherapyspace.com.au>`,
        to: email,
        subject: "Your OTP for ResQFlood",
        html: otpEmailTemplate(fullname, otp)
    })

    await newUser.save();
    return response.status(201).json({
        message: "OTP Sent. Please verify to complete registration",
    })
}

export const verifyOtp = async (request, response) => {
    try {
        const { email } = request.params
        const { otp } = request.body
        const otpEnterTime = new Date(Date.now())
        const user = await AdminModel.findOne({ email })

        if (!user)
            return response.status(400).json({ error: "User not found" })

        if (otp === user.otp) {
             if (otpEnterTime > user.otpExpiry)
                return response.status(400).json({ error: "Your otp has been expired. Please request a new one !" })

            user.otp = null;
            user.otpExpiry = null
            user.isVerified = true
            await user.save()
            return response.status(200).json({ message: "Account verified successfully" })
        }

        return response.status(400).json({ error: "Invalid OTP" })

    } catch (error) {
        console.log(error)
        return response.status(500).json({ error: "Internal Server Error" })
    }
}

export const Login = async (request, response) => {
    try {
        const { email, password } = request.body
        const userCheck = await AdminModel.findOne({ email })

        if (!userCheck)
            return response.status(404).json({ error: "User not found" })

        const isMatch = await decryptPassword(password, userCheck.password)

        if (!isMatch)
            return response.status(401).json({ error: "Invalid Credentials" })

        if(!userCheck.isVerified)
            return response.status(400).json({error: "Please verify your account first"})

        return response.status(200).json({
            message: "Login Successful",
        })
    } catch (error) {
        console.log("Getting error in logging in user: ", error)
        return response.status(500).json({ error: "Internal Server Error" })
    }
}