import bcrypt from "bcrypt"

export const encryptPassword = async(password) => {
    const saltRounds = await bcrypt.genSalt(10)
    return bcrypt.hash(password, saltRounds)
}

export const decryptPassword = (plainPass, hashPass) => {
    return bcrypt.compare(plainPass, hashPass)
}