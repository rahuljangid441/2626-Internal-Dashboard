import axios from "../config/axiosConfig";

export const generateOpenAiImage = async(prompt) =>{
    const response = await axios.get('/api/v1/images/openai' , {params: { prompt }});
    console.log("response from openai image gen" , response.data);
    // return response.data.data[0];

    return response.data;
}

export const generateStabilityAiImage = async(prompt) =>{
    const response = await axios.get('/api/v1/images/stabilityai' , {params: { prompt }});
    
    return `data:image/png;base64,${response.data.data[0]}`;
}