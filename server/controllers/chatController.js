const { Chat } = require("../models");
const { Op } = require("sequelize");

class ChatController {
    static async createChat(req,res,next) {
        try {
            let userLogin = req.user.id
            let whoToChatWith = Number(req.params.idUser)
            const existingChat = await Chat.findOne({
                where: {
                    [Op.or]: [
                        {
                            UserIdA: userLogin,
                            UserIdB: whoToChatWith,
                        },
                        {
                            UserIdA: whoToChatWith,
                            UserIdB: userLogin,
                        },
                    ],
                },
            })
            if (existingChat) {
                throw { name: 'Chat Not Available' }
            }
            let newChat = await Chat.create({
                UserIdA: userLogin,
                UserIdB: whoToChatWith,
            })
            return res.status(201).json({
                message: 'Chat Created Successfully',
                newChat
            })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ChatController;