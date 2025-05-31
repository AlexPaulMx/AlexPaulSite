"use client";
import { useState, useEffect } from "react";
import { useAccount, useContractWrite, useContractRead, useTransaction, useSwitchChain, useChainId, useSendTransaction, useBalance } from "wagmi";
import { base, mainnet } from "wagmi/chains";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { USDC_ADDRESS, PROJECT_WALLET, USDC_ABI, formatUSDCAmount, parseUSDCAmount } from "../utils/usdc";
import { toast } from "sonner";
import { parseEther } from "viem";
import { supabase } from '@/lib/supabaseClient';
import Image from "next/image";

const GOAL_AMOUNT = 10000; // $10,000 USD

type Currency = "USDC" | "ETH";

export default function DonationWidget({ onDonateClick }: { onDonateClick: (data: { amount: number; currency: Currency; address: string }) => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
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
      toast.success("Donation successful! Thank you for your support! 🎉");
      // Disparar evento para refrescar el progreso
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('refresh-progress'));
      }
      // Restaurar: abrir modal para mensaje/comentario
      if (onDonateClick && selected && address) {
        onDonateClick({ amount: selected, currency, address });
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

  async function fetchEthToUsdcRate() {
    try {
      const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
      const data = await res.json();
      return data?.ethereum?.usd || 0;
    } catch (e) {
      console.error('Error fetching ETH/USDC rate:', e);
      return 0;
    }
  }

  useEffect(() => {
    async function autoRegisterDonation() {
      if (!isSuccess || !address || !selected) return;
      let amountInUSDC = selected;
      let currencyToSave = currency;
      if (currency === 'ETH') {
        // Convert ETH to USDC
        const ethPrice = await fetchEthToUsdcRate();
        amountInUSDC = selected * ethPrice;
        currencyToSave = 'USDC';
      }
      // Guardar en Supabase
      await supabase.from('supporters').insert({
        address,
        amount: amountInUSDC,
        currency: currencyToSave,
        display_name: address,
        comment: ''
      });
      // Refrescar barra de progreso
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('refresh-progress'));
        window.dispatchEvent(new Event('refresh-supporters'));
      }
    }
    autoRegisterDonation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

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
      toast.error("Required fields are missing to save the supporter.");
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
      toast.success("Thank you for your support!");
    } catch (e: any) {
      toast.error(e.message || "Unexpected error while saving supporter");
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

  const formatAddress = (addr: string) => addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : '';

  return (
    <div className="mt-2 flex flex-col items-center gap-3 donation-widget-compact">
      <div className="flex flex-col items-center w-full">
        {/* Bloque compacto de donación con selector de moneda personalizado */}
        <div className="w-full max-w-xs mx-auto flex items-center gap-2 mb-2 donation-compact-row">
          <div className="flex items-center flex-1 bg-gray-900/50 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-red-400 transition-all min-w-0 donation-compact-input donation-amount-input">
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
                className="w-6 h-6 rounded-full object-contain"
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
          <button
            onClick={handleDonate}
            disabled={!selected || isPending || status === "pending"}
            className={`px-6 py-3 rounded-xl font-bold transition-all duration-200 shadow-lg whitespace-nowrap relative overflow-hidden group text-white bg-gradient-to-r from-red-500 via-pink-500 to-yellow-400 focus:outline-none z-50 donation-compact-btn ${(!selected || isPending || status === "pending") ? 'opacity-60 cursor-not-allowed' : 'hover:scale-105 hover:shadow-[0_0_20px_4px_rgba(255,80,80,0.35)]'}`}
          >
            {(isPending || status === "pending") ? "Processing..." : "Support"}
          </button>
        </div>
        {/* Mensajes de error y balance */}
        {customAmount && (!selected || parseFloat(customAmount) <= 0) && (
          <span className="text-xs text-red-400 mt-1 donation-error">Enter a valid amount greater than 0</span>
        )}
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
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 16px 4px rgba(255,80,80,0.25); }
          50% { box-shadow: 0 0 24px 8px rgba(255,80,80,0.35); }
        }
        .animate-pulse {
          animation: pulse 1s infinite;
        }
        .donation-amount-input input {
          max-width: 80px;
        }
        @media (max-width: 600px) {
          .donation-widget-compact {
            margin-top: 0 !important;
            gap: 0.25rem !important;
          }
          .donation-compact-row {
            gap: 2px !important;
            margin-bottom: 0 !important;
          }
          .donation-compact-input {
            padding: 4px 6px !important;
            font-size: 0.95rem !important;
            border-radius: 7px !important;
          }
          .donation-amount-input input {
            max-width: 60px !important;
            padding-left: 2px !important;
            padding-right: 2px !important;
            font-size: 0.95rem !important;
          }
          .donation-compact-btn {
            padding: 4px 8px !important;
            font-size: 0.95rem !important;
            border-radius: 7px !important;
            min-width: 70px !important;
          }
        }
      `}</style>
    </div>
  );
} 