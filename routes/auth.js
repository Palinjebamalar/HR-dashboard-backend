const express=require("express")
const router=express.Router()
const bcrypt=require("bcryptjs")
const User=require("../models/User")
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/auth");


router.post("/register",async(req,res)=>{
    try{
    const {username,email,password,role}=req.body
    const hashedpassword=await bcrypt.hash(password,10)
    const user= new User({username,email,password:hashedpassword,role})
    await user.save()
    res.json("Registered Sucessfully")
    }
    catch(err){
        res.json({message:err.message})
    }

})

router.post("/login",async(req,res)=>{
    try{
    const {email,password}=req.body
    const user=await User.findOne({email})
    if(!user || !(await bcrypt.compare(password,user.password)))
        {
        res.json("Invalid credentials")
    }
    
    const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"1hr"})
    res.json({token})
    }
    catch(err){
        res.json({message:err.message})
    }

})


module.exports=router