import { imageGenerationOpenAi as imageGenerationOpenAiService , imageGenerationStabilityAi as imageGenerationStabilityAiService } from "../services/imageGenerationSerivces.js";
export const imageOpenAiController = async (req, res) => {

    try {
        const data = await imageGenerationOpenAiService(req.query.prompt);
        console.log("images for open ai",data);
        return res.status(201).json({
            message: "Image generated successfully by OpenAi",

            data: {
                url: data.data[0].url,
                revised_prompt: data.data[0].revised_prompt
            }
            // data: data.data.map((img) => {
                // return img.url
            // })


            // data: data.data.map((img) => ({
                // url: img.url,
                // revised_prompt: img.revised_prompt
            // })),
            // revisedPrompt: data.revised_prompt
        });

    }
    catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }


}

export const imageStabilityAiController = async(req , res) =>{
    try{
        console.log("prompt for stability ai",req.query.prompt);
        const data = await imageGenerationStabilityAiService(req.query.prompt);
        console.log("images for stability ai",data);
        return res.status(201).json({
            message: "Image generated successfully by StabilityAi",
            data: data.artifacts.map((img)=>{
                return img.base64;
            })
        })
    }
    catch(err){
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        })
    }
}