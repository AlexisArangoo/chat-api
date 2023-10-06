const { Router } = require('express')
const { createdConversationMessage, getConversationsMessages } = require('./messages.controllers')
const authenticate = require('../../middlewares/auth.middlewares')

const router = Router()

router.route('/conversation/:id')
    .post(authenticate, createdConversationMessage)
    .get(authenticate, getConversationsMessages)


module.exports = router