'use client';

import { motion } from 'framer-motion';
import { Database, Activity, Server, Zap, RefreshCw, AlertTriangle, CheckCircle2, Cloud, Plus } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import BentoCard from './BentoCard';

export default function DataIntegration() {
  const syncData = [
    { time: '10:00', volume: 1.2 },
    { time: '10:05', volume: 1.8 },
    { time: '10:10', volume: 2.1 },
    { time: '10:15', volume: 1.5 },
    { time: '10:20', volume: 2.4 },
    { time: '10:25', volume: 3.2 },
    { time: '10:30', volume: 2.8 },
    { time: '10:35', volume: 2.9 },
    { time: '10:40', volume: 2.2 },
    { time: '10:45', volume: 1.9 },
  ];

  const connections = [
    { name: 'AppsFlyer SDK', status: 'healthy', latency: '42ms', syncRate: '1.2M/hr', lastSync: 'Live' },
    { name: 'Salesforce CRM (S2S)', status: 'healthy', latency: '120ms', syncRate: '450K/hr', lastSync: '2m ago' },
    { name: 'LiveRamp Graph', status: 'degraded', latency: '840ms', syncRate: '85K/hr', lastSync: '14m ago' },
    { name: 'AWS S3 Data Lake', status: 'healthy', latency: '65ms', syncRate: '5.4M/hr', lastSync: 'Live' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Header Banner */}
      <BentoCard style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--accent-dim)', border: '1px solid rgba(59, 130, 246, 0.2)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
              <Database style={{ width: '20px', height: '20px', color: 'var(--accent-light)' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text)', letterSpacing: '-0.02em' }}>Data Integration & Pipeline Health</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-3)', marginTop: '2px' }}>Real-time monitoring of ingestion streams and identity resolution</p>
            </div>
          </div>
          <button className="btn btn-outline btn-sm">
            <Plus style={{ width: '14px', height: '14px' }} /> Add Connection
          </button>
        </div>
      </BentoCard>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {[
          { label: 'Active Pipelines', value: '14/15', color: 'var(--success)', icon: Server },
          { label: 'Identity Match Rate', value: '88.4%', color: 'var(--accent-light)', icon: CheckCircle2 },
          { label: 'Avg Latency', value: '112ms', color: 'var(--warning)', icon: Zap },
          { label: 'Ingested Today', value: '14.2B', color: 'var(--accent-light)', icon: Cloud },
        ].map((stat, i) => (
          <BentoCard key={i} style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(255,255,255,0.02)', display: 'grid', placeItems: 'center', border: '1px solid rgba(255,255,255,0.04)' }}>
                <stat.icon style={{ width: '18px', height: '18px', color: stat.color }} />
              </div>
              <div>
                <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.05em', color: 'var(--text-4)', textTransform: 'uppercase', marginBottom: '4px' }}>{stat.label}</div>
                <div style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text)', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>{stat.value}</div>
              </div>
            </div>
          </BentoCard>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        
        {/* Connection Status Table */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--accent-dim)', display: 'grid', placeItems: 'center' }}>
              <Activity style={{ width: '16px', height: '16px', color: 'var(--accent-light)' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text)', letterSpacing: '-0.02em' }}>Pipeline Status</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-3)' }}>Connected real-time identity & analytics SDKs</p>
            </div>
          </div>

          <BentoCard style={{ padding: '24px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <th style={{ paddingBottom: '12px', fontSize: '10px', fontWeight: '700', color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Data Source</th>
                  <th style={{ paddingBottom: '12px', fontSize: '10px', fontWeight: '700', color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Status</th>
                  <th style={{ paddingBottom: '12px', fontSize: '10px', fontWeight: '700', color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'right' }}>Latency</th>
                  <th style={{ paddingBottom: '12px', fontSize: '10px', fontWeight: '700', color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'right' }}>Sync Volume</th>
                  <th style={{ paddingBottom: '12px', fontSize: '10px', fontWeight: '700', color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'right' }}>Last Sync</th>
                </tr>
              </thead>
              <tbody>
                {connections.map((conn, idx) => (
                  <tr key={idx} style={{ borderBottom: idx < connections.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                    <td style={{ padding: '14px 0', fontWeight: '600', color: 'var(--text)' }}>{conn.name}</td>
                    <td style={{ padding: '14px 0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: conn.status === 'healthy' ? 'var(--success)' : 'var(--warning)' }} />
                        <span style={{ fontSize: '12px', fontWeight: '600', color: conn.status === 'healthy' ? 'var(--success)' : 'var(--warning)', textTransform: 'capitalize' }}>{conn.status}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 0', textAlign: 'right', fontFamily: 'var(--font-mono)', color: 'var(--text-3)' }}>{conn.latency}</td>
                    <td style={{ padding: '14px 0', textAlign: 'right', fontFamily: 'var(--font-mono)', color: 'var(--text-2)' }}>{conn.syncRate}</td>
                    <td style={{ padding: '14px 0', textAlign: 'right', color: 'var(--text-3)', fontWeight: '500' }}>{conn.lastSync}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </BentoCard>
        </div>

        {/* Real-time Ingestion Stream Chart */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--accent-dim)', display: 'grid', placeItems: 'center' }}>
              <RefreshCw style={{ width: '16px', height: '16px', color: 'var(--accent-light)' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text)', letterSpacing: '-0.02em' }}>Ingestion Stream</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-3)' }}>Signals per second</p>
            </div>
          </div>

          <BentoCard style={{ padding: '24px', flex: 1 }}>
            <div style={{ height: '200px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={syncData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="streamGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent-light)" stopOpacity={0.35}/>
                      <stop offset="95%" stopColor="var(--accent-light)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: '#171C28', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="volume" stroke="var(--accent-light)" strokeWidth={2} fillOpacity={1} fill="url(#streamGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </BentoCard>
        </div>

      </div>

    </div>
  );
}
