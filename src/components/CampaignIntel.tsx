'use client';

import { motion } from 'framer-motion';
import { Database, ShieldAlert, Award, Compass, CheckCircle2 } from 'lucide-react';
import { AIEngineResult } from '../lib/connectors/types';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import BentoCard from './BentoCard';

interface CampaignIntelProps {
  campaignIntel: AIEngineResult['historicalCampaignIntel'];
  conversionLearnings: AIEngineResult['historicalConversionLearnings'];
  whyWeRecommend: AIEngineResult['whyWeRecommendThis'];
}

export default function CampaignIntel({
  campaignIntel,
  conversionLearnings,
  whyWeRecommend = []
}: CampaignIntelProps) {
  
  const metrics = [
    { label: 'Success Rate', value: campaignIntel.successRate },
    { label: 'Learning Confidence', value: campaignIntel.learningConfidence },
    { label: 'Volume Index', value: campaignIntel.volumeIndex },
    { label: 'Bidding Stability', value: campaignIntel.stability },
    { label: 'Avg Scaling Duration', value: campaignIntel.avgScalingTime },
    { label: 'Acquisition Strategy', value: campaignIntel.topUAStrategy },
    { label: 'Optimization Event', value: campaignIntel.bestOptimizationEvent },
    { label: 'Conversion Window', value: campaignIntel.bestConversionWindow },
    { label: 'Learning Maturity', value: campaignIntel.learningMaturity },
    { label: 'Initial Budget Tier', value: campaignIntel.recommendedBudgetTier },
    { label: 'Repeatability Rating', value: campaignIntel.repeatability }
  ];

  // Parse strings like "45%" into numbers for Recharts
  const parsePct = (val: string) => parseInt(val.replace(/[^0-9]/g, '')) || 0;

  const areaData = [
    { name: 'Day 0', pct: parsePct(conversionLearnings.conversionWindowPct.d0) },
    { name: 'Day 1', pct: parsePct(conversionLearnings.conversionWindowPct.d1) },
    { name: 'Day 3', pct: parsePct(conversionLearnings.conversionWindowPct.d3) },
    { name: 'Day 7', pct: parsePct(conversionLearnings.conversionWindowPct.d7) },
    { name: 'Day 14', pct: parsePct(conversionLearnings.conversionWindowPct.d14) },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: '24px' }}>
        
        {/* Historical Campaign Intelligence Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Floating Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--accent-dim)', display: 'grid', placeItems: 'center' }}>
              <Database style={{ width: '16px', height: '16px', color: 'var(--accent-light)' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text)', letterSpacing: '-0.02em' }}>Historical Campaign Intelligence</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-3)' }}>Target performance benchmarks compiled from learning database</p>
            </div>
          </div>

          <BentoCard style={{ padding: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {metrics.map((item, idx) => (
                <div key={idx} style={{ padding: '14px', background: 'rgba(255,255,255,0.018)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.03)' }}>
                  <span style={{ fontSize: '10px', fontWeight: '700', color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }}>{item.label}</span>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text)', lineHeight: 1.3 }}>{item.value || 'Favorable'}</span>
                </div>
              ))}
            </div>
          </BentoCard>
        </div>

        {/* Why We Recommend Strategy Validation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--accent-dim)', display: 'grid', placeItems: 'center' }}>
              <Award style={{ width: '16px', height: '16px', color: 'var(--accent-light)' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text)', letterSpacing: '-0.02em' }}>DMP Strategy Validation</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-3)' }}>Algorithmic evidence & directives</p>
            </div>
          </div>

          {whyWeRecommend.map((rec, idx) => (
            <BentoCard key={idx} style={{ padding: '24px', flex: 1 }}>
              <h4 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text)', marginBottom: '14px', letterSpacing: '-0.02em' }}>Recommended: {rec.recommendation}</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {rec.points.map((pt, pIdx) => (
                  <div key={pIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '12px', color: 'var(--text-2)', lineHeight: 1.5 }}>
                    <CheckCircle2 style={{ width: '14px', height: '14px', color: 'var(--success)', flexShrink: 0, marginTop: '2px' }} />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </BentoCard>
          ))}
        </div>

      </div>

      {/* Bottom Row: Conversion Funnel Learnings */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
        
        {/* Conversion accumulation curve */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--accent-dim)', display: 'grid', placeItems: 'center' }}>
              <Compass style={{ width: '16px', height: '16px', color: 'var(--accent-light)' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text)', letterSpacing: '-0.02em' }}>Conversion Accumulation Curve</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-3)' }}>Proportion of users achieving conversion event over time</p>
            </div>
          </div>

          <BentoCard style={{ padding: '24px', flex: 1 }}>
            <div style={{ height: '210px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPct" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent-light)" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="var(--accent-light)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ background: '#171C28', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px' }} 
                    itemStyle={{ color: 'var(--accent-light)', fontWeight: 'bold' }} 
                    labelStyle={{ color: 'var(--text)' }} 
                  />
                  <Area type="monotone" dataKey="pct" stroke="var(--accent-light)" strokeWidth={3} fillOpacity={1} fill="url(#colorPct)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </BentoCard>
        </div>

        {/* Funnel Impediments */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.1)', display: 'grid', placeItems: 'center' }}>
              <ShieldAlert style={{ width: '16px', height: '16px', color: 'var(--danger)' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text)', letterSpacing: '-0.02em' }}>Conversion Funnel Impediments</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-3)' }}>Funnel blockages identified in previous segments</p>
            </div>
          </div>

          <BentoCard style={{ padding: '24px', flex: 1 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { l: 'Best Onboarding Flow', v: conversionLearnings.bestOnboardingFunnel },
                { l: 'Primary Drop-off Stage', v: conversionLearnings.dropOffStage, c: 'var(--danger)' },
                { l: 'Common Abandonment Point', v: conversionLearnings.mostCommonAbandonmentPoint },
                { l: 'Best Registration Flow', v: conversionLearnings.bestPerformingRegistrationFlow },
                { l: 'Best Regional Gateway', v: conversionLearnings.bestPaymentMethod, c: 'var(--accent-light)' },
                { l: 'Optimal KYC Flow', v: conversionLearnings.bestKYCJourney },
                { l: 'Avg Delay to First Action', v: conversionLearnings.avgConversionDelay },
              ].map((d, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: i < 6 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-3)' }}>{d.l}</span>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: d.c || 'var(--text)', textAlign: 'right', maxWidth: '240px' }}>{d.v}</span>
                </div>
              ))}
            </div>
          </BentoCard>
        </div>

      </div>

    </div>
  );
}
