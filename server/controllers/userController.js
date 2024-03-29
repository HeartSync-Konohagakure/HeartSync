const { User, UserProfile } = require("../models");
const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const Sequelize = require('sequelize')
const { Op } = require("sequelize")

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

    static async fetchUsers(req,res,next) {
        try {
            let loggedInUserId = req.user.id
            let loggedInUser = await User.findByPk(loggedInUserId)

            let options = {
                include: {
                    model: UserProfile,
                },
                where: {
                    show: true,
                    gender: loggedInUser.interest === 'male' ? 'male' : 'female',
                },
                attributes: {
                    exclude: ['remainingLikes', 'password', 'show'],
                },
            }

            if (loggedInUser.gender === loggedInUser.interest) {    // if gender === interest, user login not show
                options.where.id = { [Sequelize.Op.ne]: loggedInUserId }
            }

            let totalData = await User.findAll({
                where: options.where,
            })

            let data = await User.findAll(options)
            if (data.length <= 0) {
                throw { name: 'User Not Found' }
            }

            res.status(200).json({
                message: 'Data Revceived Succesfully',
                totalData: totalData.length,
                data,
            })
        } catch (error) {
            next(error);
        }
    }

    static async userProfile(req,res,next) {
        try {
            let data = await User.findByPk(req.user.id, {
                include: {
                    model: UserProfile,
                },
                attributes: {
                    exclude: ['password'],
                },
            })
            if (!data) {
                throw { name: 'NotFound' }
            }

            res.status(200).json(data)
        } catch (error) {
            next(error);
        }
    }

    static async updateUser(req,res,next) {
        try {
            let data = await User.findByPk(req.user.id, {
                include: {
                    model: UserProfile,
                },
                attributes: {
                    exclude: ['password'],
                },
            })
            if (!data) {
                throw { name: "NotFound" }
            } else {
                const { username, email, gender, interest, show, fullname, birthdate, profilePicture, address, occupation, bio } = req.body
                await data.update({ username, email, gender, interest, show })
                await UserProfile.update({ fullname, birthdate, profilePicture, address, occupation, bio }, {
                    where: {
                        UserId: req.user.id
                    }
                })
                res.status(200).json({ message: 'profile has been updated succesfully' })
            }
        } catch (error) {
            next(error);
        }
    }

    static async deleteUser(req,res,next) {
        try {
            let data = await User.findByPk(req.user.id, {
                include: {
                    model: UserProfile,
                },
                attributes: {
                    exclude: ['password'],
                },
            })
            if (!data) {
                throw { name: "NotFound" }
            } else {
                await data.destroy()
                res.status(200).json({ message: `Account Deleted Successfully` })
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserController;