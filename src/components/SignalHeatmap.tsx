'use client';

import React, { useState } from 'react';
import BentoCard from './BentoCard';
import { Calendar, Activity, Info } from 'lucide-react';

export default function SignalHeatmap() {
  const [hoveredDay, setHoveredDay] = useState<{ day: number; count: string } | null>(null);

  // Generate 52 weeks x 7 days = 364 days grid
  const days = Array.from({ length: 364 }, (_, i) => {
    const intensity = Math.sin(i * 0.1) * 0.5 + 0.5;
    const level = intensity > 0.8 ? 4 : intensity > 0.6 ? 3 : intensity > 0.4 ? 2 : intensity > 0.2 ? 1 : 0;
    const count = (1.2 + intensity * 3.6).toFixed(2) + 'M signals';
    return { day: i + 1, level, count };
  });

  const getColor = (level: number) => {
    switch (level) {
      case 4: return '#3B82F6';
      case 3: return 'rgba(59, 130, 246, 0.7)';
      case 2: return 'rgba(59, 130, 246, 0.45)';
      case 1: return 'rgba(59, 130, 246, 0.25)';
      default: return 'rgba(255, 255, 255, 0.04)';
    }
  };

  return (
    <BentoCard style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Calendar style={{ width: '18px', height: '18px', color: 'var(--accent-light)' }} />
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text)' }}>365-Day Audience Processing Volume</h3>
            <span style={{ fontSize: '11px', color: 'var(--text-3)' }}>Daily behavioral signal ingest density across global DSP & OEM SDKs</span>
          </div>
        </div>

        <div style={{ fontSize: '12px', color: 'var(--text-2)', fontFamily: 'var(--font-mono)' }}>
          {hoveredDay ? hoveredDay.count : 'Total Processed: 845.2M signals/year'}
        </div>
      </div>

      {/* 52 Weeks Grid */}
      <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', paddingBottom: '8px' }}>
        {Array.from({ length: 52 }, (_, weekIdx) => (
          <div key={weekIdx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {Array.from({ length: 7 }, (_, dayIdx) => {
              const item = days[weekIdx * 7 + dayIdx] || { level: 0, count: '0 signals' };
              return (
                <div
                  key={dayIdx}
                  onMouseEnter={() => setHoveredDay(item)}
                  onMouseLeave={() => setHoveredDay(null)}
                  style={{
                    width: '11px',
                    height: '11px',
                    borderRadius: '2px',
                    background: getColor(item.level),
                    cursor: 'pointer',
                    transition: 'transform 0.15s, background 0.2s',
                    boxShadow: item.level === 4 ? '0 0 6px rgba(59, 130, 246, 0.5)' : 'none'
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.04)', fontSize: '11px', color: 'var(--text-3)' }}>
        <span>Jan 2025</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>Less</span>
          {[0, 1, 2, 3, 4].map(lvl => (
            <div key={lvl} style={{ width: '10px', height: '10px', borderRadius: '2px', background: getColor(lvl) }} />
          ))}
          <span>More</span>
        </div>
        <span>Dec 2025</span>
      </div>
    </BentoCard>
  );
}
