import { signInService , signUpService } from "../services/user.js";

export const signUpController = async(req ,res)=>{
    try{
        const response = await signUpService({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        });

        return res.status(201).json({
            message: "user created successfully",
            success: true,
            data: response
        })
    }
    catch(err){
        console.log("Error in signUpController", err);
        return res.status(401).json({
            message: "Error in signUpController",
            success: false,
            err: err.message
        })

    }
}


export const signInController = async(req , res)=>{
    try{
        const {user , token} = await signInService({
            email:req.body.email,
            password:req.body.password
        });

        res.cookie("token" , token ,{
            httpOnly:true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: "none",
            secure: true
        })

        return res.status(200).json({
            message: "user signed in successfully",
            success: true,
            data: {user : {email: user.email}  }
        })
    }
    catch(err){
        console.log("Error in signInController", err);
        return res.status(401).json({
            message: "Error in signInController",
            success: false,
            err: err.message
        })
    }
}