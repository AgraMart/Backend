const userService = require('../services/userService');
const tokenService = require('../services/tokenService');
const jwt = require('jsonwebtoken')

module.exports = async (req,res,next) => {
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
    // console.log(decoded);
    try{
        const currentUser = await userService.findUser(decoded.id)
    
    
        // 4) Check if user changed password after the token was issued
    
        req.user = currentUser;
        // console.log("This is req.user from middlwwRE", req.user);
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