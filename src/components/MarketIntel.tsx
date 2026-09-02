'use client';

import { motion } from 'framer-motion';
import { Globe, BarChart2, TrendingUp, ShieldAlert } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { AIEngineResult } from '../lib/connectors/types';
import BentoCard from './BentoCard';

interface MarketIntelProps {
  geos: { country: string; share: number; trafficLevel: string }[];
  marketSignals: {
    searchPopularity: number;
    seasonality: string;
    interestOverTime: { date: string; value: number }[];
    isEstimate: boolean;
  };
  geoIntelligence: AIEngineResult['geoIntelligence'];
  competitiveIntelligence: AIEngineResult['competitiveIntelligence'];
}

export default function MarketIntel({
  geos,
  marketSignals,
  geoIntelligence,
  competitiveIntelligence
}: MarketIntelProps) {
  
  // Clearing Volatility Data
  const clearingVolatilityData = [
    { date: 'Jan', clearingRate: 85 },
    { date: 'Feb', clearingRate: 82 },
    { date: 'Mar', clearingRate: 88 },
    { date: 'Apr', clearingRate: 86 },
    { date: 'May', clearingRate: 89 },
    { date: 'Jun', clearingRate: 91 },
    { date: 'Jul', clearingRate: 90 },
    { date: 'Aug', clearingRate: 87 },
    { date: 'Sep', clearingRate: 85 },
    { date: 'Oct', clearingRate: 78 },
    { date: 'Nov', clearingRate: 72 },
    { date: 'Dec', clearingRate: 68 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Top Section: Geographic Opportunity Index */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--accent-dim)', display: 'grid', placeItems: 'center' }}>
            <Globe style={{ width: '16px', height: '16px', color: 'var(--accent-light)' }} />
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text)', letterSpacing: '-0.02em' }}>Geographic Opportunity Index</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-3)' }}>Regional conversion mapping and average opportunity thresholds</p>
          </div>
        </div>

        <BentoCard style={{ padding: '24px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <th style={{ paddingBottom: '12px', fontSize: '10px', fontWeight: '700', color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Target Country</th>
                <th style={{ paddingBottom: '12px', fontSize: '10px', fontWeight: '700', color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'right' }}>Daily Impressions</th>
                <th style={{ paddingBottom: '12px', fontSize: '10px', fontWeight: '700', color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'right' }}>Avg Win CPM</th>
                <th style={{ paddingBottom: '12px', fontSize: '10px', fontWeight: '700', color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center' }}>Bidding Share</th>
                <th style={{ paddingBottom: '12px', fontSize: '10px', fontWeight: '700', color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center' }}>Volatility Status</th>
              </tr>
            </thead>
            <tbody>
              {geos.map((geo, idx) => {
                const dailyImps = (geo.share * 1.8).toFixed(1) + 'M';
                const avgWinCpm = (geo as any).cpm || '$' + (4.20 + (geo.share * 0.18)).toFixed(2);
                
                return (
                  <tr key={idx} style={{ borderBottom: idx < geos.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                    <td style={{ padding: '14px 0', fontWeight: '700', color: 'var(--text)' }}>{geo.country}</td>
                    <td style={{ padding: '14px 0', textAlign: 'right', fontFamily: 'var(--font-mono)', color: 'var(--text-3)' }}>{dailyImps}</td>
                    <td style={{ padding: '14px 0', textAlign: 'right', fontWeight: '800', color: 'var(--accent-light)', fontFamily: 'var(--font-mono)' }}>{avgWinCpm}</td>
                    <td style={{ padding: '14px 0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: '700', color: 'var(--text-2)', fontFamily: 'var(--font-mono)', fontSize: '12px', width: '32px', textAlign: 'right' }}>{geo.share}%</span>
                        <div style={{ width: '80px', height: '6px', background: 'rgba(255,255,255,0.04)', borderRadius: '99px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', background: 'var(--accent-gradient)', width: `${geo.share}%` }} />
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 0', textAlign: 'center' }}>
                      <span className={geo.share > 30 ? 'tag tag-warn' : geo.share > 10 ? 'tag tag-accent' : 'tag tag-success'} style={{ padding: '3px 10px', fontSize: '10px' }}>
                        {geo.share > 30 ? 'High Volatility' : geo.share > 10 ? 'Active' : 'Low Volatility'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </BentoCard>
      </div>

      {/* Bottom Row: Auction Volatility (50%) + Category Positioning (50%) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        
        {/* Clearing Rate Volatility */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--accent-dim)', display: 'grid', placeItems: 'center' }}>
              <TrendingUp style={{ width: '16px', height: '16px', color: 'var(--accent-light)' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text)', letterSpacing: '-0.02em' }}>Auction Volatility Trends</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-3)' }}>12-month clearing rate stability</p>
            </div>
          </div>

          <BentoCard style={{ padding: '24px', flex: 1 }}>
            <div style={{ height: '210px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={clearingVolatilityData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="volatilityGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent-light)" stopOpacity={0.35}/>
                      <stop offset="95%" stopColor="var(--accent-light)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11 }} domain={[50, 100]} />
                  <Tooltip contentStyle={{ background: '#171C28', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="clearingRate" stroke="var(--accent-light)" strokeWidth={2} fillOpacity={1} fill="url(#volatilityGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </BentoCard>
        </div>

        {/* Category Positioning */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--accent-dim)', display: 'grid', placeItems: 'center' }}>
              <ShieldAlert style={{ width: '16px', height: '16px', color: 'var(--accent-light)' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text)', letterSpacing: '-0.02em' }}>Competitive Positioning</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-3)' }}>Market category intelligence & bidding density</p>
            </div>
          </div>

          <BentoCard style={{ padding: '24px', flex: 1 }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ background: 'rgba(255,255,255,0.018)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.03)' }}>
                  <span style={{ fontSize: '10px', color: 'var(--text-4)', textTransform: 'uppercase', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Top Competitor Positioning</span>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-2)' }}>{competitiveIntelligence?.topCompetitorPositioning || 'High CVR Focus & Benefit Callouts'}</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.018)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.03)' }}>
                  <span style={{ fontSize: '10px', color: 'var(--text-4)', textTransform: 'uppercase', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Audience Overlap Share</span>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-2)' }}>{competitiveIntelligence?.audienceOverlap || '42% High Overlap with Category Leaders'}</span>
                </div>
              </div>

              <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-3)' }}>
                <span>Category Leaders: {(competitiveIntelligence?.categoryLeaders || []).length} Active</span>
                <span className="tag tag-success">Optimized</span>
              </div>
            </div>
          </BentoCard>
        </div>

      </div>

    </div>
  );
}
