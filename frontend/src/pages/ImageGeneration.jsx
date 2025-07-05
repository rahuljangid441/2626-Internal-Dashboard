// src/pages/ImageGeneration.jsx
import ImageGenerator from '../components/ImageGeneratot/ImageGenerator';
import { useState } from 'react';

export default function ImageGeneration() {


  const [imageUrl, setImageUrl] = useState("");
  const [revisedPrompt, setRevisedPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const downloadImageBase64 = (imageUrl) => {
    if (!imageUrl) return;
    const downloadLink = document.createElement("a");
    downloadLink.href = imageUrl;
    downloadLink.download = `stability-ai-image-${Date.now()}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const downloadImage = async () => {
    if (!imageUrl) return;
    
    try {
      const response = await fetch(imageUrl);
      console.log(response);
      if (!response.ok) {
        alert("Failed to download image");
        return;
      }

      const blob = await response.blob();
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      
      // Set proper filename with timestamp and extension
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      downloadLink.download = `ai-generated-image-${timestamp}.png`;

      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      // Clean up the object URL
      URL.revokeObjectURL(downloadLink.href);
    } catch (error) {
      console.error("Error downloading image:", error);
      alert("Failed to download image");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <button
                onClick={() => window.history.back()}
                className="mr-4 p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <h1 className="text-xl font-semibold text-gray-900">Image Generation</h1>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          {/* Left Card: Form and image display */}
          <ImageGenerator setImageUrl={setImageUrl} setIsLoading={setIsLoading} setRevisedPrompt={setRevisedPrompt} />
          {/* Right Card: You can add history, tips, or leave empty for now */}

          <div className="bg-white shadow rounded-lg p-8 flex flex-col items-center justify-center">
            <h2 className="text-lg font-medium text-gray-900 mb-1">Generated Image</h2>
            <p className="text-sm text-gray-600 mb-6">Your AI-generated image will appear here</p>
            <div className="flex-1 flex items-center justify-center w-full">
              {isLoading ? (
                <div className="flex flex-col items-center">
                  <svg className="animate-spin h-12 w-12 text-indigo-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="text-gray-600">Generating your image...</p>
                </div>
              ) : imageUrl ? (
                //   <img src={imageUrl} alt="Generated" className="rounded shadow max-h-96" />

                <div className='flex flex-col items-center justify-center'>


<div className="w-full h-80 flex items-center justify-center">
   <img
     src={imageUrl}
     alt="Generated"
     className="rounded shadow object-contain max-h-full max-w-full"
   />








 </div>

 
 {imageUrl.startsWith('data:image/') ? (
  <button onClick={()=>downloadImageBase64(imageUrl)} className='bg-indigo-600 text-white px-4 py-2 rounded-md mt-5'>Download Image</button>
 ) : (
 

 <a
    href={`/api/v1/images/proxy/download?url=${encodeURIComponent(imageUrl)}`}
    download
    target="_blank"
    rel="noopener noreferrer"
    style={{ display: imageUrl ? 'inline-block' : 'none' }}
  >
    <button className='bg-indigo-600 text-white px-4 py-2 rounded-md mt-5'>
      Download Image
    </button>
  </a>
 )}



{revisedPrompt && (
      <p className="text-sm text-gray-500 mt-2">Revised Prompt: {revisedPrompt}</p>
    )}
                </div>
               
               
               
               
               
               
               

              ) : (
                <div className="flex flex-col items-center text-gray-400">
                  <svg className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-lg">No image generated yet</p>
                  <p className="text-sm">Enter a prompt and click generate</p>
                </div>
              )}
            </div>
          </div>






        </div>
      </div>
    </div>
  );
}