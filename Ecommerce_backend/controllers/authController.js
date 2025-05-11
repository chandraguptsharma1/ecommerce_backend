const User = require('../models/user');
const bcryt = require('bcryptjs');
const jwt = require('jsonwebtoken')

exports.register = async (req,res)=>{

    const {name, email,password}= req.body;
    try{

        let user = await User.findOne({email});
        if(user) return res.status(400).json({msg:'User already exits'});

        const hashedPassword = await bcryt.hash(password,10);
        user = new User({name,email,password:hashedPassword})
        await user.save();

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1h'});
        res.json({token});
    }catch(err){
        res.status(500).send('Server Error')
    }
}