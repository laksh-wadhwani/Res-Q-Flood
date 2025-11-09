export const otpEmailTemplate = (fullname, otp) => {
    return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #1B262C; background-color: #F4F9FF; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: white; border: 1px solid #E0ECF8; border-radius: 12px; padding: 25px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            
            <h2 style="text-align: center; color: #0077B6; margin-bottom: 10px;">🌊 Res Q Flood</h2>
            
            <p>Hi <strong>${fullname}</strong>,</p>
            
            <p>Welcome to <a href="https://resqflood.com" style="color: #0077B6; text-decoration: none; font-weight: bold;">Res Q Flood</a> — your trusted Flood Rescue and Support System.</p>
            
            <p>Your One-Time Password (OTP) for account verification is:</p>
            
            <div style="text-align: center; margin: 25px 0;">
                <span style="display: inline-block; background: #0077B6; color: white; font-size: 26px; padding: 12px 30px; border-radius: 8px; letter-spacing: 4px; font-weight: bold;">
                    ${otp}
                </span>
            </div>
            
            <p>This OTP is valid for <strong>2 minutes</strong>. Please do not share it with anyone for your security.</p>
            
            <p>Thank you for joining us in building a safer tomorrow.<br>
            <strong>– The Res Q Flood Team</strong></p>
            
            <hr style="border: none; border-top: 1px solid #E0ECF8; margin-top: 25px;">
            
            <small style="display: block; text-align: center; color: #6B7A8F; margin-top: 10px;">
                If you did not request this OTP, please ignore this email.
            </small>
        </div>
    </div>
    `;
};
