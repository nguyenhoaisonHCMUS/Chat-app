const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require("../models/user.model");
const { generateAccessToken, generateRefreshAccessToken } = require("../utils/genToken");

let refreshTokens = [];


class AuthController {
    async signup (req, res) {
        try {
            const { fullname, username, password, gender } = req.body;
            if(!fullname || !username || !password || !gender){
                return res.status(400).json({error: "incomplete information!!"}); 
            }

            const userFind = await User.findOne({username});
            if(userFind){
                return res.status(400).json({error: "User already exists"})
            }

            //IMGURL
            const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
            //HASH PASSWORD
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = new User({
                fullname,
                username,
                password: hashedPassword,
                gender,
                profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
            });
            if(user){
                //token
                const accessToken = generateAccessToken({userId: user._id, fullname: user.fullname, username: user.username, imgUrl: user.profilePic});
                const refreshToken = generateRefreshAccessToken({userId: user._id, fullname: user.fullname, username: user.username, imgUrl: user.profilePic}, res);
                refreshTokens.push(refreshToken);

                await user.save();

                return res.status(200).json(
                    {
                        user: {userId: user._id, fullname: user.fullname, username: user.username, imgUrl: user.profilePic}, 
                        accessToken,
                        // refreshToken,
                    }
                );  
            }else{
                console.log("Error in signup controller", error.message);
		        return res.status(500).json({ error: "Internal Server Error" });
            }

        } catch (error) {
            console.log(error);
		    return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async signin (req, res) {
        try {
            const {username, password} = req.body;
            const user = await User.findOne({ username });
            const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

            if (!user || !isPasswordCorrect) {
                return res.status(400).json({ error: "Invalid username or password" });
            }

            const accessToken = generateAccessToken({userId: user._id, fullname: user.fullname, username: user.username, imgUrl: user.profilePic});
            const refreshToken = generateRefreshAccessToken({userId: user._id, fullname: user.fullname, username: user.username, imgUrl: user.profilePic}, res);
            refreshTokens.push(refreshToken);

            return res.status(200).json(
                {
                    user: {userId: user._id, fullname: user.fullname, username: user.username, imgUrl: user.profilePic}, 
                    accessToken: accessToken,                  
                }
            );  

        } catch (error) {
            console.log('error: ',error);
		    return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async requestRefreshToken(req, res) {
        try {
            const refreshtoken = req.cookies.refreshToken;
            if (!refreshtoken) {
                return res.status(401).json({ message: "You're not authenticated!" });
            }

            if (!refreshTokens.includes(refreshtoken)) {
                return res.status(403).json('refreshToken is not valid');
            }

            jwt.verify(refreshtoken, process.env.REFRESHTOKEN_KEY, (err, data) => {
                if (err) {
                    return res.status(403).json({ err });
                }

                // Xác thực thành công, cập nhật accessToken
                const newAccessToken = jwt.sign({userId: data._id} , process.env.REFRESHTOKEN_KEY, { expiresIn: '30s' });
                const newRefreshToken = jwt.sign({userId: data._id} , process.env.REFRESHTOKEN_KEY, { expiresIn: '30d' });
                res.cookie('refreshToken', newRefreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: '/',
                    sameSite: 'strict',
                });

                // Xóa mã thông báo cũ
                refreshTokens = refreshTokens.filter((token) => token !== newRefreshToken);
                //add new reftoken 
                refreshTokens.push(newRefreshToken);

                return res.status(200).json({ accessToken: newAccessToken });
            });
        } catch (error) {
            console.error('Error refreshing token:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async logout (req, res) {
        const refresToken = req.cookies.refresToken;
        refreshTokens.filter((token) => token!==refresToken);
    }

}

module.exports = new AuthController();