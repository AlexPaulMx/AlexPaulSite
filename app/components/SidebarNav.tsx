"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, User, FlaskConical, Wallet } from "lucide-react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

export default function SidebarNav({ links }:{ links: {href:string, label:string, icon:React.ReactNode}[] }) {
  const pathname = usePathname();
  const { isConnected } = useAccount();

  return (
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
        {links.map(link => {
          const isActive = pathname === link.href || (link.href === '/' && pathname === '');
          return (
            <a
              key={link.href}
              href={link.href}
              style={{
                color: isActive ? '#fff' : '#bdbdbd',
                background: isActive ? 'linear-gradient(135deg, #ef4444 60%, #fff 100%)' : 'transparent',
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
                boxShadow: isActive ? '0 2px 12px #ef4444aa' : undefined,
              }}
              className={`sidebar-link group hover:bg-[#232323] hover:text-[#fff] transition-colors${isActive ? ' active' : ''}`}
              aria-label={link.label}
            >
              {link.icon}
            </a>
          );
        })}
      </nav>
      <div className="flex flex-col gap-4 items-center mb-2">
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            mounted,
          }) => {
            return (
              <div
                {...(!mounted && {
                  'aria-hidden': true,
                  'style': {
                    opacity: 0,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  },
                })}
              >
                {(() => {
                  if (!mounted || !account || !chain) {
                    return (
                      <button
                        onClick={openConnectModal}
                        className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                        title="Connect Wallet"
                      >
                        <Wallet className="w-6 h-6 text-gray-300" />
                      </button>
                    );
                  }
                  return (
                    <button
                      onClick={openAccountModal}
                      className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                      title={account.displayName}
                    >
                      <Wallet className="w-6 h-6 text-green-400" />
                    </button>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
      </div>
    </aside>
  );
} 