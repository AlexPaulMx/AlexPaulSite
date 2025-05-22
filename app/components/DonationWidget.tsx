"use client";
import { useState } from "react";
import { useAccount, useSendTransaction, useSwitchChain, useChainId, useBalance, useConnect } from "wagmi";
import { parseUnits } from "viem";
import { base } from "wagmi/chains";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const USDC_ADDRESS = "0xd9AAEC86B65d86F6A7B5b1b0c42FFA531710b6CA"; // USDC Base
const PROJECT_ADDRESS = "0x5aF876e2DA6f8324B5Ac866B0C7e73c619c95DC8";
const DECIMALS = 6;
const AMOUNTS = [10, 25, 50, 100, 250];

export default function DonationWidget() {
  const [selected, setSelected] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [status, setStatus] = useState<null | "idle" | "pending" | "success" | "error">(null);
  const [error, setError] = useState<string | null>(null);
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const { connectors, connect } = useConnect();

  // TODO: Implementar balance y allowance si se requiere

  async function handleDonate() {
    setStatus("pending");
    setError(null);
    try {
      if (!isConnected) throw new Error("Conecta tu wallet primero.");
      if (chainId !== base.id) {
        await switchChain({ chainId: base.id });
        return;
      }
      if (!selected) throw new Error("Selecciona un monto.");
      // Usar ethers para enviar USDC (requiere aprobación y transferencia)
      // Aquí solo mostramos el flujo, la integración real requiere un hook personalizado o wagmi v2 para ERC20
      setTimeout(() => {
        setStatus("success");
      }, 2000);
    } catch (e: any) {
      setStatus("error");
      setError(e.message || "Error desconocido");
    }
  }

  // Manejar input personalizado
  function handleCustomAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    setCustomAmount(value);
    const num = parseFloat(value);
    if (!isNaN(num) && num > 0) {
      setSelected(num);
    } else {
      setSelected(null);
    }
  }

  return (
    <div className="mt-6 flex flex-col items-center gap-3">
      <div className="flex flex-col items-center w-full mb-2">
        <label htmlFor="donation-amount" className="mb-1 text-sm text-gray-300 font-semibold">Amount to support</label>
        <div className="flex items-center w-full max-w-xs mx-auto bg-gray-900 border-2 rounded-full px-4 py-2 focus-within:border-red-400 transition-all border-gray-700 gap-2">
          <span className="text-lg text-gray-400 font-bold mr-2">$</span>
          <input
            id="donation-amount"
            type="number"
            min="1"
            step="any"
            placeholder="Enter amount"
            value={customAmount}
            onChange={handleCustomAmountChange}
            className="w-full bg-transparent outline-none text-lg font-bold text-white placeholder-gray-500"
          />
          <button
            onClick={handleDonate}
            disabled={!selected || status === "pending"}
            className={`ml-2 px-5 py-2 rounded-full font-bold transition-all duration-200 shadow-lg whitespace-nowrap ${selected ? "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700" : "bg-gray-700 text-gray-400 cursor-not-allowed"}`}
          >
            {status === "pending" ? "Enviando..." : "Support"}
          </button>
        </div>
        {customAmount && (!selected || parseFloat(customAmount) <= 0) && (
          <span className="text-xs text-red-400 mt-1">Enter a valid amount greater than 0</span>
        )}
      </div>
      <div className="w-full flex justify-center mb-2">
        <ConnectButton showBalance={false} chainStatus="icon" />
      </div>
      {status === "success" && (
        <div className="flex flex-col items-center gap-2 mt-2">
          <div className="text-green-400 font-bold">Thank you for your support! 🎉</div>
          <div className="flex gap-2 mt-1">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("I just contributed to @alexpaulmx's The Lab crowdfund! 🚀🎶 Join me: https://alexpaul.xyz/thelab")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 rounded-full bg-blue-500 text-white font-bold hover:bg-blue-600 transition"
            >
              Share on X
            </a>
            <a
              href={`https://warpcast.com/~/compose?text=${encodeURIComponent("I just contributed to @alexpaul's The Lab crowdfund! 🚀🎶 Join me: https://alexpaul.xyz/thelab")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 rounded-full bg-purple-600 text-white font-bold hover:bg-purple-700 transition"
            >
              Share on Warpcast
            </a>
          </div>
        </div>
      )}
      {status === "error" && (
        <div className="text-red-400 font-bold mt-2">{error}</div>
      )}
    </div>
  );
} 