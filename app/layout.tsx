import type React from "react"
import { PlayerProvider } from "./context/PlayerContext"
import "./globals.css"
import Image from "next/image"
import { Home, User, FlaskConical } from 'lucide-react'
import { FloatingPlayer } from "./components/FloatingPlayer"
import { Providers } from "./providers"
import HeatmapGlobal from "./HeatmapGlobal"
import AppLoaderWrapper from "./components/AppLoaderWrapper"
import SidebarNav from "./components/SidebarNav"

export const metadata = {
  title: 'AlexPaul - Music & Production',
  description: 'Explore the music and production of AlexPaul. Discover his latest releases, projects, and experiments in The Lab.',
  openGraph: {
    title: 'AlexPaul - Music & Production',
    description: 'Explore the music and production of AlexPaul. Discover his latest releases, projects, and experiments in The Lab.',
    images: [
      {
        url: '/placeholder-logo.svg',
        width: 1200,
        height: 630,
        alt: 'AlexPaul Logo',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AlexPaul - Music & Production',
    description: 'Explore the music and production of AlexPaul. Discover his latest releases, projects, and experiments in The Lab.',
    images: ['/placeholder-logo.svg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Sidebar links solo iconos
  const links = [
    { href: '/', label: 'Home', icon: <Home size={24} /> },
    { href: '/thelab', label: 'The Lab', icon: <FlaskConical size={24} /> },
    { href: '/about', label: 'About', icon: <User size={24} /> },
  ]

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta property="og:image:width" content={metadata.openGraph.images[0].width.toString()} />
        <meta property="og:image:height" content={metadata.openGraph.images[0].height.toString()} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta name="twitter:description" content={metadata.twitter.description} />
        <meta name="twitter:image" content={metadata.twitter.images[0]} />
      </head>
      <body>
        <PlayerProvider>
          <Providers>
        <HeatmapGlobal />
        <SidebarNav links={links} />
        {/* Contenido principal ajustado */}
        <div style={{ marginLeft: 64 }}>
          <AppLoaderWrapper>{children}</AppLoaderWrapper>
        </div>
        <FloatingPlayer />
        </Providers>
        </PlayerProvider>
      </body>
    </html>
  )
}
