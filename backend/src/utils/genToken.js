const jwt = require('jsonwebtoken');

const generateAccessToken = (userId) => {
	const token = jwt.sign({ userId }, process.env.ACCESSTOKEN_KEY, {expiresIn: "60s"});
    return token;
};

const generateRefreshAccessToken = (user, res) => {
    const refreshToken = jwt.sign({ user }, process.env.REFRESHTOKEN_KEY, { expiresIn: '30d' });
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        path: '/',
        sameSite: 'strict',
    });

    return refreshToken;
};

module.exports = {generateAccessToken, generateRefreshAccessToken};