import { User } from "../model/User.model.js";
import bcrypt from 'bcrypt'


const Token = async(userId) => {
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({
            success:false,
            messaage:"User Not Found"
        })
    }
    const accessToken = user.generateToken();
    await user.save({ validateBeforeSave: false })
    return {accessToken}
}

const RegisterUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log(req.body);

        if (!username) {
            return res.status(400).json({
                success: false,
                message: "Username is required"
            })
        }
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            })
        }
        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required"
            })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        const hashpassword = await bcrypt.hash(password, 10);

        const createUser = await User.create({
            username,
            email,
            password: hashpassword
        })

        return res.status(200).json({
            success: true,
            message: "User created successfully",
            user: createUser
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}

// const LoginUser = async (req,res) => {
//     try {
//         const {email,password} = req.body;

//         if (!email) {
//             return res.status(404).json({
//                 success:false,
//                 messaage:"Email is Required"
//             })
//         }
//          if (!password) {
//             return res.status(404).json({
//                 success:false,
//                 messaage:"Password is Required"
//             })
//         }

//         const user = await User.findOne({email}) 
//         if (!user) {
//             return res.status(400).json({
//                 success:false,
//                 messaage:"User Does Not Exist"
//             })
//         } 

//         const isMatch = await bcrypt.compare(password, user.password)
//             if (!isMatch)
//       return res.status(401).json({ success: false, message: "Invalid password" });
//     const {accessToken} = await Token(user._id)


// //     return res.status(200).cookie("accessToken",accessToken,{
// //         httpOnly: true,          
// //   secure: false, 
// //     }).json({
// //         success:true,
// //         messaage:"USer Login SuccessFuly",
// //         user
// //     })
// res.cookie("accessToken", accessToken, {
//   httpOnly: true,
//   secure: true,
//   sameSite: "none"
// })
//     } catch (error) {
//         console.log(error);
        
//     }
// }
const LoginUser = async (req,res) => {
  try {

    const {email,password} = req.body;

    if (!email) {
      return res.status(400).json({
        success:false,
        message:"Email is Required"
      })
    }

    if (!password) {
      return res.status(400).json({
        success:false,
        message:"Password is Required"
      })
    }

    const user = await User.findOne({email})

    if (!user) {
      return res.status(400).json({
        success:false,
        message:"User Does Not Exist"
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(401).json({
        success:false,
        message:"Invalid password"
      })
    }

    const {accessToken} = await Token(user._id)

    return res
      .status(200)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none"
      })
      .json({
        success:true,
        message:"User Login Successfully",
        user
      })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success:false,
      message:"Server Error"
    })
  }
}
const logoutUser = async (req, res) => {
  try {

    await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          accessToken: undefined
        }
      }
    );

    return res
      .status(200)
      .clearCookie("accessToken")
      .json({
        success: true,
        message: "User Logout Successfully"
      });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};
export {RegisterUser,LoginUser,logoutUser}
