'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Network, Cpu, Shield, Search, RefreshCw, Layers, CheckCircle2, ArrowRight, Zap } from 'lucide-react';
import BentoCard from './BentoCard';

interface IdentityNode {
  id: string;
  type: 'device' | 'idfa' | 'cookie' | 'email' | 'phone' | 'appsflyer' | 'maid' | 'ip';
  label: string;
  confidence: number;
  status: 'linked' | 'verifying' | 'unresolved';
  lastSeen: string;
}

const INITIAL_NODES: IdentityNode[] = [
  { id: 'n1', type: 'device', label: 'Device ID: 8a4f9b2c-e10d', confidence: 99.8, status: 'linked', lastSeen: 'Just now' },
  { id: 'n2', type: 'idfa', label: 'IDFA / GAID: 4d28e710-33b9', confidence: 98.4, status: 'linked', lastSeen: '1m ago' },
  { id: 'n3', type: 'email', label: 'Email Hash: sha256_e940f...', confidence: 96.2, status: 'linked', lastSeen: '3m ago' },
  { id: 'n4', type: 'phone', label: 'Phone Hash: sha256_b311c...', confidence: 94.5, status: 'linked', lastSeen: '8m ago' },
  { id: 'n5', type: 'appsflyer', label: 'AppsFlyer ID: 168492040-af', confidence: 97.9, status: 'linked', lastSeen: 'Just now' },
  { id: 'n6', type: 'maid', label: 'MAID IDFA / GAID: MAID-9921', confidence: 95.1, status: 'linked', lastSeen: '12m ago' },
  { id: 'n7', type: 'cookie', label: 'Cookie ID: _ad_id_8820419', confidence: 91.0, status: 'linked', lastSeen: '15m ago' },
  { id: 'n8', type: 'ip', label: 'IP Subnet: 172.56.21.0/24', confidence: 89.3, status: 'verifying', lastSeen: '18m ago' },
];

export default function IdentityGraph() {
  const [nodes, setNodes] = useState<IdentityNode[]>(INITIAL_NODES);
  const [selectedNode, setSelectedNode] = useState<IdentityNode>(INITIAL_NODES[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isResolving, setIsResolving] = useState(false);

  const filteredNodes = nodes.filter(n => n.label.toLowerCase().includes(searchQuery.toLowerCase()) || n.type.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleResolve = () => {
    setIsResolving(true);
    setTimeout(() => {
      setIsResolving(false);
      setNodes(prev => prev.map(n => ({ ...n, status: 'linked' })));
    }, 1200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Identity Graph Header Card */}
      <BentoCard style={{ padding: '24px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--accent-dim)', border: '1px solid rgba(59, 130, 246, 0.2)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
              <Network style={{ width: '20px', height: '20px', color: 'var(--accent-light)' }} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span className="tag tag-accent">Deterministic + Probabilistic Graph</span>
                <span className="tag tag-success">98.4% Match Accuracy</span>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text)', letterSpacing: '-0.02em' }}>
                Cross-Device Identity Resolution Graph
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-3)', marginTop: '2px' }}>
                Unified identity mapping linking Device IDs, Ad IDs, Cookies, Hashed PII, and OpenRTB Bidder Tokens.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button className="btn btn-shader" onClick={handleResolve} disabled={isResolving}>
              <RefreshCw style={{ width: '14px', height: '14px', animation: isResolving ? 'spin 1s linear infinite' : 'none' }} />
              {isResolving ? 'Resolving Graph...' : 'Re-Run Identity Match'}
            </button>
          </div>
        </div>
      </BentoCard>

      {/* Main Grid: Interactive Canvas Network View + Identity Details Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '24px' }}>
        
        {/* Left Column: Interactive Node Graph Canvas */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Cpu style={{ width: '16px', height: '16px', color: 'var(--accent-light)' }} />
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text)' }}>Active Cluster Nodes ({filteredNodes.length})</h3>
            </div>
            
            {/* Search Input */}
            <div style={{ position: 'relative', width: '220px' }}>
              <Search style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', width: '13px', height: '13px', color: 'var(--text-3)' }} />
              <input
                type="text"
                placeholder="Filter nodes..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ width: '100%', height: '32px', paddingLeft: '30px', paddingRight: '12px', background: 'var(--bg-surface-2)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', color: 'var(--text)', fontSize: '12px', outline: 'none' }}
              />
            </div>
          </div>

          <BentoCard style={{ padding: '24px', minHeight: '380px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {/* Visual SVG Network Topology */}
            <div style={{ position: 'relative', width: '100%', height: '320px', background: 'rgba(5,5,5,0.6)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.03)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
                {/* Connecting Lines */}
                <line x1="50%" y1="50%" x2="25%" y2="25%" stroke="rgba(59, 130, 246, 0.25)" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="50%" y1="50%" x2="75%" y2="25%" stroke="rgba(59, 130, 246, 0.25)" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="50%" y1="50%" x2="20%" y2="70%" stroke="rgba(16, 185, 129, 0.25)" strokeWidth="1.5" />
                <line x1="50%" y1="50%" x2="80%" y2="70%" stroke="rgba(139, 92, 246, 0.25)" strokeWidth="1.5" />
                <line x1="50%" y1="50%" x2="50%" y2="85%" stroke="rgba(6, 182, 212, 0.25)" strokeWidth="1.5" />
              </svg>

              {/* Central Core Master Profile Node */}
              <motion.div
                style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10, cursor: 'pointer' }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div style={{ padding: '12px 18px', background: 'var(--accent-gradient)', borderRadius: '14px', boxShadow: '0 0 24px var(--accent-glow)', color: '#FFF', textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.9 }}>Unified Master Profile</div>
                  <div style={{ fontSize: '14px', fontWeight: '800', fontFamily: 'var(--font-mono)' }}>ID: #ADS-884920</div>
                </div>
              </motion.div>

              {/* Surrounding Node Badges */}
              {filteredNodes.map((node, idx) => {
                const positions = [
                  { top: '18%', left: '15%' },
                  { top: '18%', right: '15%' },
                  { bottom: '22%', left: '10%' },
                  { bottom: '22%', right: '10%' },
                  { bottom: '10%', left: '42%' },
                  { top: '45%', left: '8%' },
                  { top: '45%', right: '8%' },
                  { top: '8%', left: '42%' },
                ];
                const pos = positions[idx % positions.length];
                const isSelected = selectedNode.id === node.id;

                return (
                  <motion.div
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    style={{
                      position: 'absolute',
                      ...pos,
                      padding: '8px 12px',
                      background: isSelected ? 'rgba(59, 130, 246, 0.2)' : 'rgba(17, 21, 31, 0.85)',
                      border: `1px solid ${isSelected ? 'var(--accent-light)' : 'rgba(255, 255, 255, 0.08)'}`,
                      borderRadius: '10px',
                      backdropFilter: 'blur(8px)',
                      cursor: 'pointer',
                      zIndex: 5,
                      boxShadow: isSelected ? '0 0 16px rgba(59, 130, 246, 0.3)' : 'none'
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div style={{ fontSize: '10px', color: 'var(--text-4)', textTransform: 'uppercase', fontWeight: '700' }}>{node.type}</div>
                    <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text)', whiteSpace: 'nowrap' }}>{node.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </BentoCard>
        </div>

        {/* Right Column: Node Details & Identity Cluster Specs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Shield style={{ width: '16px', height: '16px', color: 'var(--accent-light)' }} />
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text)' }}>Node Verification & Attributes</h3>
          </div>

          <BentoCard style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <span className="tag tag-accent" style={{ marginBottom: '8px' }}>{selectedNode.type.toUpperCase()} IDENTIFIER</span>
                <h4 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)' }}>{selectedNode.label}</h4>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ background: 'rgba(255,255,255,0.018)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.03)' }}>
                  <span style={{ fontSize: '10px', color: 'var(--text-4)', textTransform: 'uppercase', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Match Confidence</span>
                  <span style={{ fontSize: '16px', fontWeight: '800', fontFamily: 'var(--font-mono)', color: 'var(--success)' }}>{selectedNode.confidence}%</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.018)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.03)' }}>
                  <span style={{ fontSize: '10px', color: 'var(--text-4)', textTransform: 'uppercase', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Sync Freshness</span>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-2)' }}>{selectedNode.lastSeen}</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-3)', fontWeight: '700', textTransform: 'uppercase' }}>Cross-Device Graph Links</div>
                <div style={{ padding: '10px', background: 'rgba(255,255,255,0.018)', borderRadius: '8px', fontSize: '12px', color: 'var(--text-2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Linked to AppsFlyer SDK ID</span>
                  <CheckCircle2 style={{ width: '14px', height: '14px', color: 'var(--success)' }} />
                </div>
                <div style={{ padding: '10px', background: 'rgba(255,255,255,0.018)', borderRadius: '8px', fontSize: '12px', color: 'var(--text-2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Linked to OpenRTB Bidder Token</span>
                  <CheckCircle2 style={{ width: '14px', height: '14px', color: 'var(--success)' }} />
                </div>
              </div>
            </div>

            <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--text-3)' }}>
              <span>Privacy Compliant (GDPR/CCPA)</span>
              <span className="tag tag-success">Hashed & Anonymized</span>
            </div>
          </BentoCard>
        </div>

      </div>

    </div>
  );
}
