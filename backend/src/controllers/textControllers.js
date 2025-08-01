import { OPEN_AI_IMAGE_API_KEY , GEMINI_AI_TEXT_API_KEY } from "../config/serverConfig.js";

import { textGenerationGeminiApi as textGenerationGeminiApiService} from '../services/textGenerationService.js';
import { processTextGenerationWithChat } from '../services/chatHistoryService.js';

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
        return res.status(500).json({
            success: false,
            message: "Failed to generate text",
            error: err.message
        });
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
        return res.status(500).json({
            success: false,
            message: "Failed to generate text",
            error: err.message
        });
    }
   
   
   
}


export const openAiTextWithChatController = async(req, res) => {
    try {
        const { prompt } = req.body;
        const userId = req.user.id;

        if (!prompt) {
            return res.status(400).json({
                success: false,
                message: "Prompt is required"
            });
        }

        
        const openAiTextGeneration = async (prompt) => {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPEN_AI_IMAGE_API_KEY}`,
                    'User-Agent': 'OpenAI-DallE-WebUI/1.0'
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    max_tokens: 1000,
                    temperature: 0.7
                })
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error?.message || 'OpenAI API error');
            }

            return data.choices[0].message.content;
        };

        // Process with chat history
        const result = await processTextGenerationWithChat(
            userId,
            prompt,
            'gpt-3.5-turbo',
            openAiTextGeneration
        );
        console.log("result from openAiTextWithChatController is" , result);

        return res.status(200).json({
            success: true,
            message: "Text generated successfully with chat history",
            data: {
                chat: result.chat,
                generatedText: result.textResult
            }
        });

    } catch (error) {
        console.log("Error in openAiTextWithChatController", error);
        return res.status(500).json({
            success: false,
            message: "Failed to generate text with chat",
            error: error.message
        });
    }
};

export const geminiTextWithChatController = async(req, res) => {
    try {
        const { prompt } = req.body;
        const userId = req.user.id;

        if (!prompt) {
            return res.status(400).json({
                success: false,
                message: "Prompt is required"
            });
        }

     
        const result = await processTextGenerationWithChat(
            userId,
            prompt,
            'gemini',
            textGenerationGeminiApiService
        );

        return res.status(200).json({
            success: true,
            message: "Text generated successfully with chat history",
            data: {
                chat: result.chat,
                generatedText: result.textResult
            }
        });

    } catch (error) {
        console.log("Error in geminiTextWithChatController", error);
        return res.status(500).json({
            success: false,
            message: "Failed to generate text with chat",
            error: error.message
        });
    }
};