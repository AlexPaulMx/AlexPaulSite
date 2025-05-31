import { useIsFarcasterFrame } from '../hooks/useIsFarcasterFrame';
import { useState } from 'react';

export const Header = () => {
  const isFarcasterFrame = useIsFarcasterFrame();
  const [previewMode, setPreviewMode] = useState(false);

  // For development preview
  if (previewMode) {
    return (
      <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg">
        <div className="flex flex-col items-center p-4 bg-black rounded-lg">
          <img src="/placeholder-logo.svg" alt="AlexPaul Logo" className="h-6 w-auto mb-2" />
          <span className="text-sm font-bold text-white">AlexPaul</span>
        </div>
        <button 
          onClick={() => setPreviewMode(false)}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Volver al diseño normal
        </button>
      </div>
    );
  }

  if (isFarcasterFrame) {
    return (
      <div className="flex flex-col items-center p-4 bg-black rounded-lg">
        <img src="/placeholder-logo.svg" alt="AlexPaul Logo" className="h-6 w-auto mb-2" />
        <span className="text-sm font-bold text-white">AlexPaul</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="bg-black p-2 rounded-lg">
        <img src="/placeholder-logo.svg" alt="AlexPaul Logo" className="h-8 w-auto" />
      </div>
      <span className="text-xl font-bold">AlexPaul</span>
      <button 
        onClick={() => setPreviewMode(true)}
        className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Ver diseño Farcaster
      </button>
    </div>
  );
}; 