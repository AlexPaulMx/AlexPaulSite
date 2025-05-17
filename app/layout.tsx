import type React from "react"
import { PlayerProvider } from "./context/PlayerContext"
import "./globals.css"
import Image from "next/image"
import { Home, User, FlaskConical } from 'lucide-react'
import LogoCursor from "../components/LogoCursor"
import { FloatingPlayer } from "./components/FloatingPlayer"
import { Providers } from "./providers"
import HeatmapGlobal from "./HeatmapGlobal"

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
            {/* Sidebar minimalista */}
            <aside style={{
              position: 'fixed',
              left: 0,
              top: 0,
              width: 64,
              height: '100vh',
              background: '#101014',
              zIndex: 100,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0,
            }}>
              {/* Logo grande perfectamente centrado */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginBottom: 48, marginTop: 24 }}>
                <Image src="/images/logo-alexpaul.png" alt="Alex Paul Logo" width={56} height={56} style={{ filter: 'drop-shadow(0 2px 16px #3b82f6)' }} />
              </div>
              {/* Links solo iconos, centrados verticalmente */}
              <nav style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                {links.map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    style={{
                      color: '#bdbdbd',
                      borderRadius: '50%',
                      width: 40,
                      height: 40,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 0,
                      transition: 'background 0.18s, color 0.18s',
                      fontWeight: 700,
                      fontSize: 18,
                      cursor: 'pointer',
                    }}
                    className="sidebar-link group hover:bg-[#232323] hover:text-[#fff] transition-colors"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
              </nav>
            </aside>
            {/* Contenido principal ajustado */}
            <div style={{ marginLeft: 64 }}>{children}</div>
            <FloatingPlayer />
          </Providers>
        </PlayerProvider>
      </body>
    </html>
  )
}
