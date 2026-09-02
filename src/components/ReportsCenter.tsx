'use client';

import React from 'react';
import { Download, FileText, CheckCircle2, ShieldAlert, BarChart3, Globe, Smartphone, Sparkles } from 'lucide-react';
import BentoCard from './BentoCard';

export default function ReportsCenter() {
  const reports = [
    { title: 'Executive Summary Report', icon: FileText, date: 'Generated Today, 08:30 AM', size: '2.4 MB', type: 'PDF' },
    { title: 'Audience Insights & Cohort Overlap', icon: BarChart3, date: 'Generated Today, 08:00 AM', size: '4.1 MB', type: 'CSV / PDF' },
    { title: 'Campaign Performance & Attribution', icon: Sparkles, date: 'Generated Yesterday', size: '6.8 MB', type: 'PDF' },
    { title: 'Traffic Quality & Fraud Audit Report', icon: ShieldAlert, date: 'Generated Yesterday', size: '1.8 MB', type: 'PDF' },
    { title: 'OEM Distribution & Hardware Analysis', icon: Smartphone, date: 'Generated 2 days ago', size: '3.2 MB', type: 'CSV' },
    { title: 'Geographic Intelligence & Regional Yield', icon: Globe, date: 'Generated 3 days ago', size: '5.1 MB', type: 'PDF' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Header Banner */}
      <BentoCard style={{ padding: '24px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--accent-dim)', border: '1px solid rgba(59, 130, 246, 0.2)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
              <FileText style={{ width: '20px', height: '20px', color: 'var(--accent-light)' }} />
            </div>
            <div>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}>
                <span className="tag tag-accent">Automated Export Engine</span>
                <span className="tag tag-success">Agency Executive Ready</span>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text)', letterSpacing: '-0.02em' }}>
                Enterprise Reports & Intelligence Exports
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-3)', marginTop: '2px' }}>
                Download comprehensive executive summaries, fraud audits, OEM hardware splits, and attribution analyses.
              </p>
            </div>
          </div>
        </div>
      </BentoCard>

      {/* Reports Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {reports.map((r, idx) => (
          <BentoCard key={idx} style={{ padding: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', display: 'grid', placeItems: 'center' }}>
                    <r.icon style={{ width: '18px', height: '18px', color: 'var(--accent-light)' }} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text)' }}>{r.title}</h4>
                    <span style={{ fontSize: '11px', color: 'var(--text-3)' }}>{r.date}</span>
                  </div>
                </div>
              </div>

              <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-4)', fontFamily: 'var(--font-mono)' }}>{r.size} • {r.type}</span>
                <button className="btn btn-outline btn-sm">
                  <Download style={{ width: '13px', height: '13px' }} /> Download
                </button>
              </div>
            </div>
          </BentoCard>
        ))}
      </div>

    </div>
  );
}
