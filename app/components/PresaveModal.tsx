"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";

interface PresaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  songTitle: string;
}

// Lista de códigos de país comunes
const countryCodes = [
  { code: "+52", country: "México" },
  { code: "+1", country: "USA/Canada" },
  { code: "+34", country: "España" },
  { code: "+54", country: "Argentina" },
  { code: "+56", country: "Chile" },
  { code: "+57", country: "Colombia" },
  { code: "+58", country: "Venezuela" },
  { code: "+51", country: "Perú" },
  { code: "+593", country: "Ecuador" },
  { code: "+502", country: "Guatemala" },
  { code: "+503", country: "El Salvador" },
  { code: "+504", country: "Honduras" },
  { code: "+505", country: "Nicaragua" },
  { code: "+506", country: "Costa Rica" },
  { code: "+507", country: "Panamá" },
];

export default function PresaveModal({
  isOpen,
  onClose,
  songTitle,
}: PresaveModalProps) {
  const [name, setName] = useState("");
  const [countryCode, setCountryCode] = useState("+52"); // México por defecto
  const [phone, setPhone] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone) {
      toast.error("Por favor ingresa un número de teléfono");
      return;
    }

    setIsSaving(true);

    try {
      // Insertar el registro
      const { data, error } = await supabase
        .from('presaves')
        .insert([
          {
            name,
            phone: `${countryCode}${phone}`,
            song_title: songTitle,
            created_at: new Date().toISOString(),
          }
        ])
        .select();

      if (error) throw error;

      // Verificar que el registro se guardó correctamente
      if (data && data.length > 0) {
        toast.success("¡Gracias por pre-guardar! Te notificaremos cuando esté disponible.");
        onClose();
      } else {
        throw new Error("No se pudo verificar el guardado del registro");
      }
    } catch (error: any) {
      console.error("Error al guardar:", error);
      toast.error(error.message || "Error al guardar tu información");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] px-2 md:left-[64px] md:w-[calc(100vw-64px)]">
      <div className="bg-gray-900 p-6 rounded-xl w-full max-w-md border border-white/10">
        <h2 className="text-xl font-bold text-white mb-4">Pre-guardar {songTitle}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-1">
              Número de teléfono
            </label>
            <div className="flex gap-2">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {countryCodes.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.code} ({country.country})
                  </option>
                ))}
              </select>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="55 1234 5678"
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              disabled={isSaving}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSaving}
            >
              {isSaving ? "Guardando..." : "Pre-guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 