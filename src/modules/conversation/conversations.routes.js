const {Router} = require('express')
const { createConversation, createGroupConversation,  getAllConversations} = require('./conversations.controllers')
const authenticate = require('../../middlewares/auth.middlewares')
const { createdConversationValidator } = require('./conversations.validtors')

const router = Router()

router.post('/', authenticate, createdConversationValidator, createConversation)
router.post('/group', authenticate, createGroupConversation)

router.get('/:id', authenticate, getAllConversations)


module.exports = router