const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt  = require('bcrypt')
const validator = require('validator')


// Login
const loginUser = async (req,res) =>{
    const {email,password} = req.body
    try{
        const user = await User.findOne({email})

        if(!user){
            return res.json({success:false,message:'User doesn.t exist'})
        }
        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.json({success:false,message:'Envalid credentials'})
        }

        const token = createToken(user._id)
        res.json({success:true,token})

    }catch(error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}
const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}
//register
const registerUser = async (req,res) =>{
    const {name,password,email} = req.body
    try{
        const exists = await User.findOne({email})
        if(exists){
            return res.json({success:false,message:'user already exists'})
        }

        //validate email formate & password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:'please enter valide email'})
        }
        if(password.length<8){
            return res.json({success:false,message:'please enter a strong password'})
        }

        //hash password

        const salt = await bcrypt.genSalt(10)

        const hashedPass = await bcrypt.hash(password,salt)

        const newUser = new User({
            name:name,
            email:email,
            password:hashedPass
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true ,token})
    }catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

module.exports = {loginUser ,registerUser}