const jwt = require('jsonwebtoken');

const generateAccessToken = (data) => {
	const token = jwt.sign(data, process.env.ACCESSTOKEN_KEY, {expiresIn: "30s"});
    return token;
};

const generateRefreshAccessToken = (data, res) => {
    const refreshToken = jwt.sign(data , process.env.REFRESHTOKEN_KEY, { expiresIn: '30d' });
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        path: '/',
        sameSite: 'strict',
    });

    return refreshToken;
};

module.exports = {generateAccessToken, generateRefreshAccessToken};