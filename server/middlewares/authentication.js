const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req,res,next) {
    try {
        let { authorization } = req.headers
        if (!authorization) {
            throw { name: "invalidToken" }
        }
        let rawToken = authorization.split(' ')
        if (rawToken[0] !== "Bearer") {
            throw { name: "invalidToken" }
        }
        let checkVerifyToken = verifyToken(rawToken[1])
        let findUser = await User.findByPk(checkVerifyToken.id)
        if (!findUser) {
            throw { name: "invalidToken" }
        }
        req.user = findUser
        next()
    } catch (error) {
        next(error);
    }
}

module.exports = authentication;