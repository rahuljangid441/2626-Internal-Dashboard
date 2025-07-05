import User from "../schema/userSchema.js"


export const findUserByEmailRepository = async({email})=>{
    try{
        const existingUser = await User.findOne({email});
        return existingUser;
    }
    catch(err){
        console.log("error in findUserByEmail", err);
        throw new Error(err);
    }
}

export const signUpRepository = async({name , email , password})=>{
    try{
        const user = await User.create({
            name, 
            email,
            password
        });


        return user;
    }
    catch(err){
        console.log("error in signUpRepository", err);
        throw new Error(err);
    }
}

export const signInRepository = async({email , password}) => {
    try{
        const user = await User.findOne({email});
        if(!user){
            throw new Error("User not found");
        }
        if(!await user.comparePassword(password)){
            throw new Error("Invalid password");
        }
        return user;
    }
    catch(err){
        console.log("error in signInRepository" , err);
        throw new Error(err);
    }
}