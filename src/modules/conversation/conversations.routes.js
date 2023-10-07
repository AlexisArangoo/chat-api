const {Router} = require('express')
const { createConversation, createGroupConversation,  getAllConversations, deleteConversation} = require('./conversations.controllers')
const authenticate = require('../../middlewares/auth.middlewares')
const { createdConversationValidator } = require('./conversations.validtors')

const router = Router()

router.post('/', authenticate, createdConversationValidator, createConversation)
router.post('/group', authenticate, createGroupConversation)

router.route('/:id')
    .get( authenticate, getAllConversations)
    .delete(authenticate, deleteConversation)


module.exports = router