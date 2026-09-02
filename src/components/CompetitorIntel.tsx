'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Compass, Eye, ShieldAlert, Award, FileText, Newspaper } from 'lucide-react';

interface CompetitorIntelProps {
  competitors: {
    topCompetitors: string[];
    categoryLeaders: string[];
    creativePositioning: string;
    possibleAudienceOverlap: string;
    isEstimate: boolean;
  };
  summary: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    potentialRisks: string[];
  };
  news: {
    latestNews: { title: string; source: string; date: string; url: string }[];
    fundingInfo?: string;
    isEstimate: boolean;
  };
}

export default function CompetitorIntel({ competitors, summary, news }: CompetitorIntelProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
      
      {/* Competitor Positioning & SWOT */}
      <div className="lg:col-span-8 glass-panel p-6 rounded-2xl border border-white/5 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-white font-outfit">Competitor Discovery & SWOT Analysis</h3>
              <p className="text-xs text-slate-400">Competitive positioning audits and threat intelligence</p>
            </div>
          </div>

          {/* Competitor List */}
          <div className="flex flex-wrap gap-2.5 mb-5 bg-slate-950/30 p-3.5 rounded-xl border border-white/5">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block w-full mb-1">Identified Competitors</span>
            {competitors.topCompetitors.length > 0 ? (
              competitors.topCompetitors.map((comp, idx) => (
                <span key={idx} className="text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2.5 py-1 rounded-md">
                  {comp}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-400 italic">Finding similar niche competitors...</span>
            )}
          </div>

          {/* SWOT Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-emerald-500/5 border border-emerald-500/10 p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2 text-emerald-400 font-medium text-xs font-outfit uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>Strengths & Opportunities</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {summary.strengths.slice(0, 2).map((str, idx) => <li key={idx}>• {str}</li>)}
                {summary.opportunities.slice(0, 1).map((op, idx) => <li key={idx}>• Opportunity: {op}</li>)}
              </ul>
            </div>

            <div className="bg-rose-500/5 border border-rose-500/10 p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2 text-rose-400 font-medium text-xs font-outfit uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4" />
                <span>Weaknesses & Risks</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {summary.weaknesses.slice(0, 2).map((wk, idx) => <li key={idx}>• {wk}</li>)}
                {summary.potentialRisks.slice(0, 1).map((risk, idx) => <li key={idx}>• Risk: {risk}</li>)}
              </ul>
            </div>
          </div>
        </div>

      </div>

      {/* News Intelligence */}
      <div className="lg:col-span-4 glass-panel p-6 rounded-2xl border border-white/5 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
              <Newspaper className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-white font-outfit">Market News intelligence</h3>
              <p className="text-xs text-slate-400">Latest company events and corporate metrics</p>
            </div>
          </div>

          {/* News Feed list */}
          <div className="space-y-3 mt-4 max-h-[220px] overflow-y-auto pr-1">
            {news.latestNews.length > 0 ? (
              news.latestNews.map((article, idx) => (
                <a
                  key={idx}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-slate-950/40 p-3 rounded-lg border border-white/5 hover:border-purple-500/30 hover:bg-slate-900/40 transition-all group"
                >
                  <h4 className="text-xs font-medium text-white group-hover:text-purple-300 transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                  <div className="flex justify-between items-center mt-2 text-[10px] text-slate-500">
                    <span>{article.source}</span>
                    <span>{new Date(article.date).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}</span>
                  </div>
                </a>
              ))
            ) : (
              <div className="text-center py-8 text-slate-500 text-xs italic">
                No recent media coverage found. Showing market demand forecasts.
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white/5 bg-purple-950/5 p-2 rounded border border-purple-500/5">
          <span className="text-[10px] text-slate-500 font-bold block">Company Funding & Expansion</span>
          <span className="text-xs text-slate-300 mt-1 block">
            {news.fundingInfo || 'No direct seed funding found. Expansion status: Organic tier-1 growth.'}
          </span>
        </div>
      </div>
    </div>
  );
}
