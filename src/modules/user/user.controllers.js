const {User} = require('../../models')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendWelcomeEmail = require('../../helpers/sendMAil');
const { json } = require('sequelize');
require("dotenv").config();

const getAllUsers = async (req, res, next) => {
  try {
    const users =await User.findAll({
      attributes: {
        exclude: ['password']
      }
    })
    res.json(users)
  } catch (error) {
    next(error)
  }
}

const registerUser = async (req, res, next) => {
    try {
        const newUser = req.body
        await User.create(newUser)
        res.status(201).end()
    } catch (error) {
        next(error)
    }
}
const loginUser = async (req, res, next) => {
    try {
      
        const { email, password } = req.body

        //verificar email
        const user = await User.findOne({where: {email}})

        if (!user) {
          throw {
            status: 400,
            error: 'User does not exist',
            message: 'You need register before login'
          }
          
        }

        //verificar contraseña
        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) {
          throw {
            status: 400,
            error: 'Incorrect password',
            message: 'The password does not match with the user'
          }
          
        }

        if (!user.validEmail) {
          throw {
            status: 401,
            error: 'Email verification needed',
            message: 'Look at your email messages for a verification email'
          }
      
        }

        //generar el token
        const copyUser = {...user.dataValues}
        delete copyUser.password
        const token = jwt.sign(copyUser, process.env.JWT_SECRET, {
            algorithm: 'HS512',
            expiresIn: '1h'
        })

        copyUser.token = token
        res.json(copyUser)
    } catch (error) {
      next(error)
    }
}

const validateUserEmail = async (req, res, next) => {
    try {
      
      const {token} = req.body

      //verificando que si halla un token valido
      if (!token) {
        throw {
          status: 400,
          message: 'token is required'
        }
      }

      //sacamos el email del token con un .verify
      const {email} = jwt.verify(token, process.env.JWT_EMAIL_SECRET, {
        algorithms: 'HS512'
      })

      //traemos el usurario donde el email del token coincida
      const user = await User.findOne({where: {email}})

      //miramos si el email ya esta verificado
      if (user.validEmail) {
        throw {
          status: 400,
          message: 'Email is already verifed'
        }
        
      }

      //si el email no esta verificado actualizamos el atributo validEmail a true, y guardamos los cambios en la base de con un .save()
      user.validEmail = true
      user.save()

      res.json({
        message: 'Email verified successfully'
      })
    } catch (error) {
      next(error)
    }
  }

  const reverifyEmail = async (req, res) => {
    try {
      const { email, ...data } = req.body
      sendWelcomeEmail(email, data)
      res.status(201).json({message: 'the new token was created'})
    } catch (error) {
      res.status(400).json(error)
    }
  }

  const uploadAvatar = async (req, res, next) => {
    try {
      const {file} = req
      const {id} = req.params

      const imageUrl = `${process.env.APP_URL}/avatar/${file.filename}`
      await User.update({avatar: imageUrl}, {
        where: {id}
      })
      res.status(204).end()
    } catch (error) {
      next(error)
    }
  }



module.exports = {
    registerUser,
    loginUser,
    validateUserEmail,
    reverifyEmail,
    getAllUsers,
    uploadAvatar
}