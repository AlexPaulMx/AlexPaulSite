"use client";
import React from 'react';
import HeatmapBackground from "./HeatmapBackground";
import { User, Users, Trophy, Award, DollarSign, Disc3, Video, Package, MessageCircle, HelpCircle } from 'lucide-react';

export default function TheLabContent() {
  return (
    <div className="lobby-area" style={{position:'relative',zIndex:1}}>
      <style jsx global>{`
        .lab-card {
          background: rgba(15, 15, 15, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 24px;
          backdrop-filter: blur(8px);
          transition: all 0.3s ease;
        }
        .lab-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }
        .lab-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .lab-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
          margin: 0;
        }
        .lab-content {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
        }
        .lab-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          padding: 24px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .support-button {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .support-button:hover {
          background: #2563eb;
          transform: translateY(-2px);
        }
      `}</style>
      <HeatmapBackground />
      
      <div className="lobby-header" style={{textAlign: 'center', padding: '48px 24px'}}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" fill="none" />
                <path d="M16 8h16v4c0 1.1-.9 2-2 2h-1v15.1c0 .53.21 1.04.59 1.41l6.3 6.3A4.978 4.978 0 0 1 40 40v2a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-2c0-1.32.53-2.59 1.47-3.53l6.3-6.3c.38-.37.59-.88.59-1.41V14h-1a2 2 0 0 1-2-2V8Zm2 0v4h12V8H18Zm2 6v15.1c0 1.32-.53 2.59-1.47 3.53l-6.3 6.3A2.978 2.978 0 0 0 8 40v2h32v-2c0-.8-.32-1.56-.88-2.12l-6.3-6.3A4.978 4.978 0 0 1 30 29.1V14H18Z" fill="#fff"/>
              </svg>
            </span>
            <h1 className="lobby-title" style={{ margin: 0, fontSize: '2.5rem', fontWeight: 700, letterSpacing: '0.1em' }}>THE LAB</h1>
          </div>
          <p className="lobby-subtitle" style={{ fontSize: '1.2rem', letterSpacing: '0.2em', opacity: 0.8 }}>BY ALEX PAUL</p>
        </div>
      </div>

      <div className="lab-grid">
        {/* Intro Card */}
        <div className="lab-card">
          <div className="lab-header">
            <User size={24} color="#3b82f6" />
            <h2 className="lab-title">Introduction</h2>
          </div>
          <div className="lab-content">
            <p>Hi, I'm Alex Paul, an independent artist and producer from the Tamaulipas-Texas border. I've been creating music for 14 years and exploring web3 since March 2022.</p>
            <p>I'm currently working on "The Lab", an audiovisual album that pushes the boundaries of music and technology.</p>
          </div>
        </div>

        {/* Rewards Card */}
        <div className="lab-card">
          <div className="lab-header">
            <Trophy size={24} color="#fbbf24" />
            <h2 className="lab-title">Rewards</h2>
          </div>
          <div className="lab-content">
            <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
              <li style={{marginBottom: 12}}>
                <strong style={{color: '#fbbf24'}}>Top Supporter</strong>
                <p>Executive Producer credits, exclusive merch, and full album airdrop</p>
              </li>
              <li style={{marginBottom: 12}}>
                <strong style={{color: '#fbbf24'}}>Top 3 Supporters</strong>
                <p>Curator credits, exclusive merch, and album airdrop</p>
              </li>
              <li>
                <strong style={{color: '#fbbf24'}}>All Contributors</strong>
                <p>The Lab Gang Badge and community access</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Fund Allocation Card */}
        <div className="lab-card">
          <div className="lab-header">
            <DollarSign size={24} color="#22c55e" />
            <h2 className="lab-title">Fund Allocation</h2>
          </div>
          <div className="lab-content">
            <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
              <li style={{marginBottom: 12}}>
                <strong style={{color: '#22c55e'}}>Production</strong>
                <p>Studio time, session musicians, and equipment</p>
              </li>
              <li style={{marginBottom: 12}}>
                <strong style={{color: '#22c55e'}}>Music Videos</strong>
                <p>Production, locations, and post-production</p>
              </li>
              <li>
                <strong style={{color: '#22c55e'}}>Technology</strong>
                <p>Mint site development and blockchain integration</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Music NFTs Card */}
        <div className="lab-card">
          <div className="lab-header">
            <Disc3 size={24} color="#8b5cf6" />
            <h2 className="lab-title">Music NFTs</h2>
          </div>
          <div className="lab-content">
            <p>Own pieces of The Lab's musical journey through our exclusive NFT collection. Each NFT comes with unique artwork and special benefits.</p>
            <ul style={{listStyle: 'none', padding: 0, margin: '12px 0 0 0'}}>
              <li style={{marginBottom: 8}}>• Full album collection</li>
              <li style={{marginBottom: 8}}>• Exclusive artwork</li>
              <li>• Royalty shares</li>
            </ul>
          </div>
        </div>

        {/* Merch Card */}
        <div className="lab-card">
          <div className="lab-header">
            <Package size={24} color="#ef4444" />
            <h2 className="lab-title">Merchandise</h2>
          </div>
          <div className="lab-content">
            <p>Limited edition merchandise designed exclusively for The Lab supporters.</p>
            <ul style={{listStyle: 'none', padding: 0, margin: '12px 0 0 0'}}>
              <li style={{marginBottom: 8}}>• Limited edition t-shirts</li>
              <li style={{marginBottom: 8}}>• Exclusive hoodies</li>
              <li>• Collectible pins</li>
            </ul>
          </div>
        </div>

        {/* Community Card */}
        <div className="lab-card">
          <div className="lab-header">
            <Users size={24} color="#0ea5e9" />
            <h2 className="lab-title">Community</h2>
          </div>
          <div className="lab-content">
            <p>Join our growing community of supporters and be part of The Lab's journey.</p>
            <div style={{marginTop: 16}}>
              <button 
                className="support-button"
                onClick={() => window.open('https://t.me/thelabcommunity', '_blank')}
              >
                <MessageCircle size={20} />
                Join Telegram
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Support Button */}
      <div style={{textAlign: 'center', padding: '48px 24px'}}>
        <button
          className="support-button"
          style={{fontSize: '1.2rem', padding: '16px 32px'}}
          onClick={() => window.open('https://seedclub.xyz/crowdfunding-link', '_blank')}
        >
          Support The Lab
        </button>
      </div>
    </div>
  );
} 