import mongoose from "mongoose"

const AdminSchema = mongoose.Schema(
    {
        fullname: String,
        contact: String,
        email: String,
        password: String,
        isVerified: {type: Boolean, default: false},
        otp: String,
        otpExpiry: Date
    },
    {timestamps: true}
)

const AdminModel = mongoose.model("Admin", AdminSchema)

export default AdminModel