import otpGenerator from "otp-generator"

const GenerateOTP = () => {
    return otpGenerator.generate(4, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false
    })
}

export default GenerateOTP