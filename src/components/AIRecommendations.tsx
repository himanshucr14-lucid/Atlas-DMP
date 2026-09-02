'use client';

import React from 'react';
import { Sparkles, TrendingUp, ShieldAlert, Target, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import BentoCard from './BentoCard';

export default function AIRecommendations() {
  const recommendations = [
    {
      title: 'Increase Budget on OEM Inventory in LATAM',
      confidence: 96.8,
      impact: '+24.5% ROAS Uplift',
      type: 'budget',
      desc: 'Samsung & Xiaomi pre-install conversion rates in Brazil & Mexico exhibit 2.4x higher D7 retention compared to open RTB exchanges.',
      action: 'Apply Budget Shift'
    },
    {
      title: 'Reduce Spend on Publisher X due to Fraud Flag',
      confidence: 99.2,
      impact: 'Save $4,200/mo',
      type: 'fraud',
      desc: 'SDK spoofing anomaly detected on Sub-Publisher #842. Immediate exclusion recommended to preserve campaign quality score.',
      action: 'Exclude Publisher'
    },
    {
      title: 'Expand Lookalike Audience in Tier 1 Markets',
      confidence: 94.5,
      impact: '+18.2% Reach',
      type: 'audience',
      desc: 'Proprietary graph identified 1.4M high-intent lookalike profiles matching top 10% LTV cohort parameters.',
      action: 'Activate Lookalike'
    },
    {
      title: 'High ROAS Opportunity in Android Rewarded SDK',
      confidence: 97.4,
      impact: '1.42x eCPM Margin',
      type: 'opportunity',
      desc: 'Bid floor dropped 15% on Rewarded Video SDK units during peak evening engagement hours.',
      action: 'Optimize Bids'
    },
    {
      title: 'Creative Fatigue Warning Detected',
      confidence: 92.1,
      impact: 'Prevent -8% CVR Dip',
      type: 'creative',
      desc: 'Ad variant #3 (Playable Demo) click-through rate dropped 12% over 7 days. Refresh creative pack.',
      action: 'Rotate Creatives'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Header Banner */}
      <BentoCard style={{ padding: '24px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--accent-dim)', border: '1px solid rgba(59, 130, 246, 0.2)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
              <Sparkles style={{ width: '20px', height: '20px', color: 'var(--accent-light)' }} />
            </div>
            <div>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}>
                <span className="tag tag-accent">Predictive AI Directives</span>
                <span className="tag tag-success">Real-Time Synthesis</span>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text)', letterSpacing: '-0.02em' }}>
                AI Recommendations & Autonomous Optimization
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-3)', marginTop: '2px' }}>
                Machine learning directives generated from real-time campaign performance and graph analytics.
              </p>
            </div>
          </div>
        </div>
      </BentoCard>

      {/* AI Recommendation Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
        {recommendations.map((rec, idx) => (
          <BentoCard key={idx} style={{ padding: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span className="tag tag-accent">{rec.impact}</span>
                  <div style={{ fontSize: '12px', fontWeight: '800', fontFamily: 'var(--font-mono)', color: 'var(--success)' }}>
                    Confidence: {rec.confidence}%
                  </div>
                </div>

                <h4 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)', marginBottom: '10px' }}>{rec.title}</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-2)', lineHeight: 1.6, marginBottom: '20px' }}>{rec.desc}</p>
              </div>

              <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-4)' }}>Automated Optimization Engine</span>
                <button className="btn btn-shader btn-sm">
                  {rec.action} <ArrowRight style={{ width: '13px', height: '13px' }} />
                </button>
              </div>
            </div>
          </BentoCard>
        ))}
      </div>

    </div>
  );
}
