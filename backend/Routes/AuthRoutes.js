const express=require('express')
const { register, login } = require('../Controllers/AuthControllers')
const { checkUser } = require('../Middlewares/authMiddlewares')
const router=express.Router()
router.post("/",checkUser)
 router.post('/register',register)
 router.post('/login',login)

 module.exports=router