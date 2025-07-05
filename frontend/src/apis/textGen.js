import axios from "../config/axiosConfig";

export const generateOpenAiText = async(prompt) =>{
    const response = await axios.get('/api/v1/text/openai' , {params: { prompt }});
    console.log("response from openai image gen" , response.data);
    // return response.data.data[0];

    return response.data;
}

export const generateGeminiText = async(prompt) =>{
    const response = await axios.get('/api/v1/text/gemini' , {params: { prompt }});
    
  return response.data;
}