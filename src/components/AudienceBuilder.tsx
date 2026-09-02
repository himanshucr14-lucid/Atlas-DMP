'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Filter, Plus, Target, Layers, Play, Settings2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function AudienceBuilder() {
  const [audienceSize, setAudienceSize] = useState(2450000);
  const [matchRate, setMatchRate] = useState(86);
  
  const compositionData = [
    { name: '1st Party (CRM)', value: 45, color: 'var(--accent)' },
    { name: '2nd Party (Partners)', value: 30, color: 'var(--info)' },
    { name: '3rd Party (Exchanges)', value: 25, color: 'var(--text-3)' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Header */}
      <div className="bento" style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-surface-3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-dim)', display: 'grid', placeItems: 'center' }}>
            <Users style={{ width: '24px', height: '24px', color: 'var(--accent)' }} />
          </div>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text)', letterSpacing: '-0.02em' }}>Audience Segmentation Studio</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-3)' }}>Combine data sources to build high-intent programmatic cohorts</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ padding: '10px 16px', background: 'var(--bg-surface-2)', border: '1px solid var(--card-border)', borderRadius: '8px', color: 'var(--text)', fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Settings2 style={{ width: '14px', height: '14px' }} /> Configuration
          </button>
          <button style={{ padding: '10px 16px', background: 'var(--accent)', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Play style={{ width: '14px', height: '14px' }} /> Activate Audience
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
        
        {/* Logic Builder */}
        <div className="bento" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-4)' }}>Cohort Logic Rules</div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Rule 1 */}
            <div style={{ background: 'var(--bg-surface-3)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ padding: '6px 12px', background: 'var(--bg-surface-2)', borderRadius: '6px', fontSize: '11px', fontWeight: '800', color: 'var(--text-4)' }}>INCLUDE</div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text)', fontWeight: '600' }}>Event: <span style={{ color: 'var(--accent)' }}>App Installed</span></span>
                <span style={{ color: 'var(--text-4)' }}>in the last</span>
                <span style={{ fontSize: '13px', color: 'var(--text)', fontWeight: '600' }}>30 Days</span>
              </div>
              <Filter style={{ width: '14px', height: '14px', color: 'var(--text-4)', cursor: 'pointer' }} />
            </div>

            {/* AND Connector */}
            <div style={{ paddingLeft: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '2px', height: '20px', background: 'var(--card-border)' }} />
              <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--info)', background: 'var(--info-dim)', padding: '4px 8px', borderRadius: '4px' }}>AND</span>
            </div>

            {/* Rule 2 */}
            <div style={{ background: 'var(--bg-surface-3)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ padding: '6px 12px', background: 'var(--bg-surface-2)', borderRadius: '6px', fontSize: '11px', fontWeight: '800', color: 'var(--text-4)' }}>INCLUDE</div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text)', fontWeight: '600' }}>Device Tier: <span style={{ color: 'var(--info)' }}>Premium</span></span>
              </div>
              <Filter style={{ width: '14px', height: '14px', color: 'var(--text-4)', cursor: 'pointer' }} />
            </div>

            {/* EXCLUDE Connector */}
            <div style={{ paddingLeft: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '2px', height: '20px', background: 'var(--card-border)' }} />
              <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--danger)', background: 'var(--danger-dim)', padding: '4px 8px', borderRadius: '4px' }}>EXCLUDE</span>
            </div>

            {/* Rule 3 */}
            <div style={{ background: 'var(--bg-surface-3)', border: '1px solid var(--danger-border)', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ padding: '6px 12px', background: 'var(--bg-surface-2)', borderRadius: '6px', fontSize: '11px', fontWeight: '800', color: 'var(--danger)' }}>EXCLUDE</div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text)', fontWeight: '600' }}>Event: <span style={{ color: 'var(--danger)' }}>Subscription Cancelled</span></span>
                <span style={{ color: 'var(--text-4)' }}>all time</span>
              </div>
              <Filter style={{ width: '14px', height: '14px', color: 'var(--text-4)', cursor: 'pointer' }} />
            </div>
          </div>
          
          <button style={{ marginTop: '12px', padding: '16px', background: 'transparent', border: '1px dashed var(--card-border)', borderRadius: '12px', color: 'var(--text-3)', fontSize: '13px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--text-3)'} onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--card-border)'}>
            <Plus style={{ width: '16px', height: '16px' }} /> Add Rule
          </button>
        </div>

        {/* Real-time Estimates */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div className="bento" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-4)', marginBottom: '16px' }}>Estimated Reach</div>
            <div style={{ fontSize: '42px', fontWeight: '800', color: 'var(--accent)', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>{audienceSize.toLocaleString()}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px', padding: '6px 12px', background: 'var(--success-dim)', borderRadius: '99px' }}>
              <Target style={{ width: '12px', height: '12px', color: 'var(--success)' }} />
              <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--success)' }}>Highly Addressable</span>
            </div>
          </div>

          <div className="bento" style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-4)', marginBottom: '16px' }}>Data Composition</div>
            <div style={{ height: '140px', width: '100%', position: 'relative' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={compositionData} cx="50%" cy="50%" innerRadius={45} outerRadius={60} paddingAngle={2} dataKey="value" stroke="none">
                    {compositionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'var(--bg-surface-2)', border: '1px solid var(--card-border)', borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                <span style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>{matchRate}%</span>
                <span style={{ fontSize: '9px', fontWeight: '700', color: 'var(--text-4)', textTransform: 'uppercase' }}>Match Rate</span>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
              {compositionData.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }} />
                    <span style={{ color: 'var(--text-2)', fontWeight: '600' }}>{item.name}</span>
                  </div>
                  <span style={{ color: 'var(--text)', fontFamily: 'var(--font-mono)', fontWeight: '700' }}>{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
