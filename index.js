const express= require('express')
const dataServices=require('./services/data.services')
const jwt=require('jsonwebtoken')
const cors= require('cors')
const app=express()

app.use(cors({
    origin:'http://localhost:4200'
}))
app.use(express.json())
const jwtMiddleware=(req,res,next)=>{
    try{
        const token=req.headers["x-access-token"]
        const data=jwt.verify(token,'supersecretkey123')
        req.currentIdd=data.currentIdd
        next()
    }catch{
        res.json({
            statusCode:401,
            status:false,
            message:"please login first"
        })
    }
}
app.post('/register',(req,res)=>{
    dataServices.register(req.body.uname,req.body.email,req.body.password,req.body.phone,req.body.date).then(result=>{
        res.status(result.statusCode).json(result)
    })
})
app.post('/login',(req,res)=>{
    dataServices.login(req.body.email,req.body.password).then(result=>{
        res.status(result.statusCode).json(result)
    })
})
app.post('/adminlogin',(req,res)=>{
    dataServices.adminlogin(req.body.username,req.body.password).then(result=>{
        res.status(result.statusCode).json(result)
    })
})
app.post('/userlist',(req,res)=>{
    dataServices.sort(req).then(result=>{
        res.status(result.statusCode).json(result)
    })
})




app.listen(3000,()=>{
    console.log("hai")
})