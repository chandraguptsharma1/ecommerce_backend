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

exports.login = async(req,res)=>{
    const {email,password} = req.body();

    try{
        let user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                status:400,
                message:'Invalid credentials: User not found',
                data:null
            })
        }

        const isMatch = await bcryt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({
                status:400,
                message:'Invalid credentials: incorrect password',
                data:null
            }) 
        }

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn : '1h'
        });

        return res.status(200).json({
            status:200,
            message:'Login successful',
            data:{
                token,
                user: {
                  id: user._id,
                  name: user.name,
                  email: user.email
                }
            }
        })
    }catch(err){
        console.error(err);
        return res.status(500).json({
          status: 500,
          message: 'Server error',
          data: null
        });
    }
}