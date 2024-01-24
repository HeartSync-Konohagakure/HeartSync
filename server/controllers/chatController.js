const { Chat, User, UserProfile } = require("../models");
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

    static async getUserChat(req,res,next) {
        try {
            const loggedInUserId = req.user.id;
    
            const existingChats = await Chat.findAll({
                where: {
                    [Op.or]: [
                        {
                            UserIdA: loggedInUserId,
                        },
                        {
                            UserIdB: loggedInUserId,
                        },
                    ],
                },
                include: [
                    {
                        model: User,
                        as: 'UserA',
                        include: {
                            model: UserProfile,
                            as: 'UserProfile',
                        },
                    },
                    {
                        model: User,
                        as: 'UserB',
                        include: {
                            model: UserProfile,
                            as: 'UserProfile',
                        },
                    },
                ],
            });
    
            if (existingChats) {
                const transformedChats = existingChats.map(chat => ({
                    id: chat.id,
                    UserIdA: chat.UserIdA,
                    UserIdB: chat.UserIdB,
                    createdAt: chat.createdAt,
                    updatedAt: chat.updatedAt,
                    User: loggedInUserId === chat.UserIdA ? chat.UserB : chat.UserA,
                }))
    
                return res.status(200).json(transformedChats)
            } else {
                throw { name: 'NotFound' };
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ChatController;