const { User, UserProfile, Connection } = require("../models");

class MatchesController {
    static async likeUser(req,res,next) {
        try {
            let data = await User.findByPk(req.user.id)
            if (!data) {
                throw { name: "NotFound" }
            }
            let targetLikeUser = await User.findByPk(req.params.idUser)
            if (!targetLikeUser) {
                throw { name: "User Not Found" }
            }
            let existingConnection = await Connection.findOne({
                where: {
                    UserIdA: req.user.id,
                    UserIdB: req.params.idUser,
                },
            })
            if (existingConnection) {
                throw { name: "Duplicate" }
            }
            await Connection.create({
                UserIdA: req.user.id,
                UserIdB: req.params.idUser,
                status: 'liked',
            })
            return res.status(200).json({ message: 'You Have Like This Person' })
        } catch (error) {
            next(error);
        }
    }

    static async dislike(req,res,next) {
        try {
            let data = await User.findByPk(req.user.id)
            if (!data) {
                throw { name: "NotFound" }
            }
            let targetLikeUser = await User.findByPk(req.params.idUser)
            if (!targetLikeUser) {
                throw { name: "User Not Found" }
            }
            let existingConnection = await Connection.findOne({
                where: {
                    UserIdA: req.user.id,
                    UserIdB: req.params.idUser,
                },
            })
            if (existingConnection) {
                throw { name: "Duplicate" }
            }

            await Connection.create({
                UserIdA: req.user.id,
                UserIdB: req.params.idUser,
                status: 'disliked',
            })
            return res.status(200).json({ message: 'You Have Dislike This Person' })
        } catch (error) {
            next(error);
        }
    }

    static async fetchMatch(req,res,next) {
        try {
            const loggedInUserId = req.user.id
            // to get user(s) interested in logged-in user
            const likedUsers = await Connection.findAll({
                where: {
                    UserIdA: loggedInUserId,
                    status: 'liked',
                },
            })
            // to get user(s) liked by logged-in user
            const likedBackUsers = await Connection.findAll({
                where: {
                    UserIdB: loggedInUserId,
                    status: 'liked',
                },
            })
            // filtering for user(s) who liked logged-in user back
            const matchedUsers = likedUsers.filter((userA) =>
                likedBackUsers.some((userB) => userA.UserIdB === userB.UserIdA)
            )

            // if there are no users matched with logged-in user
            if (matchedUsers.length === 0) {
                throw { name: "NotAvailable" }
            }

            // get user information for those who like each other
            const matchedUserIds = matchedUsers.map((user) => user.UserIdB)
            // get userProfile information
            const matchedUserDetails = await User.findAll({
                where: {
                    id: matchedUserIds,
                },
                include: {
                    model: UserProfile,
                },
                attributes: {
                    exclude: ['remainingLikes', 'password', 'show'],
                },
            })
            res.status(200).json({
                message: 'Data Received Successfully',
                data: matchedUserDetails,
            })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = MatchesController;