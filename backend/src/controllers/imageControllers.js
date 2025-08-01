import { imageGenerationOpenAi as imageGenerationOpenAiService , imageGenerationStabilityAi as imageGenerationStabilityAiService } from "../services/imageGenerationSerivces.js";
import fs from 'fs';
import fetch from 'node-fetch';
import  FormData  from "form-data";
import { OPEN_AI_IMAGE_API_KEY  } from "../config/serverConfig.js";
import sharp from "sharp";


import OpenAI, { toFile } from "openai";
const openai = new OpenAI({ apiKey: process.env.OPEN_AI_IMAGE_API_KEY });

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

export const editImageOpenAiController = async(req , res)=>{
    try{
        const prompt = req.body.prompt;
        const imageFile = req.file;
        console.log("Uploaded file info:", imageFile);
        if(!prompt || !imageFile){
            return res.status(400).json({
                message: "Prompt and image file are required"
            });
        }

        // Convert image to PNG with alpha channel (RGBA)
        const processedPath = imageFile.path + "_rgba.png";
        await sharp(imageFile.path)
            .ensureAlpha() // Adds alpha channel if missing
            .png()
            .toFile(processedPath);

        // Get image dimensions
        const { width, height } = await sharp(processedPath).metadata();

        // Generate a white mask (all editable)
        const maskPath = imageFile.path + "_mask.png";
        await sharp({
            create: {
                width,
                height,
                channels: 4,
                background: { r: 255, g: 255, b: 255, alpha: 1 }
            }
        })
        .png()
        .toFile(maskPath);

        const formData = new FormData();
        formData.append("image", fs.createReadStream(processedPath),{
            filename: imageFile.originalname.replace(/\.[^/.]+$/, "") + ".png",
            contentType: "image/png"
        });
        formData.append("mask", fs.createReadStream(maskPath), {
            filename: "mask.png",
            contentType: "image/png"
        });
        formData.append("prompt", prompt);
        formData.append("n", 1);
        formData.append("size", "1024x1024");

        const response = await fetch('https://api.openai.com/v1/images/edits' ,{
            method: "POST",
            headers:{
                'Authorization': `Bearer ${OPEN_AI_IMAGE_API_KEY}`,
                ...formData.getHeaders()
            },
            body: formData
        });
        const data = await response.json();
        // Clean up all files
        fs.unlink(imageFile.path , (err)=>{
            if(err){
                console.log("error in deleting image file",err);
            }
        });
        fs.unlink(processedPath, (err) => {
            if (err) {
                console.log("error in deleting processed image file", err);
            }
        });
        fs.unlink(maskPath, (err) => {
            if (err) {
                console.log("error in deleting mask file", err);
            }
        });
        if(!response.ok){
            console.log("error in response",data);
            return res.status(response.status).json({
                message:"Open Api Image Edit Failed",
                error: data.error.message
            });
        }

        return res.status(201).json({
            message: "Image edited successfully by OpenAi",
            data: data.data[0].url
        })
    }
    catch(err){
        console.log("error in edit image open ai",err);
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        })
    }
}




export const editImageDallEController = async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const imageFile = req.file;
        if (!prompt || !imageFile) {
            return res.status(400).json({
                message: "Prompt and image file are required"
            });
        }

        // Prepare the image for OpenAI SDK
        const image = await toFile(fs.createReadStream(imageFile.path), null, {
            type: "image/png"
        });

        // Call the DALL-E 3 edit endpoint
        const response = await openai.images.edit({
            model: "gpt-image-1",
            image,
            prompt,
        });

        // Clean up uploaded file
        fs.unlink(imageFile.path, () => {});

        // Return the result
        const image_base64 = response.data[0].b64_json;
        return res.status(200).json({
            message: "Image edited successfully by DALL-E 3",
            data: { b64_json: image_base64 }
        });
    } catch (err) {
        console.error("Error in editImageDallEController:", err);
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
};