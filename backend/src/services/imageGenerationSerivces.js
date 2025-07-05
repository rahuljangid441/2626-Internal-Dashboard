import { OPEN_AI_IMAGE_API_KEY , STABILITY_AI_IMAGE_API_KEY } from "../config/serverConfig.js";
export const imageGenerationOpenAi = async(prompt) =>{
    try {
        const response = await fetch(
            "https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${OPEN_AI_IMAGE_API_KEY}`,
                "User-Agent": "OpenAI-DallE-WebUI/1.0"
            },
            body: JSON.stringify({
                prompt: prompt,
                n: 1,
                size: "1024x1024",
                model: "dall-e-3"
            })
        }
        );
        if (!response.ok) {
            throw new Error("Failed to generate image");
        }
        let data = await response.json();
        return data;
    }
    catch (err) {
        throw new Error(err.message);
    }
}






export const imageGenerationStabilityAi = async(prompt) =>{
    console.log("prompt for stability ai in service",prompt);
    try {
        const response = await fetch(
            "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${STABILITY_AI_IMAGE_API_KEY}`,
                "User-Agent": "StabilityAi-WebUI/1.0"
            },
            body: JSON.stringify({
                text_prompts:[{text: prompt}],
                cfg_scale: 7,
                height: 1024,
                width: 1024,
                samples: 1,
                steps: 30,
                seed: 42
            })
        }
        );
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("Stability AI error:", errorData);
            throw new Error(errorData.error || errorData.message || "Failed to generate image");
        
        }
        let data = await response.json();
        return data;
    }
    catch (err) {
        throw new Error(err.message);
    }
}