import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";
export const authenticateToken = async(req ,res , next)=>{
   
    // const token = req.headers.authorization?.split(" ")[1];
    const token = req.cookies.token;
    console.log("token is here",token);
    if(!token){
        return res.status(401).json({
            message:"Token is required",
        });

    }
    try{
        const decoded = jwt.verify(token , JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(err){
        return res.status(401).json({
            message: "Invalid token",
            success: false,
            err: err.message
        })
    }
}