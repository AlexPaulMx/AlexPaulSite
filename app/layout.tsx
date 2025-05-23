import type React from "react"
import { PlayerProvider } from "./context/PlayerContext"
import "./globals.css"
import Image from "next/image"
import { Home, User, FlaskConical } from 'lucide-react'
import LogoCursor from "../components/LogoCursor"
import { FloatingPlayer } from "./components/FloatingPlayer"
import { Providers } from "./providers"
import HeatmapGlobal from "./HeatmapGlobal"
import AppLoaderWrapper from "./components/AppLoaderWrapper"
import SidebarNav from "./components/SidebarNav"
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from './config'

const queryClient = new QueryClient()

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Sidebar links solo iconos
  const links = [
    { href: '/', label: 'Inicio', icon: <Home size={24} /> },
    { href: '/about', label: 'About', icon: <User size={24} /> },
    { href: '/thelab', label: 'The Lab', icon: <FlaskConical size={24} /> },
  ]

  return (
    <html lang="en">
      <body>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <PlayerProvider>
              <Providers>
                <HeatmapGlobal />
                <LogoCursor />
                <SidebarNav links={links} />
                {/* Contenido principal ajustado */}
                <div style={{ marginLeft: 64 }}>
                  <AppLoaderWrapper>{children}</AppLoaderWrapper>
                </div>
                <FloatingPlayer />
              </Providers>
            </PlayerProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  )
}
