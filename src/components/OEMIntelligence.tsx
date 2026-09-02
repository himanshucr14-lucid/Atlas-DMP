'use client';

import React from 'react';
import { Layers, Globe, Cpu, Award, TrendingUp, CheckCircle2 } from 'lucide-react';
import BentoCard from './BentoCard';

export default function OEMIntelligence() {
  const sspPartners = [
    { name: 'AppLovin MAX', format: 'Rewarded Video & Interstitials', share: '34.2%', winRate: '84.2%', cpm: '$3.40', cvr: '18.4%' },
    { name: 'Google DV360', format: 'Native Feed & In-Stream', share: '28.5%', winRate: '78.5%', cpm: '$3.80', cvr: '16.2%' },
    { name: 'Unity Exchange', format: 'Interactive Playable & 30s Video', share: '16.8%', winRate: '82.0%', cpm: '$2.40', cvr: '22.8%' },
    { name: 'Mintegral SSP', format: 'In-App Interstitial & Banners', share: '10.4%', winRate: '88.4%', cpm: '$1.85', cvr: '14.5%' },
    { name: 'Liftoff / Vungle', format: 'High LTV Rewarded Video', share: '6.1%', winRate: '80.1%', cpm: '$2.90', cvr: '19.1%' },
    { name: 'Ironsource / Luna', format: 'Playable Ad Formats', share: '2.5%', winRate: '81.4%', cpm: '$2.65', cvr: '17.8%' },
    { name: 'InMobi Exchange', format: 'Contextual Native Banners', share: '1.5%', winRate: '76.2%', cpm: '$1.95', cvr: '13.2%' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Exchange Header Banner */}
      <BentoCard style={{ padding: '24px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--accent-dim)', border: '1px solid rgba(59, 130, 246, 0.2)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
              <Layers style={{ width: '20px', height: '20px', color: 'var(--accent-light)' }} />
            </div>
            <div>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}>
                <span className="tag tag-accent">Direct OpenRTB 2.5SSP Partnerships</span>
                <span className="tag tag-success">Real-Time Auction & Clearing Seats</span>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text)', letterSpacing: '-0.02em' }}>
                DSP Bidding Partner Exchanges & Clearing Traffic
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-3)', marginTop: '2px' }}>
                Auction performance metrics across AppLovin MAX, Google DV360, Unity Exchange, Mintegral, Liftoff, Ironsource, and InMobi.
              </p>
            </div>
          </div>
        </div>
      </BentoCard>

      {/* SSP Performance Table */}
      <BentoCard style={{ padding: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <th style={{ paddingBottom: '12px', fontSize: '10px', fontWeight: '700', color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>SSP Exchange</th>
              <th style={{ paddingBottom: '12px', fontSize: '10px', fontWeight: '700', color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Ad Format</th>
              <th style={{ paddingBottom: '12px', fontSize: '10px', fontWeight: '700', color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'right' }}>Traffic Share</th>
              <th style={{ paddingBottom: '12px', fontSize: '10px', fontWeight: '700', color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'right' }}>Win-Rate</th>
              <th style={{ paddingBottom: '12px', fontSize: '10px', fontWeight: '700', color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'right' }}>Floor CPM</th>
              <th style={{ paddingBottom: '12px', fontSize: '10px', fontWeight: '700', color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'right' }}>Avg CVR</th>
            </tr>
          </thead>
          <tbody>
            {sspPartners.map((ssp, idx) => (
              <tr key={idx} style={{ borderBottom: idx < sspPartners.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                <td style={{ padding: '14px 0', fontWeight: '700', color: 'var(--text)' }}>{ssp.name}</td>
                <td style={{ padding: '14px 0', color: 'var(--text-3)', fontSize: '12px' }}>{ssp.format}</td>
                <td style={{ padding: '14px 0', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: '700', color: 'var(--accent-light)' }}>{ssp.share}</td>
                <td style={{ padding: '14px 0', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: '700', color: 'var(--text)' }}>{ssp.winRate}</td>
                <td style={{ padding: '14px 0', textAlign: 'right', fontFamily: 'var(--font-mono)', color: 'var(--success)' }}>{ssp.cpm}</td>
                <td style={{ padding: '14px 0', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: '800', color: 'var(--text)' }}>{ssp.cvr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </BentoCard>

    </div>
  );
}
