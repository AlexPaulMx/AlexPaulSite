"use client";
import { useState, useEffect } from "react";
import { useAccount, useContractWrite, useContractRead, useTransaction, useSwitchChain, useChainId, useSendTransaction, useBalance } from "wagmi";
import { base } from "wagmi/chains";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import DonationModal from "./DonationModal";
import { USDC_ADDRESS, PROJECT_WALLET, USDC_ABI, formatUSDCAmount, parseUSDCAmount } from "../utils/usdc";
import { toast } from "sonner";
import { parseEther } from "viem";

const GOAL_AMOUNT = 10000; // $10,000 USD

type Currency = "USDC" | "ETH";

export default function DonationWidget() {
  const [selected, setSelected] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [status, setStatus] = useState<null | "idle" | "pending" | "success" | "error">(null);
  const [error, setError] = useState<string | null>(null);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [currency, setCurrency] = useState<Currency>("USDC");
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  // Get user's USDC balance
  const { data: usdcBalance } = useContractRead({
    address: USDC_ADDRESS,
    abi: USDC_ABI,
    functionName: "balanceOf",
    args: [address as `0x${string}`],
  });

  // Get user's ETH balance
  const { data: ethBalance } = useBalance({
    address: address,
  });

  // Prepare the USDC transfer transaction
  const { writeContract: writeUSDC, data: usdcTransferData } = useContractWrite({
    abi: USDC_ABI,
    address: USDC_ADDRESS,
    functionName: "transfer",
  });

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
    }
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

  const handleDonationModalSave = async (data: { displayName: string; comment: string }) => {
    // TODO: Save to Supabase
    console.log("Donation data:", {
      address,
      amount: selected,
      displayName: data.displayName,
      comment: data.comment,
      timestamp: new Date().toISOString(),
    });
    setShowDonationModal(false);
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
        <div className="flex items-center gap-2 mb-2">
          <button
            onClick={() => setCurrency("USDC")}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
              currency === "USDC"
                ? "bg-red-500 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            USDC
          </button>
          <button
            onClick={() => setCurrency("ETH")}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
              currency === "ETH"
                ? "bg-blue-500 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            ETH
          </button>
        </div>
        <label htmlFor="donation-amount" className="mb-1 text-sm text-gray-300 font-semibold">Amount to support</label>
        <div className="flex items-center w-full max-w-xs mx-auto bg-gray-900 border-2 rounded-full px-4 py-2 focus-within:border-red-400 transition-all border-gray-700 gap-2">
          <span className="text-lg text-gray-400 font-bold mr-2">{currency === "USDC" ? "$" : "Ξ"}</span>
          <input
            id="donation-amount"
            type="text"
            inputMode="decimal"
            pattern="[0-9]*[.]?[0-9]*"
            placeholder={currency === "USDC" ? "0.00" : "0.0000"}
            value={customAmount}
            onChange={handleCustomAmountChange}
            className="w-full bg-transparent outline-none text-lg font-bold text-white placeholder-gray-500"
          />
          <button
            onClick={handleDonate}
            disabled={!selected || status === "pending" || isPending}
            className={`ml-2 px-5 py-2 rounded-full font-bold transition-all duration-200 shadow-lg whitespace-nowrap ${
              selected && !isPending
                ? "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            {isPending ? "Sending..." : "Support Now"}
          </button>
        </div>
        {customAmount && (!selected || parseFloat(customAmount) <= 0) && (
          <span className="text-xs text-red-400 mt-1">Enter a valid amount greater than 0</span>
        )}
        {currency === "USDC" && usdcBalance && (
          <span className="text-xs text-gray-400 mt-1">
            Your USDC Balance: ${parseUSDCAmount(usdcBalance as bigint).toFixed(2)}
          </span>
        )}
        {currency === "ETH" && ethBalance && (
          <span className="text-xs text-gray-400 mt-1">
            Your ETH Balance: {Number(ethBalance.formatted).toFixed(4)} ETH
          </span>
        )}
      </div>
      <div className="w-full flex justify-center mb-2">
        <ConnectButton showBalance={false} chainStatus="icon" />
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
        onSave={handleDonationModalSave}
        defaultDisplayName={address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ""}
      />
    </div>
  );
} 