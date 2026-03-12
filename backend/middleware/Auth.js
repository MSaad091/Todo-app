
import jwt from 'jsonwebtoken'
import { User } from '../model/User.model.js';
const verifyJwt = async (req,res,next) => {
      const token = req.cookies.accessToken;

        if (!token) {
            return res.status(404).json({
                success:false,
                message:"Unauthorized"
            })
        }
    try {
      const  decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
      req.user = await User.findById(decoded._id);
      next()
    } catch (error) {
        console.log(error);
        return res.status(401).json({ success: false, message: "Invalid token" });
        
    }
}
export {verifyJwt}