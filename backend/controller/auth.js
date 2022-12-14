const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
const User = require('../model/user');
const jwt = require('jsonwebtoken')

exports.signup = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) return

    const firstName=req.body.firstName
    const lastName=req.body.lastName
    const otherNames=req.body.otherNames
    const country=req.body.country
    const email=req.body.email
    const telephoneNumber=req.body.telephoneNumber
    const password=req.body.password

    try {
        const hashedPassword = await bcrypt.hash(password, 12)//number of times password is hashed

        const userDetails = {
            firstName: firstName,
            lastName: lastName,
            otherNames: otherNames,
            country: country,
            email: email,
            telephoneNumber: telephoneNumber,
            password: hashedPassword
        }

        const result = await User.save(userDetails)

        res.status(201).json({ message: 'User registered' })

    } catch (err) {
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err)
    }
}

exports.login = async (req, res, next) =>{
    const email = req.body.email
    const password=req.body.password

    try{
        const user=await User.find(email)
    //Checks if user doesnt exist, throw error
        if(user[0].length !==1){
            const error = new Error('A user with this email could not be found.')
            error.statusCode= 401
            throw error
        }
        const storedUser=user[0][0]
    //Compares if passwords are the same.
        const isEqual = await bcrypt.compare(password, storedUser.password)

        if (!isEqual){
            const error = new Error('Wrong Password')
            error.statusCode= 401
            throw error
        }
    //Assigns copy of token to localStorage
        const token = jwt.sign(
            {
              email:storedUser.email,
              userId: storedUser.id  
            },
            'secretfortoken',
            { expiresIn:'1h' }
        )

        res.status(200).json({ token: token, userId: storedUser.id })

    }catch (err) {
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err)
    }
}