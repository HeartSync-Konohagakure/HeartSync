const { User, UserProfile } = require("../models");
const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');

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
    static async login(req,res,next) {
        try {
            let { email, password } = req.body
            if (!password) {
                throw { name: "Password is required" }
            }
            if (!email) {
                throw { name: "Email is required" }
            }

            let options = {}
            options.where = { email }

            let data = await User.findOne(options)
            if (!data) {
                throw { name: "Invalid email/password" }
            }

            let checkPassword = comparePassword(password, data.password)
            if (!checkPassword) {
                throw { name: "Invalid email/password" }
            }

            let access_token = signToken(data)
            res.status(200).json({ access_token, username: data.username })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserController;