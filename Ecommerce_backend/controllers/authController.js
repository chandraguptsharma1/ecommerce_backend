const User = require('../models/user');
const bcryt = require('bcryptjs');
const jwt = require('jsonwebtoken')

exports.register = async (req,res)=>{

    const {name, email,password}= req.body;
    try{

        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                status:400,
                msg:'User already exits',
                data:null
            });
        } 

        const hashedPassword = await bcryt.hash(password,10);
        user = new User({name,email,password:hashedPassword})
        await user.save();

       return res.status(201).json({
        status:201,
        message:'User reqistered successfully',
        data:{
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            }
        }

       })
    }catch(err){
       return res.status(500).json({
        status:500,
        message:'Server error',
        data:null
       })
    }
}