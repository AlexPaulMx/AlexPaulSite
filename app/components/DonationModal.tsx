"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { supabase } from "../../lib/supabaseClient";

type DonationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { displayName: string; comment: string }) => void;
  defaultDisplayName: string;
  address: string;
  amount: number;
  currency: "USDC" | "ETH";
};

export default function DonationModal({
  isOpen,
  onClose,
  onSave,
  defaultDisplayName,
  address,
  amount,
  currency,
}: DonationModalProps) {
  const [displayName, setDisplayName] = useState(defaultDisplayName);
  const [comment, setComment] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      console.log("Saving supporter:", {
        address,
        display_name: displayName,
        comment: comment || null,
        amount,
        currency,
      });

      const { error: supabaseError } = await supabase.from("supporters").insert({
        address,
        display_name: displayName,
        comment: comment || null,
        amount,
        currency,
      });

      if (supabaseError) {
        console.error("Error saving to Supabase:", supabaseError);
        setError("Error al guardar la información. Por favor, intenta de nuevo.");
        return;
      }

      console.log("Supporter saved successfully");
      onSave({ displayName, comment });
      setComment("");
      onClose();
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      setError("Error al guardar la información. Por favor, intenta de nuevo.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/80" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md p-6 bg-gray-900 rounded-2xl border border-white/10">
          <Dialog.Title className="text-xl font-bold text-white mb-4">
            ¡Gracias por tu apoyo! 🎉
          </Dialog.Title>
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-gray-300 mb-1">
                Tu nombre o alias
              </label>
              <input
                type="text"
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500"
                placeholder="¿Cómo quieres que te llamemos?"
                required
              />
            </div>
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-300 mb-1">
                Deja un mensaje (opcional)
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500"
                placeholder="¿Qué te gustaría decir?"
                rows={3}
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                disabled={isSaving}
              >
                Cerrar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSaving}
              >
                {isSaving ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
} 