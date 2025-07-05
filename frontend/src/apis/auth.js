import axios from "../config/axiosConfig";

export const signup = async({name , email , password})=>{
    const response = await axios.post('/api/v1/login/signup' , {name , email , password});

    return response.data;
}

export const signin = async({email , password}) => {
    const response = await axios.post('/api/v1/login/signin' , {email , password});
    return response.data;
}