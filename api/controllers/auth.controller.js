import User from "../model/User.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import { errorHandler } from "../utils/error.js"


export const register = async (req, res,next) => {
    const { name, email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (user) {
        return next(errorHandler(409,"Email Already Exists"))
      }
  
      const newUser = new User({ name, email, password });
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newUser.password, salt);
      newUser.password = hash;
  
      const savedUser = await newUser.save();
  
      const payload = { id: savedUser._id, name: savedUser.name };
      const token = await jwt.sign(payload,process.env.JWT_SECRET );
     
  
      res.status(201).json({
        success: true,
        token: 'Bearer ' + token,
      });
    } catch (error) {
        next(error)
    }
  };
  

  export const login = async (req, res,next) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) return next(errorHandler(404,"No User Found"))
        
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (isMatch) {
        const payload = { id: user._id };
        const token = await jwt.sign(payload,process.env.JWT_SECRET);
        console.log(token)
        const {password:pass,...rest} = user._doc
        res.cookie('Bearer', token, {httpOnly: true }).status(201).json(rest)
      } if(!isMatch) return next(errorHandler(401,"Invalid Passoword"))
    } catch (error) {
     next(error)
    }
  };
   