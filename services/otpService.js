const hashService = require('../services/hashService')



exports.generateOtp = async (req, res) => {
    const otp = Math.floor(Math.random()*(9000)+1000);
    return otp
}

exports.sendOtp = async (phone, otp) => {
    console.log("Called sending")
    const SMS_Sid = process.env.SMS_SID;
    const SMS_Token = process.env.SMS_AUTH_TOKEN;
    const twilio = require('twilio')(SMS_Sid, SMS_Token, {
        lazyLoading: true
    });
    return await twilio.messages.create({
        to: phone,
        from: '+14344362009',
        body: `Please DO NOT SHARE this with anyone!! Your OTP is ${otp} for AgroMart Login`
    })
}

exports.verifyOtp = async (data, hashedOtp) => {
    const Hashed = await hashService.hashOtp(data)
    console.log(hashedOtp)
    console.log(Hashed)
    return Hashed === hashedOtp
}