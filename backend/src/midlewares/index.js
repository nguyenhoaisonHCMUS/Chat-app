const jwt = require('jsonwebtoken');

function authenToken(req, res, next) {
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) {
        return res.status(401).json({ message: 'no token auh' });
    }
    const token = authorizationHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'no token' });
    }
    jwt.verify(token, process.env.ACCESSTOKEN_KEY, (err, data) => {
        if (err) {
            return res.status(403).json({ message: 'invalid token' }); // Trả về 403 nếu token không hợp lệ
        }
        // console.log(data);
        req.user = data;
        next();
    });
}

module.exports = authenToken;