import type React from "react"
import { PlayerProvider } from "./context/PlayerContext"
import "./globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PlayerProvider>
          {children}
        </PlayerProvider>
      </body>
    </html>
  )
}
