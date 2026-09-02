'use client';

import { motion } from 'framer-motion';
import { Database, BarChart2, Lightbulb, Smartphone, Globe, ShieldCheck, Activity } from 'lucide-react';
import { AIEngineResult } from '../lib/connectors/types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import BentoCard from './BentoCard';

interface InventoryIntelProps {
  publisherIntel: AIEngineResult['publisherIntelligence'];
  inventoryIntel: AIEngineResult['inventoryIntelligence'];
  sspDistributions: AIEngineResult['sspDistributions'];
}

export default function InventoryIntel({
  publisherIntel = [],
  inventoryIntel = [],
  sspDistributions = []
}: InventoryIntelProps) {
  
  // Format SSP data for recharts
  const sspData = sspDistributions.map(s => ({
    name: s.ssp,
    value: Number(s.winRate) || 0,
    cpm: s.clearingCpm
  }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Top Row: Publisher Category Split & SSP Win Rates */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '24px' }}>
        
        {/* Publisher Intelligence */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--accent-dim)', display: 'grid', placeItems: 'center' }}>
              <Globe style={{ width: '16px', height: '16px', color: 'var(--accent-light)' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text)', letterSpacing: '-0.02em' }}>Publisher Intelligence</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-3)' }}>Top category overlaps and regional publisher app lists</p>
            </div>
          </div>

          <BentoCard style={{ padding: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
              {publisherIntel.map((item, idx) => (
                <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 2fr', gap: '16px', alignItems: 'center', paddingBottom: idx < publisherIntel.length - 1 ? '16px' : 0, borderBottom: idx < publisherIntel.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <div>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text)' }}>{item.category}</span>
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: '700', color: 'var(--accent-light)', fontFamily: 'var(--font-mono)', fontSize: '13px', width: '36px' }}>{item.share}%</span>
                      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.04)', borderRadius: '99px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', background: 'var(--accent-gradient)', width: `${item.share}%` }} />
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {item.apps.map((app, appIdx) => (
                      <span key={appIdx} style={{ fontSize: '11px', padding: '3px 8px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', color: 'var(--text-2)', borderRadius: '6px', fontWeight: '600' }}>
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>
        </div>

        {/* SSP & Exchange Clearing */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--accent-dim)', display: 'grid', placeItems: 'center' }}>
              <Activity style={{ width: '16px', height: '16px', color: 'var(--accent-light)' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text)', letterSpacing: '-0.02em' }}>Exchange Clearing</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-3)' }}>Win Rates by SSP</p>
            </div>
          </div>

          <BentoCard style={{ padding: '24px', flex: 1 }}>
            <div style={{ height: '240px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sspData} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 600 }} width={90} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.03)' }} 
                    contentStyle={{ background: '#171C28', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px' }}
                    formatter={(value: any, name: any, props: any) => [`${value}% (CPM: ${props.payload.cpm})`, 'Win Rate']} 
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                    {sspData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? 'var(--accent-light)' : 'rgba(255,255,255,0.08)'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </BentoCard>
        </div>

      </div>

      {/* Bottom Row: Inventory Formats Specifications Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--accent-dim)', display: 'grid', placeItems: 'center' }}>
            <Smartphone style={{ width: '16px', height: '16px', color: 'var(--accent-light)' }} />
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text)', letterSpacing: '-0.02em' }}>Inventory Format Specifications</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-3)' }}>Ad unit placements & expected performance benchmarks</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {inventoryIntel.map((item, idx) => (
            <BentoCard key={idx} style={{ padding: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)' }}>{item.format}</h4>
                    <span className="tag tag-success">Trust {item.trust}</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ background: 'rgba(255,255,255,0.018)', padding: '10px', borderRadius: '8px' }}>
                      <span style={{ fontSize: '10px', color: 'var(--text-4)', textTransform: 'uppercase', fontWeight: '700', display: 'block', marginBottom: '2px' }}>Expected CVR</span>
                      <span style={{ fontSize: '15px', fontWeight: '800', fontFamily: 'var(--font-mono)', color: 'var(--text)' }}>{item.cvr}</span>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.018)', padding: '10px', borderRadius: '8px' }}>
                      <span style={{ fontSize: '10px', color: 'var(--text-4)', textTransform: 'uppercase', fontWeight: '700', display: 'block', marginBottom: '2px' }}>Floor CPM</span>
                      <span style={{ fontSize: '15px', fontWeight: '800', fontFamily: 'var(--font-mono)', color: 'var(--text)' }}>{item.cpm}</span>
                    </div>
                  </div>

                  <p style={{ fontSize: '12px', color: 'var(--text-2)', lineHeight: 1.5, marginBottom: '14px' }}>
                    {item.engagement}
                  </p>
                </div>

                <div style={{ paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-3)' }}>
                  <span>Reach: {item.reach}</span>
                  <span>Retention: {item.retention}</span>
                </div>
              </div>
            </BentoCard>
          ))}
        </div>
      </div>

    </div>
  );
}
