import nodemailer from 'nodemailer';

const otpStore = new Map();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'surendarprime1@gmail.com',
        pass: 'wybx ykro doaw gqhy'
    }
});

const SendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const otp = (100000 + Math.floor(899999 * Math.random())).toString();
        const expiresAt = Date.now() + 5 * 60 * 1000;
        otpStore.set(email, {otp,expiresAt});

        await transporter.sendMail({
            from: "your-email@gmail.com",
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP is ${otp}`,
        });

        res.json({ success: true });
    } catch (error) {
        console.log('Error in sending otp', error);
        res.status(500).json({ success: false, error: "Failed to send OTP" });
    }
};

const VerifyOtp = async(req,res)=>{
    try {
        const { email, otp: enteredOtp } = req.body;
        const {otp,expiresAt} = otpStore.get(email);
        console.log(otp,enteredOtp)
        if(Date.now()>expiresAt){
            return res.json({message:'Otp expired'})
        }else if(otp!=enteredOtp){
            res.json({ verified: false });
        }else{
            otpStore.delete(email); // optional: clear once used
            res.json({ verified: true });
        }
    } catch (error) {
        
    }
}
export { SendOtp, VerifyOtp };
