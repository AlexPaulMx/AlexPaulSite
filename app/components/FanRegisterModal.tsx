"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function FanRegisterModal({
  open,
  wallet,
  onRegistered
}: {
  open: boolean;
  wallet: string;
  onRegistered: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState<null | boolean>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Validar nombre de usuario en tiempo real
  useEffect(() => {
    if (!username) {
      setUsernameAvailable(null);
      return;
    }
    const check = setTimeout(async () => {
      const { data } = await supabase
        .from("fans")
        .select("id")
        .eq("username", username)
        .single();
      setUsernameAvailable(!data);
    }, 400);
    return () => clearTimeout(check);
  }, [username]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name || !username) {
      setError("Name and username are required.");
      return;
    }
    if (usernameAvailable === false) {
      setError("Username is already taken.");
      return;
    }
    setLoading(true);
    const { error: insertError } = await supabase.from("fans").insert({
      wallet,
      name,
      email: email || null,
      phone: phone || null,
      username
    });
    setLoading(false);
    if (insertError) {
      setError(insertError.message);
    } else {
      onRegistered();
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 rounded-2xl p-8 w-full max-w-md shadow-2xl border border-gray-700 flex flex-col gap-4"
      >
        <h2 className="text-xl font-bold text-white mb-2 text-center">Welcome to The Lab!</h2>
        <p className="text-gray-300 text-sm text-center mb-2">
          To receive important updates and new releases, please complete your info.<br />
          <span className="text-yellow-400">Email and phone are optional.</span>
        </p>
        <input
          className="rounded-lg px-4 py-2 bg-gray-800 text-white border border-gray-700 focus:border-red-400 outline-none"
          placeholder="Name*"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          className="rounded-lg px-4 py-2 bg-gray-800 text-white border border-gray-700 focus:border-red-400 outline-none"
          placeholder="Email (optional)"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="rounded-lg px-4 py-2 bg-gray-800 text-white border border-gray-700 focus:border-red-400 outline-none"
          placeholder="Phone (optional)"
          type="tel"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
        <div className="relative">
          <input
            className={`rounded-lg px-4 py-2 bg-gray-800 text-white border ${usernameAvailable === false ? "border-red-500" : "border-gray-700 focus:border-red-400"} outline-none w-full`}
            placeholder="Username*"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          {username && usernameAvailable === false && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-red-400">Not available</span>
          )}
          {username && usernameAvailable === true && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-green-400">Available</span>
          )}
        </div>
        {error && <div className="text-red-400 text-sm text-center">{error}</div>}
        <button
          type="submit"
          disabled={loading || !name || !username || usernameAvailable === false}
          className="w-full py-2 rounded-full font-bold bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all disabled:opacity-60 mt-2"
        >
          {loading ? "Saving..." : "Register"}
        </button>
      </form>
    </div>
  );
} 