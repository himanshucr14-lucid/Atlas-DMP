'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity, Cpu, ShieldCheck, Zap } from 'lucide-react';

export default function LiveTicker() {
  const [items, setItems] = useState([
    { symbol: 'DSP CPM CLEARING', value: '$2.48', change: '+4.2%', isUp: true },
    { symbol: 'LIVE REQUESTS/SEC', value: '14,820 req/s', change: '+8.1%', isUp: true },
    { symbol: 'APPSFLYER SYNC', value: '8,420 ev/s', change: '+2.4%', isUp: true },
    { symbol: 'KNOX SYNC LATENCY', value: '12ms', change: '-1.8ms', isUp: true },
    { symbol: 'FRAUD BLOCK RATE', value: '0.02%', change: '-0.01%', isUp: true },
    { symbol: 'IDENTITIES MATCHED', value: '98.4%', change: '+0.3%', isUp: true },
    { symbol: 'REWARDED SDK CVR', value: '12.4%', change: '+1.1%', isUp: true },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => prev.map(item => {
        const rand = (Math.random() - 0.48) * 0.1;
        return {
          ...item,
          isUp: rand >= 0
        };
      }));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      width: '100%',
      height: '36px',
      background: '#090C15',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      position: 'relative',
      zIndex: 20
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '0 16px',
        height: '100%',
        background: '#0D111E',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        flexShrink: 0,
        fontSize: '11px',
        fontWeight: '800',
        color: 'var(--accent-light)',
        letterSpacing: '0.05em'
      }}>
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', animation: 'pulse 1.5s infinite' }} />
        <span>LIVE DMP TICKER</span>
      </div>

      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', alignItems: 'center', gap: '32px', whiteSpace: 'nowrap', paddingLeft: '16px' }}
      >
        {[...items, ...items].map((item, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px' }}>
            <span style={{ color: 'var(--text-3)', fontWeight: '700', letterSpacing: '0.05em' }}>{item.symbol}:</span>
            <span style={{ color: 'var(--text)', fontWeight: '800', fontFamily: 'var(--font-mono)' }}>{item.value}</span>
            <span style={{
              color: item.isUp ? '#10B981' : '#EF4444',
              fontWeight: '700',
              fontSize: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
              background: item.isUp ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              padding: '1px 5px',
              borderRadius: '4px'
            }}>
              {item.isUp ? <TrendingUp style={{ width: '10px', height: '10px' }} /> : <TrendingDown style={{ width: '10px', height: '10px' }} />}
              {item.change}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
