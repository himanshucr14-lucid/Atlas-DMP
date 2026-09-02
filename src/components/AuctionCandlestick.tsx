'use client';

import React from 'react';
import BentoCard from './BentoCard';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, Coins, Activity, Zap } from 'lucide-react';

const AUCTION_CANDLE_DATA = [
  { time: '10:00', open: 2.10, close: 2.45, high: 2.50, low: 2.05, volume: 1420 },
  { time: '10:15', open: 2.45, close: 2.30, high: 2.60, low: 2.25, volume: 1850 },
  { time: '10:30', open: 2.30, close: 2.75, high: 2.85, low: 2.28, volume: 2400 },
  { time: '10:45', open: 2.75, close: 2.65, high: 2.80, low: 2.55, volume: 1980 },
  { time: '11:00', open: 2.65, close: 2.95, high: 3.10, low: 2.60, volume: 3100 },
  { time: '11:15', open: 2.95, close: 3.20, high: 3.35, low: 2.90, volume: 4200 },
  { time: '11:30', open: 3.20, close: 3.15, high: 3.25, low: 3.05, volume: 2800 },
  { time: '11:45', open: 3.15, close: 3.48, high: 3.60, low: 3.10, volume: 4900 },
];

export default function AuctionCandlestick() {
  return (
    <BentoCard style={{ padding: '24px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'var(--accent-dim)', border: '1px solid rgba(59, 130, 246, 0.2)', display: 'grid', placeItems: 'center' }}>
            <Coins style={{ width: '18px', height: '18px', color: 'var(--accent-light)' }} />
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)' }}>DSP Real-Time Bid CPM Candlesticks</h3>
            <span style={{ fontSize: '11px', color: 'var(--text-3)' }}>Auction liquidity depth & bid clearing prices across Open RTB and OEM Pre-installs</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '10px', color: 'var(--text-4)', textTransform: 'uppercase', fontWeight: '700', display: 'block' }}>Clearing CPM</span>
            <span style={{ fontSize: '18px', fontWeight: '800', fontFamily: 'var(--font-mono)', color: 'var(--success)' }}>$3.48</span>
          </div>
          <span className="tag tag-success">+14.2% Peak</span>
        </div>
      </div>

      {/* Recharts Candlestick Bar Representation */}
      <div style={{ width: '100%', height: '220px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={AUCTION_CANDLE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis dataKey="time" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#475569" fontSize={11} tickLine={false} axisLine={false} domain={[1.5, 4.0]} tickFormatter={v => `$${v}`} />
            <Tooltip
              contentStyle={{ background: '#0F121C', borderColor: 'rgba(255,255,255,0.08)', borderRadius: '10px', color: '#FFF' }}
              formatter={(val: any) => [`$${val}`, 'Clearing CPM']}
            />
            <Bar dataKey="close" radius={[6, 6, 0, 0]}>
              {AUCTION_CANDLE_DATA.map((entry, idx) => (
                <Cell key={idx} fill={entry.close >= entry.open ? '#10B981' : '#EF4444'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Orderbook Depth Bar */}
      <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', fontSize: '12px' }}>
        <div>
          <span style={{ fontSize: '10px', color: 'var(--text-4)', textTransform: 'uppercase', fontWeight: '700', display: 'block' }}>High Bid</span>
          <span style={{ fontWeight: '800', fontFamily: 'var(--font-mono)', color: 'var(--text)' }}>$3.60</span>
        </div>
        <div>
          <span style={{ fontSize: '10px', color: 'var(--text-4)', textTransform: 'uppercase', fontWeight: '700', display: 'block' }}>Low Floor</span>
          <span style={{ fontWeight: '800', fontFamily: 'var(--font-mono)', color: 'var(--text)' }}>$2.05</span>
        </div>
        <div>
          <span style={{ fontSize: '10px', color: 'var(--text-4)', textTransform: 'uppercase', fontWeight: '700', display: 'block' }}>Liquidity Volume</span>
          <span style={{ fontWeight: '800', fontFamily: 'var(--font-mono)', color: 'var(--text)' }}>21.6M Bids</span>
        </div>
        <div>
          <span style={{ fontSize: '10px', color: 'var(--text-4)', textTransform: 'uppercase', fontWeight: '700', display: 'block' }}>Auction Win-Rate</span>
          <span style={{ fontWeight: '800', fontFamily: 'var(--font-mono)', color: 'var(--success)' }}>78.4%</span>
        </div>
      </div>
    </BentoCard>
  );
}
