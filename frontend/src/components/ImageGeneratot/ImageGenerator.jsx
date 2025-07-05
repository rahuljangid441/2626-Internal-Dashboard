import { useState } from "react";
import { generateOpenAiImage,generateStabilityAiImage } from "../../apis/imageGen";

export default function ImageGenerator({ setImageUrl, setIsLoading , setRevisedPrompt}) {
  // const [model, setModel] = useState("stability");
  const [prompt, setPrompt] = useState("");
  const[model , setModel] = useState("openai");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setImageUrl("");
    setRevisedPrompt("");
    try {
      if (model === "openai") {
        const image = await generateOpenAiImage(prompt);
        setImageUrl(image.data.url);
        setRevisedPrompt(image.data.revised_prompt);
      }

      if(model === 'stability'){
        const image = await generateStabilityAiImage(prompt);
        setImageUrl(image);
      }
      // Add stability logic here later
    } catch (error) {
        console.log(error);
      alert("Failed to generate image");
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-white shadow rounded-lg p-8 flex flex-col h-full">
      <h2 className="text-lg font-medium text-gray-900 mb-1">Generate AI Image</h2>
      <p className="text-sm text-gray-600 mb-6">
        Create stunning visuals with AI-powered image generation
      </p>
      <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col">
        {/* Model Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select AI Model</label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="stability">Stability AI</option>
            <option value="openai">OpenAI DALL-E</option>
          </select>
        </div>
        {/* Prompt */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Your Prompt</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here... For example: 'A futuristic cityscape at sunset with flying cars and neon lights'"
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={4}
            required
          />
          <p className="mt-2 text-sm text-gray-500">
            Be descriptive and specific about the style, colors, and composition you want
          </p>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
        >
          Generate Image
        </button>
      </form>
    </div>
  );
}