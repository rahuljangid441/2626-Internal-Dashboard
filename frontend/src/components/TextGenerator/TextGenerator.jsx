import { useState } from "react";
import { generateOpenAiText,generateGeminiText } from "../../apis/textGen";

export default function TextGenerator({
    setGeneratedText,
    setIsGenerating
}){
    const [prompt , setPrompt] = useState("");
    const [model , setModel] = useState("openai");

    const handleSubmit = async(e) =>{
        e.preventDefault();
        setIsGenerating(true);
        setGeneratedText("");
        try{
            if(model === "openai"){
                const text = await generateOpenAiText(prompt);
                setGeneratedText(text.data);
            }
            else{
                const text = await generateGeminiText(prompt);
                setGeneratedText(text.data);
            }
        }
        catch(error){
            console.error("Error generating text:", error);
        }
        finally{
            setIsGenerating(false);
        }
    }

    return(
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select AI Model</label>

                <select value={model} onChange={(e)=>setModel(e.target.value)} className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option value="openai">OpenAI</option>
                    <option value="gemini">Gemini</option>
                </select>
            </div>


            <div>
                <textarea rows={4} value={prompt} onChange={(e)=>setPrompt(e.target.value)} className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter your prompt here"/>
            </div>

            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Generate Text</button>
        </form>
    )
}
