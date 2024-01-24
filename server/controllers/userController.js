const { User, UserProfile } = require("../models");

class UserController {
    static async register(req,res,next) {
        try {
            const { username, email, password, gender, interest } = req.body
            let data = await User.create({ username, email, password, gender, interest })
            await UserProfile.create({
                fullname: '',
                birthdate: new Date(),
                address: '',
                occupation: '',
                bio: '',
                UserId: data.id,
            })
            res.status(201).json({
                id: data.id,
                username: data.username,
                email: data.email,
            })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserController;