const {Router} = require('express')
const { registerUser, loginUser, validateUserEmail, reverifyEmail, getAllUsers, uploadAvatar } = require("./user.controllers")
const authenticate = require('../../middlewares/auth.middlewares')
const { registerUserValidator, loginValidation } = require('./user.validator')
const upload = require('../../middlewares/imageUpload.middleware')


const router = Router()

router.route('/')
    .get(authenticate, getAllUsers)
    .post(registerUserValidator, registerUser)
    .get(authenticate, (req, res) => {
        res.json({ message: 'aqui van tus mensajes'})
    })

router.put('/:id',  upload.single('avatar'), uploadAvatar)

router.post('/login',loginValidation ,loginUser)

router.post('/validate', validateUserEmail)

router.route('/reverify-email')
    .post( reverifyEmail )

module.exports = router