const {Message, User} = require('../../models')

const createdConversationMessage = async (req, res, next) => {
    try {
        const {id: conversationId} = req.params
        const {senderId, content} = req.body

        await Message.create({
            conversationId, senderId, content
        })

        res.status(201).end()
    } catch (error) {
        next(error)
    }
}

const getConversationsMessages = async (req, res, next) => {
    try {
        const {id: conversationId} = req.params;
        const messages = await Message.findAll({
            where: {conversationId},
            include: {
                model: User,
                attributes: ['firstname', 'lastname', 'avatar']
            }
        })

        res.json(messages)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createdConversationMessage,
    getConversationsMessages
}
