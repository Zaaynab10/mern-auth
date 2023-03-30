const Users = require("../Models/UserModel")
const jwt=require('jsonwebtoken')

const checkUser=  (req,res,next)=>{
const token = req.cookies.jwt 
if(token){
jwt.verify(token,'my secret token',async(err,decodedToken)=>{
    if(err){
    res.json({status:false})
    next()}else{
        const user= await Users.findById(decodedToken.user)
        if(user){res.json({status:true,user:user.email})}else{
           res.json({status:false}) 
           next()
        }
    }
})
}else{
    res.json({status:false})
    next()
}
}




module.exports={checkUser}