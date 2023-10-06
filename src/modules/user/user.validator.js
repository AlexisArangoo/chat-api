const {check} = require('express-validator')
const validateResult = require('../../middlewares/validator.middleware')

const registerUserValidator = [
    check('firstname', 'Error con firstname')
        .exists().withMessage('no se incluye la propiedad firstname')
        .notEmpty().withMessage('El firstname no debe estar vacio')
        .isString().withMessage('El valor del firstname de ser string')
        .isLength({min: 2, max:50}).withMessage('La longitud del nombre debe ser min: 2 , max: 50')
        .matches(/^[a-zA-Z\s]/).withMessage('El firstname solo acepta letras'),

    check('lastname', 'Error con del campo lastname')
        .exists().withMessage('no se incluye la propiedad lastname')
        .notEmpty().withMessage('El lastname no debe estar vacio')
        .isString().withMessage('El valor del lastname de ser string')
        .isLength({min: 2, max:50}).withMessage('La longitud del nombre debe ser min: 2 , max: 50')
        .matches(/^[a-zA-Z\s]/).withMessage('El lastname solo acepta letras'),

    check('email', 'Error con el campo email')
        .exists().withMessage('La propiedad email no esta inculuida')
        .notEmpty().withMessage('La propiedad email no debe estar vacia')
        .isString().withMessage('La propiedad email debe ser un string')
        .isEmail().withMessage('La propiedad email no tiene formato de corre')
        .isLength({min: 7, max: 50}).withMessage("El email debe ser minimo 7 y máximo 50 caracteres"),

    check('password', 'Error en el campo password')
        .exists().withMessage('La propiedad password no esta inculuida')
        .notEmpty().withMessage("La propiedad password no debe estar vacia")
        .isString().withMessage("La propiedad password debe ser string")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%-^&*]{8,}$/).withMessage('La propiedad password debe ser minimo 8 caracteres, una mayuscula, una minuscula y un acaracter especial'),
    validateResult
]

const loginValidation = [
    check('email', 'Error con la propiedad email')
        .exists().withMessage('La propiedad email no esta inculuida')
        .notEmpty().withMessage('La propiedad email no debe estar vacia')
        .isString().withMessage('La propiedad email debe ser un string')
        .isEmail().withMessage('La propiedad email no tiene formato de corre'),

    check('password', 'Error en el campo password')
        .exists().withMessage('La propiedad password no esta inculuida')
        .notEmpty().withMessage("La propiedad password no debe estar vacia")
        .isString().withMessage("La propiedad password debe ser string"),

    validateResult
]

module.exports = {
    registerUserValidator,
    loginValidation
}