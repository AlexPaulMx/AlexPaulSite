"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Circle } from 'lucide-react';

export default function SidebarNav({ links }:{ links: {href:string, label:string, icon:React.ReactNode}[] }) {
  const pathname = usePathname();
  return (
    <aside className="sidebar-nav-responsive">
      {/* Logo grande perfectamente centrado */}
      <div className="sidebar-logo-desktop">
        <Image src="/images/logo-alexpaul.png" alt="Alex Paul Logo" width={56} height={56} style={{ filter: 'drop-shadow(0 2px 16px #3b82f6)' }} />
      </div>
      {/* Links solo iconos */}
      <nav className="sidebar-links-responsive">
        {links.map(link => {
          const isActive = pathname === link.href || (link.href === '/' && pathname === '');
          return (
            <a
              key={link.href}
              href={link.href}
              className={`sidebar-link group hover:bg-[#232323] hover:text-[#fff] transition-colors${isActive ? ' active' : ''}`}
              aria-label={link.label}
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
            >
              {link.icon}
            </a>
          );
        })}
      </nav>
      <style jsx>{`
        .sidebar-nav-responsive {
          position: fixed;
          left: 0;
          top: 0;
          width: 64px;
          height: 100vh;
          background: #101014;
          z-index: 100;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0;
        }
        .sidebar-logo-desktop {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-bottom: 48px;
          margin-top: 24px;
        }
        .sidebar-links-responsive {
          display: flex;
          flex-direction: column;
          gap: 32px;
          align-items: center;
          justify-content: center;
          flex: 1;
        }
      `}</style>
    </aside>
  );
} 