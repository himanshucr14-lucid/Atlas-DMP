'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, ShieldCheck, Lock, Smartphone, RefreshCw } from 'lucide-react';

interface IdentityCard3DProps {
  brand: string;
  cardName: string;
  tokenId: string;
  hashKey: string;
  confidence: number;
  gradient: string;
}

export default function IdentityCard3D({ brand, cardName, tokenId, hashKey, confidence, gradient }: IdentityCard3DProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div style={{ perspective: '1000px', width: '100%', height: '200px', cursor: 'pointer' }} onClick={() => setIsFlipped(!isFlipped)}>
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          borderRadius: '16px',
        }}
      >
        {/* FRONT SIDE */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backfaceVisibility: 'hidden',
          borderRadius: '16px',
          background: gradient,
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'hidden'
        }}>
          {/* Subtle shine lines */}
          <div style={{ position: 'absolute', top: '-50%', right: '-50%', width: '200%', height: '200%', background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.15) 0%, transparent 60%)', pointerEvents: 'none' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Cpu style={{ width: '20px', height: '20px', color: '#FFF' }} />
              <span style={{ fontSize: '13px', fontWeight: '800', color: '#FFF', letterSpacing: '0.05em' }}>{brand} Knox Passkey</span>
            </div>
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.8)', background: 'rgba(255,255,255,0.15)', padding: '2px 8px', borderRadius: '99px', fontWeight: '700' }}>
              {confidence}% Match
            </span>
          </div>

          <div>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>Token Identifier</div>
            <div style={{ fontSize: '16px', fontWeight: '800', fontFamily: 'var(--font-mono)', color: '#FFF', letterSpacing: '0.08em' }}>{tokenId}</div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: 'rgba(255,255,255,0.8)' }}>
            <span>{cardName}</span>
            <span style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Click to flip 🔄</span>
          </div>
        </div>

        {/* BACK SIDE */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          borderRadius: '16px',
          background: '#0D111A',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          {/* Black magnetic stripe */}
          <div style={{ height: '32px', background: '#000', margin: '-20px -20px 10px -20px', width: 'calc(100% + 40px)' }} />

          <div>
            <div style={{ fontSize: '10px', color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>SHA-256 Encrypted Private Hash</div>
            <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--accent-light)', background: 'rgba(5,5,5,0.8)', padding: '8px 10px', borderRadius: '6px', wordBreak: 'break-all' }}>
              {hashKey}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10px', color: 'var(--text-3)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--success)' }}>
              <ShieldCheck style={{ width: '12px', height: '12px' }} /> Privacy Compliant
            </span>
            <span>AdsIdol Identity Core</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
