const otpService = require('../services/otpService');
const hashService = require('../services/hashService');
const userService = require('../services/userService');
const tokenService = require('../services/tokenService');

const User = require('../models/User')

const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const signToken = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = (user, statusCode, res) => {
    const { id } = user;
    const data = {
        id
    };
    const token = signToken(data);

    res.status(statusCode).json({
        status: "success",
        token,
        user,
    });
};

exports.sendOtp = async (req, res) => {
    const { phone } = req.body;
    if(!phone) return res.status(400).json({ message: "Phone number is required" });
    const otp = await otpService.generateOtp();
    const expires = Date.now() + 1000*60*3;; 
    const data = `${phone}${otp}${expires}`;

    const otpHash = await hashService.hashOtp(data);
    try{
        await otpService.sendOtp(phone, otp);  
        res.status(200).json({
            hash: `${otpHash}.${expires}`,
            phone,
            otp
         });  
    }catch(err){
        console.log(err)
        return res.status(500).json({ message: "Internal server error" });
    }

}

exports.verifyOtp = async (req, res) => {
    const {otp,hash,phone,userType} = req.body;
    console.log(hash)
    if(!otp || !hash || !phone) return res.status(400).json({ message: "Invalid request" });
    const [hashedOtp, expires] = hash.split('.');

    if(Date.now() > +expires) return res.status(400).json({ message: "Otp expired" });

    const data = `${phone}${otp}${expires}`;

    const isValid = await otpService.verifyOtp(data, hashedOtp);

    if(!isValid) return res.status(400).json({ message: "Invalid otp" });

    let user;

    try{
        user = await userService.findUser({phone});
        if(!user) {
            user = await userService.createUser({
                phone,
                userType
            });
            createSendToken(user, 200, res);
        }
    }catch(err){
        console.log(err)
        return res.status(500).json({ message: "Internal server error" });
    }

    createSendToken(user, 200, res);

}

exports.editUserProfile = async(req,res) => {
    try {
        const {data} = req.body;
        const login_user = req.user;
        console.log("Login_User",login_user);
        data.isFirstTime = false;
        let user = await userService.updateUser(login_user.id,data);

        if(!login_user) return res.status(400).json({
            message:"No user found"
        })

        return res.status(200).json({
            message:"User details",
            data:user
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" });
    }
}

exports.getProfile = async(req,res) => {
    try {
        if(req.user == null){
            return res.status(400).json({
                message:"Login Again"
            })
        }
        return res.status(200).json({
            message:"User prodile",
            data: req.user
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" });
    }
}

exports.authPass = async (req,res,next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = await req.headers.authorization.split(" ")[1];
    }

    console.log(token)

    if (!token || token === "null") {
        return res.status(200).json({
            message: "You aren't Logged In",
        });
    }

    // 2) Verification token
    let decoded;
    try {
        decoded = await jwt.verify(token, process.env.JWT_SECRET)
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            return res.status(200).json({
                status: "fail",
                message: "Session expired"
            })
        }
        return res.status(200).json({
            status: "fail",
            message: "An error occured"
        })
    }
    // console.log("My decoded", decoded);
    // GRANT ACCESS TO PROTECTED ROUTE
    // 3) Check if user still exists
    console.log(decoded);
    try{
        const currentUser = await User.findById(decoded.id).populate("productsListed").populate({
            path: "ordersListed",
            populate: [{
                path: "itemId",
                model: "Item"
            }]
        })
    
    
        // 4) Check if user changed password after the token was issued
    
        req.user = currentUser;
        console.log("This is req.user from middlwwRE", req.user);
        res.locals.user = currentUser;
        console.log("Successfully Passed Middlware");
        next();
    }catch(err){
        console.log(err);
        return res.status(500).json({
            status: "fail",
            message: err.message
        });
    }
}