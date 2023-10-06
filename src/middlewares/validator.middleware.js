const {validationResult} = require('express-validator')

const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw()
        next()
    } catch (error) {
        next({
            status: 400,
            error: 'Invalid data',
            message: error.array().map(err => err.msg)
        })
    }
}

module.exports = validateResult