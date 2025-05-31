import React from 'react';

export const FarcasterPreview = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Vista previa del diseño Farcaster</h2>
      <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg max-w-md mx-auto">
        <div className="flex flex-col items-center p-4 bg-black rounded-lg">
          <img src="/placeholder-logo.svg" alt="AlexPaul Logo" className="h-6 w-auto mb-2" />
          <span className="text-sm font-bold text-white">AlexPaul</span>
        </div>
      </div>
      <p className="mt-4 text-gray-600 text-center">
        Este es cómo se verá tu aplicación cuando se cargue en un Frame de Farcaster
      </p>
    </div>
  );
}; 