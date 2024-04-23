
class UserController {
    async getUsersForSidebar (req, res) {
        try {
            const loggedInUserId = req.user.userId;
    
            const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
    
            return res.status(200).json(filteredUsers);
        } catch (error) {
            console.error("Error in getUsersForSidebar: ", error.message);
            return res.status(500).json({ error: "Internal server error" });
        }
    };
}

module.exports = new UserController();