'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, LayoutGrid, Users, Network, Database, ShieldAlert, Smartphone, Globe, Sparkles, FileText, Settings, Coins, ArrowRight } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: string) => void;
  onRunAnalysis: (url: string) => void;
}

export default function CommandPalette({ isOpen, onClose, onSelectTab, onRunAnalysis }: CommandPaletteProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled externally
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navActions = [
    { id: 'overview', label: 'Overview Dashboard', category: 'Navigation', icon: LayoutGrid },
    { id: 'audience', label: 'Audience Intelligence', category: 'Navigation', icon: Users },
    { id: 'identity', label: 'Cross-Device Identity Graph', category: 'Navigation', icon: Network },
    { id: 'datasources', label: 'Connected Data Sources', category: 'Navigation', icon: Database },
    { id: 'campaign', label: 'Campaign Intelligence', category: 'Navigation', icon: Sparkles },
    { id: 'fraud', label: 'Traffic Quality & Fraud Audit', category: 'Navigation', icon: ShieldAlert },
    { id: 'oem', label: 'OEM Hardware Insights', category: 'Navigation', icon: Smartphone },
    { id: 'inventory', label: 'DSP & Publisher Analytics', category: 'Navigation', icon: Coins },
    { id: 'geo', label: 'Geo Intelligence & Regional Yield', category: 'Navigation', icon: Globe },
    { id: 'recommendations', label: 'AI Recommendations', category: 'Navigation', icon: Sparkles },
    { id: 'reports', label: 'Executive Reports Center', category: 'Navigation', icon: FileText },
    { id: 'settings', label: 'Platform Settings & API Keys', category: 'Navigation', icon: Settings },
  ];

  const presets = [
    { name: 'Duolingo', url: 'https://play.google.com/store/apps/details?id=com.duolingo' },
    { name: 'Tinder', url: 'https://apps.apple.com/app/id547702041' },
    { name: 'Candy Crush', url: 'https://play.google.com/store/apps/details?id=com.king.candycrushsaga' },
    { name: 'Spotify', url: 'https://apps.apple.com/app/id324684580' },
  ];

  const filteredNav = navActions.filter(a => a.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <AnimatePresence>
      <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '10vh', background: 'rgba(5, 5, 5, 0.75)', backdropFilter: 'blur(12px)' }} onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          onClick={e => e.stopPropagation()}
          style={{ width: '100%', maxWidth: '640px', background: '#0F121C', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', boxShadow: '0 25px 50px rgba(0,0,0,0.7)', overflow: 'hidden' }}
        >
          {/* Top Search Input */}
          <div style={{ display: 'flex', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', gap: '12px' }}>
            <Search style={{ width: '18px', height: '18px', color: 'var(--accent-light)' }} />
            <input
              type="text"
              autoFocus
              placeholder="Search platform modules, commands, or app store URLs..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && query.trim()) {
                  onRunAnalysis(query);
                  onClose();
                }
              }}
              style={{ width: '100%', background: 'transparent', border: 'none', color: 'var(--text)', fontSize: '14px', outline: 'none' }}
            />
            <span style={{ fontSize: '10px', color: 'var(--text-4)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: '4px', fontFamily: 'var(--font-mono)' }}>ESC</span>
          </div>

          {/* Body List */}
          <div style={{ maxHeight: '380px', overflowY: 'auto', padding: '12px' }}>
            {/* Quick Demo Presets */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '10px', fontWeight: '700', color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '4px 8px', marginBottom: '6px' }}>Quick Demo Presets</div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {presets.map(p => (
                  <button
                    key={p.name}
                    onClick={() => { onRunAnalysis(p.url); onClose(); }}
                    style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px', color: 'var(--text-2)', fontSize: '12px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <span>{p.name}</span>
                    <ArrowRight style={{ width: '12px', height: '12px', opacity: 0.6 }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation List */}
            <div>
              <div style={{ fontSize: '10px', fontWeight: '700', color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '4px 8px', marginBottom: '6px' }}>Platform Navigation</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {filteredNav.map(nav => (
                  <div
                    key={nav.id}
                    onClick={() => { onSelectTab(nav.id); onClose(); }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', transition: 'background 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <nav.icon style={{ width: '16px', height: '16px', color: 'var(--accent-light)' }} />
                      <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text)' }}>{nav.label}</span>
                    </div>
                    <span style={{ fontSize: '10px', color: 'var(--text-4)' }}>Jump to tab</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div style={{ padding: '10px 16px', background: 'rgba(5,5,5,0.5)', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: 'var(--text-4)' }}>
            <span>Navigation: ↑↓ Enter</span>
            <span>AdsIdol Intelligence Engine v3.0</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
