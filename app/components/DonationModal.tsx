"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import type { FormEvent } from "react";

type DonationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  address: string;
  amount: number;
  currency: string;
  defaultDisplayName?: string;
  onSave?: () => void;
};

export default function DonationModal({
  isOpen,
  onClose,
  address,
  amount,
  currency,
  defaultDisplayName = "",
  onSave = () => {},
}: DonationModalProps) {
  const [displayName, setDisplayName] = useState(defaultDisplayName);
  const [comment, setComment] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    try {
      await supabase.from("supporters").insert({
        address,
        display_name: displayName,
        comment,
        amount,
        currency,
      });
      onSave();
      setDisplayName("");
      setComment("");
      onClose();
    } catch (err) {
      setError("Error saving. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 left-0 flex items-start justify-center pt-4 z-50 w-full"
      style={{ left: '64px', width: 'calc(100vw - 64px)' }}
    >
      <div className="fixed inset-0 bg-black/80" onClick={onClose} aria-hidden="true" />
      <div className="relative w-full max-w-md p-6 bg-gray-900 rounded-2xl border border-white/10 mx-auto">
        <h2 className="text-xl font-bold text-white mb-4">Thank you for your support! 🎉</h2>
        {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg"><p className="text-red-400 text-sm">{error}</p></div>}
        <form onSubmit={handleSubmit} className="space-y-4 pb-0">
          <div>
            <label htmlFor="displayName" className="block text-sm font-medium text-gray-300 mb-1">Your name or alias (optional)</label>
            <input
              type="text"
              id="displayName"
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500"
              placeholder="How should we call you?"
            />
          </div>
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-300 mb-1">Leave a message (optional)</label>
            <textarea
              id="comment"
              value={comment}
              onChange={e => setComment(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500"
              placeholder="Share your thoughts..."
              rows={3}
            />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-400 hover:text-white transition-colors" disabled={isSaving}>Close</button>
            <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={isSaving}>{isSaving ? "Saving..." : "Save & Continue"}</button>
          </div>
        </form>
      </div>
    </div>
  );
} 