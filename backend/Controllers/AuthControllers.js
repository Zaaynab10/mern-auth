const Users = require("../Models/UserModel")
const jwt=require('jsonwebtoken')
const bcrypt =require('bcrypt')
const express=require('express')

const register= async (req,res,next)=>{
    try{ const {email}=req.body
    const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
   const password=bcrypt.hashSync(req.body.password,salt)
   const user= await  Users({
    email,
    password
   })
   user.save()
   
 const token = jwt.sign({user:user._id}, "my secret token", {expiresIn:"1d"})
 res.cookie('jwtToken',token,{ httpOnly: true }).status(201).json({user:user._id , created:true})}catch(error){
    console.log(error)
}

}



const login=async(req,res,next)=>{
    const token = jwt.sign({user:user._id}, "my secret token", {expiresIn:"1d"})
 res.cookie('jwtToken',token,{ httpOnly: true }).status(201).json({user:user._id , created:true})
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
       const password=bcrypt.hashSync(req.body.password,salt)
try{
  const user= await  Users.findOne({email})
if(user){
    const auth =bcrypt.compare(user.password,password)
    if(auth){
        const token = jwt.sign({user:user._id}, "my secret token", {expiresIn:"1d"})
      return  res.cookie('jwtToken',token,{ httpOnly: true }).status(201).json({user:user._id , created:true})

    } throw Error ("incorrect password")
}throw Error ("incorrect email")
}catch(error){
    console.log(error)
}


}

module.exports={register,login}