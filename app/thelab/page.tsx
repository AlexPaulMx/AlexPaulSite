"use client";
import React from 'react';
import HeatmapBackground from "@/components/HeatmapBackground";
import { User, Users, Trophy, Award, DollarSign, Disc3, Video, Package, MessageCircle, HelpCircle } from 'lucide-react';

export default function TheLab() {
  return (
    <div className="lobby-area" style={{position:'relative',zIndex:1}}>
      <style jsx global>{`
        .lab-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }
        .lab-header {
          text-align: center;
          margin-bottom: 4rem;
          position: relative;
        }
        .lab-title {
          font-size: 4rem;
          font-weight: 800;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
          letter-spacing: 0.1em;
        }
        .lab-subtitle {
          font-size: 1.5rem;
          color: rgba(255, 255, 255, 0.8);
          margin-top: 1rem;
          letter-spacing: 0.2em;
        }
        .lab-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }
        .lab-card {
          background: rgba(15, 15, 15, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 2rem;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .lab-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .lab-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        .lab-card:hover::before {
          opacity: 1;
        }
        .lab-card-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .lab-card-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
          margin: 0;
        }
        .lab-card-content {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
        }
        .lab-card-content p {
          margin-bottom: 1rem;
        }
        .lab-card-content ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .lab-card-content li {
          margin-bottom: 1rem;
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
        }
        .lab-card-content li::before {
          content: '•';
          color: #3b82f6;
          font-size: 1.5rem;
          line-height: 1;
        }
        .support-button {
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .support-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
        }
        .support-section {
          text-align: center;
          margin-top: 4rem;
          padding: 4rem 0;
          background: rgba(15, 15, 15, 0.5);
          border-radius: 24px;
          backdrop-filter: blur(10px);
        }
        .support-title {
          font-size: 2rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 1.5rem;
        }
        .support-description {
          color: rgba(255, 255, 255, 0.8);
          max-width: 600px;
          margin: 0 auto 2rem;
          line-height: 1.6;
        }
      `}</style>
      
      <HeatmapBackground />
      
      <div className="lab-container">
        <div className="lab-header">
          <h1 className="lab-title">THE LAB</h1>
          <p className="lab-subtitle">BY ALEX PAUL</p>
        </div>

        <div className="lab-grid">
          {/* Intro Card */}
          <div className="lab-card">
            <div className="lab-card-header">
              <User size={32} color="#3b82f6" />
              <h2 className="lab-card-title">Introduction</h2>
            </div>
            <div className="lab-card-content">
              <p>Hi, I'm Alex Paul, an independent artist and producer from the Tamaulipas-Texas border. I've been creating music for 14 years and exploring web3 since March 2022.</p>
              <p>I'm currently working on "The Lab", an audiovisual album that pushes the boundaries of music and technology.</p>
            </div>
          </div>

          {/* Rewards Card */}
          <div className="lab-card">
            <div className="lab-card-header">
              <Trophy size={32} color="#fbbf24" />
              <h2 className="lab-card-title">Rewards</h2>
            </div>
            <div className="lab-card-content">
              <ul>
                <li>
                  <strong style={{color: '#fbbf24'}}>Top Supporter</strong>
                  <p>Executive Producer credits, exclusive merch, and full album airdrop</p>
                </li>
                <li>
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
            <div className="lab-card-header">
              <DollarSign size={32} color="#22c55e" />
              <h2 className="lab-card-title">Fund Allocation</h2>
            </div>
            <div className="lab-card-content">
              <ul>
                <li>
                  <strong style={{color: '#22c55e'}}>Production</strong>
                  <p>Studio time, session musicians, and equipment</p>
                </li>
                <li>
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
            <div className="lab-card-header">
              <Disc3 size={32} color="#8b5cf6" />
              <h2 className="lab-card-title">Music NFTs</h2>
            </div>
            <div className="lab-card-content">
              <p>Own pieces of The Lab's musical journey through our exclusive NFT collection. Each NFT comes with unique artwork and special benefits.</p>
              <ul>
                <li>Full album collection</li>
                <li>Exclusive artwork</li>
                <li>Royalty shares</li>
              </ul>
            </div>
          </div>

          {/* Merch Card */}
          <div className="lab-card">
            <div className="lab-card-header">
              <Package size={32} color="#ef4444" />
              <h2 className="lab-card-title">Merchandise</h2>
            </div>
            <div className="lab-card-content">
              <p>Limited edition merchandise designed exclusively for The Lab supporters.</p>
              <ul>
                <li>Limited edition t-shirts</li>
                <li>Exclusive hoodies</li>
                <li>Collectible pins</li>
              </ul>
            </div>
          </div>

          {/* Community Card */}
          <div className="lab-card">
            <div className="lab-card-header">
              <Users size={32} color="#0ea5e9" />
              <h2 className="lab-card-title">Community</h2>
            </div>
            <div className="lab-card-content">
              <p>Join our growing community of supporters and be part of The Lab's journey.</p>
              <button 
                className="support-button"
                onClick={() => window.open('https://t.me/thelabcommunity', '_blank')}
              >
                <MessageCircle size={24} />
                Join Telegram
              </button>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="support-section">
          <h2 className="support-title">Support The Lab</h2>
          <p className="support-description">
            Be part of this innovative project and help bring The Lab to life. Your support will help create something unique in the intersection of music and technology.
          </p>
          <button
            className="support-button"
            onClick={() => window.open('https://seedclub.xyz/crowdfunding-link', '_blank')}
          >
            Support Now
          </button>
        </div>
      </div>
    </div>
  );
} 