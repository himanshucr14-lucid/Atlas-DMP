'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import Strands from './Strands';

const LOADING_STEPS = [
  'Connecting to DMP...',
  'Fetching audience graph...',
  'Resolving identities...',
  'Analyzing campaigns...',
  'Building AI insights...',
  'Finalizing dashboard...',
];

interface LoadingExperienceProps {
  onComplete?: () => void;
}

export default function LoadingExperience({ onComplete }: LoadingExperienceProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) { clearInterval(progressInterval); return 100; }
        const diff = (100 - prev) * 0.1;
        return Math.min(99, prev + Math.max(0.8, diff));
      });
    }, 500);

    const stepInterval = setInterval(() => {
      setCurrentStepIndex((prevIndex) => {
        if (prevIndex < LOADING_STEPS.length - 1) {
          setCompletedSteps((prev) => [...prev, prevIndex]);
          return prevIndex + 1;
        } else {
          clearInterval(stepInterval);
          setProgress(100);
          setTimeout(() => { onCompleteRef.current?.(); }, 900);
          return prevIndex;
        }
      });
    }, 900);

    return () => { clearInterval(progressInterval); clearInterval(stepInterval); };
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      width: '100%',
      background: '#090B12',
      position: 'relative',
      overflow: 'hidden',
    }}>
      
      {/* React Bits Strands Wave Animation - Centered Focal Visualizer */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '700px',
        height: '240px',
        marginBottom: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Strands
          colors={["#3B82F6", "#7C3AED", "#06B6D4", "#10B981"]}
          count={4}
          speed={0.6}
          amplitude={1.3}
          waviness={1.4}
          thickness={0.85}
          glow={3.0}
          taper={2.5}
          spread={1.2}
          intensity={0.8}
          saturation={1.6}
          opacity={0.95}
          scale={1.4}
          glass={false}
        />
      </div>

      {/* Progress strip */}
      <div style={{ width: '480px', maxWidth: '90vw', zIndex: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '11px', color: 'rgba(148,163,184,0.7)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
            Scanning Intelligence Database
          </span>
          <motion.span
            style={{ fontSize: '13px', fontWeight: 700, color: '#38bdf8', fontVariantNumeric: 'tabular-nums' }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {Math.round(progress)}%
          </motion.span>
        </div>

        {/* Progress bar */}
        <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden', marginBottom: '24px' }}>
          <motion.div
            style={{ height: '100%', background: 'linear-gradient(90deg, #3B82F6, #7C3AED, #10B981)', borderRadius: '99px' }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut', duration: 0.5 }}
          />
        </div>

        {/* Step checklist */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '240px', overflowY: 'auto' }}>
          {LOADING_STEPS.map((step, idx) => {
            const isCompleted = completedSteps.includes(idx);
            const isCurrent = currentStepIndex === idx;
            const isUpcoming = idx > currentStepIndex;

            return (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: isUpcoming ? 0.3 : 1, x: 0 }}
                transition={{ delay: idx * 0.04 }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '8px 12px', borderRadius: '8px',
                  background: isCurrent ? 'rgba(59,130,246,0.1)' : isCompleted ? 'rgba(16,185,129,0.06)' : 'transparent',
                  border: `1px solid ${isCurrent ? 'rgba(59,130,246,0.3)' : isCompleted ? 'rgba(16,185,129,0.15)' : 'transparent'}`,
                  transition: 'all 0.3s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                    >
                      <Check style={{ width: '11px', height: '11px', color: '#10B981', strokeWidth: 3 }} />
                    </motion.div>
                  ) : isCurrent ? (
                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid #38bdf8', borderTopColor: 'transparent', flexShrink: 0, animation: 'spin 0.7s linear infinite' }} />
                  ) : (
                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }} />
                  )}
                  <span style={{ fontSize: '12px', color: isCurrent ? '#e2e8f0' : isCompleted ? '#94a3b8' : '#475569', fontWeight: isCurrent ? 600 : 400, letterSpacing: '0.01em' }}>
                    {step}
                  </span>
                </div>
                <AnimatePresence>
                  {isCurrent && (
                    <motion.span
                      key="processing"
                      initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} exit={{ opacity: 0 }}
                      transition={{ repeat: Infinity, duration: 1.4 }}
                      style={{ fontSize: '9px', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700 }}
                    >
                      Live
                    </motion.span>
                  )}
                  {isCompleted && (
                    <span style={{ fontSize: '9px', color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700 }}>OK</span>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
