const express = require('express')
const User = require('../model/user')
const router = express.Router()
const {body} = require('express-validator')
const authController= require('../controller/auth')

//Validates that input isnt empty/email doesnt already exist

router.post(
    '/signup',
    [
        body('firstName').trim().not().isEmpty(),
        body('lastName').trim().not().isEmpty(),
        body('otherNames').trim().not().isEmpty(),
        body('country').trim().not().isEmpty(),
        body('email').isEmail().withMessage('Please enter a valid email.').custom(async (email)=>{
            const user = await User.find(email);
            if (user[0].length > 0){
                return Promise.reject('Email address already exist')
            }
        })
        .normalizeEmail(),
        body('telephoneNumber').trim().not().isEmpty(),
        body('password').trim().isLength({ min:7 })

    ], authController.signup
)

router.post(
    '/login', authController.login
    
)


module.exports = router