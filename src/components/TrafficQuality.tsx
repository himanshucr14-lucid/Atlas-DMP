'use client';

import React from 'react';
import { ShieldAlert, ShieldCheck, AlertTriangle, Cpu, CheckCircle2, Lock, Activity } from 'lucide-react';
import BentoCard from './BentoCard';

export default function TrafficQuality() {
  const fraudModules = [
    { title: 'Bot Detection & Automation', risk: '0.2%', status: 'Minimal', score: 99.4, color: 'var(--success)' },
    { title: 'Click Spam & Flooding', risk: '1.4%', status: 'Low Risk', score: 96.2, color: 'var(--success)' },
    { title: 'Install Hijacking (CTIT)', risk: '0.8%', status: 'Low Risk', score: 98.1, color: 'var(--success)' },
    { title: 'SDK Spoofing & Emulators', risk: '0.4%', status: 'Minimal', score: 99.1, color: 'var(--success)' },
    { title: 'Proxy & VPN Anonymizers', risk: '2.1%', status: 'Monitored', score: 94.8, color: 'var(--accent-light)' },
    { title: 'Device Farm Clusters', risk: '0.6%', status: 'Blocked', score: 98.9, color: 'var(--success)' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Header Banner */}
      <BentoCard style={{ padding: '24px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.25)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
              <ShieldAlert style={{ width: '20px', height: '20px', color: 'var(--danger)' }} />
            </div>
            <div>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}>
                <span className="tag tag-success">Traffic Trust Score: 98.4%</span>
                <span className="tag tag-accent">Real-Time Inspection</span>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text)', letterSpacing: '-0.02em' }}>
                Traffic Quality & Anti-Fraud Audit Matrix
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-3)', marginTop: '2px' }}>
                Automated detection of bot activity, click spam, SDK spoofing, device farms, and proxy networks.
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '10px', color: 'var(--text-4)', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.1em', display: 'block', marginBottom: '4px' }}>Overall Risk Score</span>
            <span style={{ fontSize: '26px', fontWeight: '800', fontFamily: 'var(--font-mono)', color: 'var(--success)' }}>1.6% <span style={{ fontSize: '12px', color: 'var(--text-3)', fontWeight: '400' }}>(Very Low)</span></span>
          </div>
        </div>
      </BentoCard>

      {/* Grid of 6 Fraud Detection Modules */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {fraudModules.map((m, idx) => (
          <BentoCard key={idx} style={{ padding: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text)' }}>{m.title}</h4>
                  <span className="tag tag-success">{m.status}</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ background: 'rgba(255,255,255,0.018)', padding: '10px', borderRadius: '8px' }}>
                    <span style={{ fontSize: '10px', color: 'var(--text-4)', textTransform: 'uppercase', fontWeight: '700', display: 'block', marginBottom: '2px' }}>Detected Risk</span>
                    <span style={{ fontSize: '16px', fontWeight: '800', fontFamily: 'var(--font-mono)', color: m.color }}>{m.risk}</span>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.018)', padding: '10px', borderRadius: '8px' }}>
                    <span style={{ fontSize: '10px', color: 'var(--text-4)', textTransform: 'uppercase', fontWeight: '700', display: 'block', marginBottom: '2px' }}>Clean Rate</span>
                    <span style={{ fontSize: '16px', fontWeight: '800', fontFamily: 'var(--font-mono)', color: 'var(--text)' }}>{m.score}%</span>
                  </div>
                </div>
              </div>

              <div style={{ paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: 'var(--text-3)' }}>
                <span>Auto-Blocked at Bidder</span>
                <CheckCircle2 style={{ width: '13px', height: '13px', color: 'var(--success)' }} />
              </div>
            </div>
          </BentoCard>
        ))}
      </div>

    </div>
  );
}
