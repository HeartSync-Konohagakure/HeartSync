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
}

module.exports = MatchesController;