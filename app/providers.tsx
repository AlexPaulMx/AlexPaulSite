"use client"

import { motion, AnimatePresence } from "framer-motion"
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { base } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const config = getDefaultConfig({
  appName: 'The Lab',
  projectId: 'thelab-crowdfund', // Puedes cambiarlo por uno propio de WalletConnect si tienes
  chains: [base],
  ssr: true,
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <RainbowKitProvider>
      {children}
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
} 