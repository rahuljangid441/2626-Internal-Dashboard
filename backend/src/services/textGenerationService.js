import { GEMINI_AI_TEXT_API_KEY } from "../config/serverConfig.js";
export const textGenerationGeminiApi = async(prompt)=>{
    try{
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_AI_TEXT_API_KEY}`,
    {
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            contents: [
                {
                    parts: [
                        {
                            text: prompt
                        }
                    ]
                }
            ]
        })
    }
)
const data = await response.json();
const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response"
const htmlText = generatedText.replace(/\n/g, '<br/>');
console.log("data from gemini text service is" , generatedText);
return generatedText;
    }
    catch(err){
        console.log("Error in textGenerationGeminiApi in service", err);
        throw new Error(err);
    }
}