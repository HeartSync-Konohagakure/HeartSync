const { User, UserProfile } = require("../models");

async function authorizationUser(req,res,next) {
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
        }
        if (req.user.id !== data.UserProfile.UserId) {
            throw { name: 'Forbidden' }
        }
        next()
    } catch (error) {
        next(error);
    }
}

module.exports = authorizationUser;