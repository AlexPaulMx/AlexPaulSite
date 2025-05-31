"use client";
import { TheLabFarcaster } from "@/src/components/TheLabFarcaster";

export default function TheLabPreview() {
  return (
    <div className="min-h-screen bg-gray-900 p-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-4 text-center">Vista previa de The Lab en Farcaster</h1>
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-4">
          <TheLabFarcaster />
        </div>
        <p className="text-gray-400 text-sm mt-4 text-center">
          Esta es una simulación de cómo se verá tu página cuando se cargue en un Frame de Farcaster
        </p>
      </div>
    </div>
  );
} 