const express= require('express')
const bodyParser= require('body-parser')
const authRoutes = require('./routes/auth')
const errorController= require('./controller/error')
const app = express()
const port= process.env.PORT || 5000

app.use(bodyParser.json())

//Middleware
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*'); //CORS for use with Angular
    res.setHeader('Access-Control-Allow-Methods','GET, POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization')
    next()
})

app.use('/auth', authRoutes);

app.use(errorController.get404) //For non-existent routes

app.use(errorController.get500) //For server error



//Assigned port
app.listen(port, ()=>console.log(`Listening on port ${port}`))