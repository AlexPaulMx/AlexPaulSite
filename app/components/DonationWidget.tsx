"use client";
import { useState, useEffect } from "react";
import { useAccount, useContractWrite, useContractRead, useTransaction, useSwitchChain, useChainId, useSendTransaction, useBalance } from "wagmi";
import { base, mainnet } from "wagmi/chains";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import DonationModal from "./DonationModal";
import { USDC_ADDRESS, PROJECT_WALLET, USDC_ABI, formatUSDCAmount, parseUSDCAmount } from "../utils/usdc";
import { toast } from "sonner";
import { parseEther } from "viem";
import { supabase } from '@/lib/supabaseClient';
import Image from "next/image";

const GOAL_AMOUNT = 10000; // $10,000 USD

type Currency = "USDC" | "ETH";

export default function DonationWidget() {
  const [selected, setSelected] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [currency, setCurrency] = useState<Currency>("USDC");
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  // Redes soportadas
  const supportedChains = [
    { id: base.id, name: "Base", icon: "🟦" },
    { id: mainnet.id, name: "Ethereum", icon: "⬛" },
  ];
  const [selectedChain, setSelectedChain] = useState(chainId);

  // Mapeo de direcciones USDC por red
  const USDC_ADDRESSES: Record<number, string> = {
    [base.id]: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913", // Base USDC oficial
    [mainnet.id]: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // Ethereum Mainnet
  };
  // Usar la dirección correcta según la red seleccionada
  const usdcAddress = USDC_ADDRESSES[selectedChain] || USDC_ADDRESS;

  // Cambiar de red
  const handleChainChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newChainId = Number(e.target.value);
    setSelectedChain(newChainId);
    if (chainId !== newChainId) {
      await switchChain({ chainId: newChainId });
    }
  };

  // Si 'enabled' no es válido, prueba con 'skip', si tampoco, usa un fallback condicional
  const shouldFetch = !!address;
  const { data: usdcBalance } = useContractRead({
    address: usdcAddress as `0x${string}`,
    abi: USDC_ABI,
    functionName: "balanceOf",
    args: shouldFetch ? [address as `0x${string}`] : undefined,
  });

  console.log('USDC_ADDRESS', USDC_ADDRESS);
  console.log('Wallet address', address);
  console.log('usdcBalance', usdcBalance);

  // Get user's ETH balance
  const { data: ethBalance } = useBalance({
    address: address,
  });

  // Prepare the USDC transfer transaction
  const { writeContract: writeUSDC, data: usdcTransferData } = useContractWrite();

  // Prepare the ETH transfer transaction
  const { sendTransaction: sendETH, data: ethTransferData } = useSendTransaction();

  // Wait for transaction to be mined
  const { isLoading: isPending, isSuccess } = useTransaction({
    hash: currency === "USDC" ? usdcTransferData : ethTransferData,
  });

  // Handle successful transaction
  useEffect(() => {
    if (isSuccess) {
      setStatus("success");
      setShowDonationModal(true);
      toast.success("Donation successful! Thank you for your support! 🎉");
      // Disparar evento para refrescar el progreso
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('refresh-progress'));
      }
    }
  }, [isSuccess]);

  const currencyOptions = [
    {
      value: "USDC",
      label: "USDC",
      icon: "https://altcoinsbox.com/wp-content/uploads/2023/01/usd-coin-usdc-logo.png"
    },
    {
      value: "ETH",
      label: "ETH",
      icon: "https://www.cdnlogo.com/logos/e/81/ethereum-eth.svg"
    }
  ];

  async function handleDonate() {
    setStatus("pending");
    setError(null);
    try {
      if (!isConnected) throw new Error("Please connect your wallet first.");
      if (chainId !== base.id) {
        await switchChain({ chainId: base.id });
        return;
      }
      if (!selected) throw new Error("Please select an amount.");
      if (!address) throw new Error("No wallet address found.");

      if (currency === "USDC") {
        // Check if user has enough USDC
        const userBalance = usdcBalance ? parseUSDCAmount(usdcBalance as bigint) : 0;
        const selectedAmount = selected || 0;
        
        if (userBalance < selectedAmount) {
          throw new Error(`Insufficient USDC balance. You need ${selectedAmount.toFixed(2)} USDC, but you have ${userBalance.toFixed(2)} USDC.`);
        }

        // Send USDC to project wallet
        writeUSDC({
          abi: USDC_ABI,
          address: usdcAddress as `0x${string}`,
          functionName: "transfer",
          args: [PROJECT_WALLET, formatUSDCAmount(selectedAmount)],
        });
      } else {
        // Check if user has enough ETH
        const userBalance = ethBalance ? Number(ethBalance.formatted) : 0;
        const selectedAmount = selected || 0;
        
        // Simple balance check without gas buffer
        if (userBalance < selectedAmount) {
          throw new Error(`Insufficient ETH balance. You need ${selectedAmount.toFixed(4)} ETH, but you have ${userBalance.toFixed(4)} ETH.`);
        }

        // Send ETH to project wallet
        sendETH({
          to: PROJECT_WALLET,
          value: parseEther(selectedAmount.toString()),
        });
      }
    } catch (e: any) {
      setStatus("error");
      setError(e.message || "An unknown error occurred");
      toast.error(e.message || "Transaction failed");
    }
  }

  const handleDonationModalSave = async (data: { displayName: string; comment: string, amount: number, currency: Currency }) => {
    // Validación estricta de campos obligatorios y tipos
    if (!address || typeof address !== 'string' ||
        !data.displayName || typeof data.displayName !== 'string' ||
        !data.amount || typeof data.amount !== 'number' || isNaN(data.amount) ||
        !data.currency || typeof data.currency !== 'string') {
      toast.error("Faltan datos obligatorios para guardar el supporter.");
      console.log("[SUPPORTER] Datos faltantes o tipos incorrectos:", {
        address, tipo_address: typeof address,
        displayName: data.displayName, tipo_displayName: typeof data.displayName,
        amount: data.amount, tipo_amount: typeof data.amount,
        currency: data.currency, tipo_currency: typeof data.currency
      });
      return;
    }
    try {
      console.log("[SUPPORTER] Insertando en Supabase", {
        address, tipo_address: typeof address,
        display_name: data.displayName, tipo_displayName: typeof data.displayName,
        comment: data.comment,
        amount: data.amount, tipo_amount: typeof data.amount,
        currency: data.currency, tipo_currency: typeof data.currency
      });
      const { error, data: insertData } = await supabase.from("supporters").insert({
        address,
        display_name: data.displayName,
        comment: data.comment,
        amount: data.amount,
        currency: data.currency,
      }).select();
      console.log("[SUPPORTER] Resultado insert:", { error, insertData });
      if (error) {
        toast.error("Error saving supporter: " + error.message);
        return;
      }
      setShowDonationModal(false);
      // Forzar refresco manual de supporters y progreso
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('refresh-supporters'));
        window.dispatchEvent(new Event('refresh-progress'));
      }
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('refresh-supporters'));
        }
      }, 1000);
      toast.success("¡Gracias por tu apoyo!");
    } catch (e: any) {
      toast.error(e.message || "Error inesperado al guardar supporter");
      console.log("[SUPPORTER] Error inesperado:", e);
    }
  };

  // Handle custom amount input
  function handleCustomAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    
    // Ensure only one decimal point
    const parts = value.split('.');
    if (parts.length > 2) {
      return;
    }
    
    // Limit to 2 decimal places for USDC, 4 for ETH
    const maxDecimals = currency === "USDC" ? 2 : 4;
    if (parts[1] && parts[1].length > maxDecimals) {
      return;
    }

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
        {/* Bloque compacto de donación con selector de moneda personalizado */}
        <div className="w-full max-w-xs mx-auto flex items-center gap-2 mb-2">
          {/* Input con selector de moneda como símbolo */}
          <div className="flex items-center flex-1 bg-gray-900 border-2 border-gray-700 rounded-full px-3 py-2 focus-within:border-red-400 transition-all min-w-0">
            <button
              type="button"
              onClick={() => setCurrency(currency === "USDC" ? "ETH" : "USDC")}
              className="mr-2 focus:outline-none hover:scale-110 transition"
              aria-label="Change currency"
              tabIndex={0}
            >
              <img
                src={currency === "USDC"
                  ? "https://altcoinsbox.com/wp-content/uploads/2023/01/usd-coin-usdc-logo.png"
                  : "https://www.cdnlogo.com/logos/e/81/ethereum-eth.svg"}
                alt={currency}
                className="w-6 h-6 rounded-full"
              />
            </button>
            <input
              id="donation-amount"
              type="text"
              inputMode="decimal"
              pattern="[0-9]*[.]?[0-9]*"
              placeholder={currency === "USDC" ? "0.00" : "0.0000"}
              value={customAmount}
              onChange={handleCustomAmountChange}
              className="w-full bg-transparent outline-none text-lg font-bold text-white placeholder-gray-500 min-w-0"
            />
          </div>
          {/* Botón */}
          <button
            onClick={handleDonate}
            disabled={!selected || isPending || status === "pending"}
            className="px-5 py-2 rounded-full font-bold transition-all duration-200 shadow-lg whitespace-nowrap relative overflow-hidden group text-white"
            style={{
              background: 'linear-gradient(90deg, #ff5ecd, #a259f7, #00ffb8)',
              backgroundSize: '200% 200%',
              animation: 'gradientMove 3s ease-in-out infinite'
            }}
          >
            {(isPending || status === "pending") ? "Loading..." : "Mint"}
          </button>
        </div>
        <style jsx global>{`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
        {/* Mensajes de error y balance */}
        {customAmount && (!selected || parseFloat(customAmount) <= 0) && (
          <span className="text-xs text-red-400 mt-1">Enter a valid amount greater than 0</span>
        )}
        {currency === "USDC" && typeof usdcBalance === 'bigint' && (
          <span className="text-xs text-gray-400 mt-1">
            Your USDC Balance: ${parseUSDCAmount(usdcBalance).toFixed(2)}
          </span>
        )}
        {currency === "ETH" && ethBalance && (
          <span className="text-xs text-gray-400 mt-1">
            Your ETH Balance: {Number(ethBalance.formatted).toFixed(4)} ETH
          </span>
        )}
      </div>
      {status === "success" && !showDonationModal && (
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

      <DonationModal
        isOpen={showDonationModal}
        onClose={() => setShowDonationModal(false)}
        onSave={(data) => handleDonationModalSave({ ...data, amount: selected || 0, currency })}
        defaultDisplayName={address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ""}
        amount={selected || 0}
        currency={currency}
      />
    </div>
  );
} 