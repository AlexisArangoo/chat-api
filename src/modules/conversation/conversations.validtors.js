const {check} = require('express-validator')
const validateResult = require('../../middlewares/validator.middleware')

const createdConversationValidator = [
    check('userId', 'Error en el userId')
        .exists().withMessage('no se incluye la propiedad userId')
        .notEmpty().withMessage('El userId no debe de estar vacio'),
        
    check('participantId', 'Error en el participantId')
        .exists().withMessage('no se incluye la propiedad participantId')
        .notEmpty().withMessage('El participantId no debe de estar vacio'),
        
]

module.exports = {
    createdConversationValidator
}
