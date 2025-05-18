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
        <PlayerProvider>
          <Providers>
            <HeatmapGlobal />
            <LogoCursor />
            <SidebarNav links={links} />
            {/* Contenido principal ajustado */}
            <div className="main-content-responsive">
              <AppLoaderWrapper>{children}</AppLoaderWrapper>
            </div>
            <FloatingPlayer />
            <style jsx>{`
              .main-content-responsive {
                margin-left: 64px;
              }
            `}</style>
          </Providers>
        </PlayerProvider>
      </body>
    </html>
  )
}
