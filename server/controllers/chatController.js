const { Chat, User, UserProfile, Message } = require("../models");
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

    static async sendMessage(req,res,next) {
        try {
            if (req.body.content === '') {
                throw { name: "Message is Required" }
            }
            let newMessage = await Message.create({
                SenderId: req.user.id,
                ReceiverId: req.body.ReceiverId,
                content: req.body.content,
                ChatId: req.body.ChatId,
            })
            return res.status(201).json(newMessage)
        } catch (error) {
            next(error);
        }
    }

    static async fetchMessage(req,res,next) {
        try {
            let message = await Message.findAll({
                where: {
                    ChatId: req.params.ChatId
                },
                order: [['id', 'ASC']]
            })
            return res.status(200).json(message)
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ChatController;