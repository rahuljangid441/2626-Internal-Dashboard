import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3000
export const OPEN_AI_IMAGE_API_KEY = process.env.OPEN_AI_IMAGE_API_KEY
export const STABILITY_AI_IMAGE_API_KEY = process.env.STABILITY_AI_IMAGE_API_KEY
export const GEMINI_AI_TEXT_API_KEY = process.env.GEMINI_AI_TEXT_API_KEY
export const MONGO_DB_URL = process.env.MONGO_DB_URL