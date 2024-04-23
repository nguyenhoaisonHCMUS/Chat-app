const bcrypt = require('bcryptjs');

const { User } = require("../models/user.model");
const { generateAccessToken } = require("../utils/genToken");

let refreshTokens = [];


class AuthController {
    async signup (req, res) {
        try {
            const { fullname, username, password, gender } = req.body;
            console.log(fullname, username, password, gender)
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
                const accessToken = generateAccessToken(user._id);
                // const refreshToken = generateRefreshAccessToken({userId: user._id}, res);
                // refreshTokens.push(refreshToken);

                await user.save();

                return res.status(200).json(
                    {
                        user: {userId: user._id, fullname: user.fullname, username: user.username, imgUrl: user.profilePic}, 
                        accessToken,
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
            // console.log(username, password);
            const user = await User.findOne({ username });
            const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

            if (!user || !isPasswordCorrect) {
                return res.status(400).json({ error: "Invalid username or password" });
            }

            const accessToken = generateAccessToken(user._id);
            const refreshToken = generateRefreshAccessToken({userId: user._id}, res);
            refreshTokens.push(refreshToken);

            return res.status(200).json(
                {
                    user: {userId: user._id, fullname: user.fullName, username: user.username, imgUrl: user.profilePic}, 
                    accessToken: accessToken,
                }
            );  

        } catch (error) {
            console.log('error: ',error);
		    return res.status(500).json({ error: "Internal Server Error" });
        }
    }

}

module.exports = new AuthController();