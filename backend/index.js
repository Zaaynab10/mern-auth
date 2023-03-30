const express=require('express')
const mongoose=require("mongoose")
const cors=require("cors")
const router = require('./Routes/AuthRoutes')
const cookieParser=require('cookie-parser')
const app=express()
//connection to our db and listening on port 7000
mongoose.connect("mongodb://127.0.0.1:27017/mern-auth-db",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{app.listen(7000) 
console.log('le serveur a ete connectee et ecoute au port 7000')}).catch((error)=>{console.log(error)})
// permet a http://localhost:3000/ d'utiliser l'api restful
app.use(cors({
    origin:["http://localhost:3000"],
    method:["GET","POST"],
    credentials:true,
}))
app.use(express.json())
app.use("/",router)
app.use(cookieParser())
