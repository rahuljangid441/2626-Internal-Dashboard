import {signUpRepository , signInRepository , findUserByEmailRepository } from  "../repositories/user.js" 
import { generateToken } from "../utils/jwtUtility.js";

export const signUpService = async({name , email , password})=>{
    try{
        const existingUser = await findUserByEmailRepository({email});
        if(existingUser){
            throw new Error("User already exists");
        }
        const user = await signUpRepository({name , email , password});
        return user;
    }
    catch(err){
        console.log("Error in signUpService", err);
        throw new Error(err);
    }
}

export const signInService = async({email , password})=>{
    try{
        const existingUser = await findUserByEmailRepository({email});
        if(!existingUser){
            throw new Error("User not found");
        }
        
        const user = await signInRepository({email , password});
        const token = generateToken(user);
        return {
            user,
            token
        };
    }  
    catch(err){
        console.log("Error in signInService", err);
        throw new Error(err);
    }
}