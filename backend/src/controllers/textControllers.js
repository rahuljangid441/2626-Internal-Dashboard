import { OPEN_AI_IMAGE_API_KEY , GEMINI_AI_TEXT_API_KEY } from "../config/serverConfig.js";

import { textGenerationGeminiApi as textGenerationGeminiApiService} from '../services/textGenerationService.js';

export const openAiTextController = async(req , res) => {
    try{
        const response = await fetch('https://api.openai.com/v1/chat/completions' , 
            {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${OPEN_AI_IMAGE_API_KEY}`,
                     'User-Agent' : 'OpenAI-DallE-WebUI/1.0'

                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'user',
                            content: req.query.prompt
                        }
                    ],
                    max_tokens: 1000,
                    temperature: 0.7
                })
            }

        )
        
        const data = await response.json();
        console.log("data from openai text controller is" , data);
        return res.status(201).json({
            message: 'OpenAi text controller is called',
            success: true,
            data:data.choices[0].message.content
        })
        
        
    }
    catch(err){
        console.log("Error in openAiTextController", err);
        throw new Error(err);
    }
}


export const geminiTextController = async(req , res) => {
    try{
        const generatedText = await textGenerationGeminiApiService(req.query.prompt);
        return res.status(201).json({
            message: 'Gemini text controller is called',
            data:generatedText,
            success: true,
        })
    }
    catch(err){
        console.log("Error in geminiTextController", err);
        throw new Error(err);
    }
}