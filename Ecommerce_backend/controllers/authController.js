const User = require('../models/user');
const bcryt = require('bcryptjs');
const jwt = require('jsonwebtoken')

exports.register = async (req,res)=>{

    const {name, email,password}= req.body;
    try{

        let register = await User.findOne({email});
        if(register){
            return res.status(400).json({
                status:400,
                msg:'User already exits',
                data:null
            });
        } 

        const hashedPassword = await bcryt.hash(password,10);
        const newUser  = new User({name,email,password:hashedPassword})
        await newUser .save();

       return res.status(201).json({
        status:201,
        message:'User reqistered successfully',
        data:{
            user:{
                id:newUser ._id,
                name:newUser .name,
                email:newUser .email
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

export.login = async(req,res)=>{

}