const jwt = require('jsonwebtoken');
const Refresh = require('../models/Refresh');


exports.generateTokens = async (payload) => {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, { expiresIn: '5d' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, { expiresIn: '7d' });
    console.log(accessToken);
    return {
        accessToken,
        refreshToken
    }
}

exports.storeRefreshAToken = async (token, userId) => {
    try {
        await Refresh.create({
            token,
            userId
        })
    } catch (err) {
        console.log(err);
    }
}

exports.verifyAccessToken = async (token) => {
    console.log(process.env.JWT_ACCESS_TOKEN)
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
    return decoded;
}