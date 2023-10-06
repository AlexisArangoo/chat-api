const userRoutes = require('../modules/user/user.routes')
const  conversationsRoutes = require('../modules/conversation/conversations.routes')
const messageRoutes = require('../modules/message/messages.routes')
const swaggerUi = require('swagger-ui-express')
const swaggerDoc = require('../swagger.json')

const apiv1Routes = (app) => {
    app.use('/api/v1/users', userRoutes)
    app.use('/api/v1/conversations', conversationsRoutes)
    app.use('/api/v1/messages', messageRoutes)
    app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))
}

module.exports = apiv1Routes