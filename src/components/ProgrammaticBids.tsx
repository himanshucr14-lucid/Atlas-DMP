'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Coins, Landmark, TrendingUp, AlertTriangle, Layers, Activity, CheckCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface HistoricalLift {
  year: string;
  ctrLift: string;
  cpiReduction: string;
  roasImprovement: string;
}

interface SspInventory {
  sspName: string;
  dailyBidRequests: string;
  avgWinCPM: string;
  trafficShare: number;
}

interface HistoricalDspOffer {
  offerId: string;
  appName: string;
  spent: string;
  installs: string;
  avgCPI: string;
  roas: string;
  status: string;
}

interface ProgrammaticBidsProps {
  historicalLifts: HistoricalLift[];
  targetKpis: {
    estimatedCPM: string;
    estimatedCPC: string;
    estimatedCPI: string;
  };
  sspInventoryVolume: SspInventory[];
  historicalDspOffers: HistoricalDspOffer[];
}

export default function ProgrammaticBids({ 
  historicalLifts, 
  targetKpis, 
  sspInventoryVolume = [], 
  historicalDspOffers = [] 
}: ProgrammaticBidsProps) {
  const [activeTab, setActiveTab] = useState<'bids' | 'offers' | 'lifts'>('bids');

  // Win-Rate and Auction density curve based on CPM
  const bidCurveData = [
    { cpm: '$1.00', winRate: 5, bidDensity: 95 },
    { cpm: '$2.00', winRate: 15, bidDensity: 90 },
    { cpm: '$3.00', winRate: 35, bidDensity: 82 },
    { cpm: '$4.00', winRate: 58, bidDensity: 70 },
    { cpm: '$5.00', winRate: 72, bidDensity: 55 },
    { cpm: '$6.00', winRate: 85, bidDensity: 40 },
    { cpm: '$7.00', winRate: 91, bidDensity: 28 },
    { cpm: '$8.00', winRate: 95, bidDensity: 18 },
    { cpm: '$10.00', winRate: 98, bidDensity: 8 },
    { cpm: '$12.00', winRate: 99, bidDensity: 2 }
  ];

  return (
    <div className="layout-classic">
      
      {/* Target KPIs Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-4 flex flex-col justify-between">
          <span className="text-xs text-slate-500 font-medium">CPM Auction Floor</span>
          <div className="text-2xl font-bold text-white mt-1 font-outfit">{targetKpis.estimatedCPM}</div>
          <span className="text-[10px] text-indigo-400 mt-2 font-mono uppercase tracking-wider">Direct DSP integration cap</span>
        </div>
        <div className="card p-4 flex flex-col justify-between">
          <span className="text-xs text-slate-500 font-medium">Optimal CPC Ceiling</span>
          <div className="text-2xl font-bold text-white mt-1 font-outfit">{targetKpis.estimatedCPC}</div>
          <span className="text-[10px] text-slate-500 mt-2 font-mono uppercase tracking-wider">Calculated win floor CPC</span>
        </div>
        <div className="card p-4 flex flex-col justify-between">
          <span className="text-xs text-slate-500 font-medium">Target CPI Limit</span>
          <div className="text-2xl font-bold text-white mt-1 font-outfit">{targetKpis.estimatedCPI}</div>
          <span className="text-[10px] text-slate-500 mt-2 font-mono uppercase tracking-wider">Optimal acquisition cost cap</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Database Dashboard Content (Left) */}
        <div className="lg:col-span-8 card p-0 overflow-hidden flex flex-col justify-between">
          
          {/* Header Controls */}
          <div className="p-5 border-b border-white/5 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                <Coins className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-base text-white font-outfit">Programmatic Bid Optimization</h3>
                <p className="text-[11px] text-slate-400">Auction curves, post-2023 performance lifts, and historical offer logs</p>
              </div>
            </div>
            
            <div className="flex gap-1 bg-slate-950/60 p-1 rounded-lg border border-white/5">
              {[
                { id: 'bids', label: 'Bidding Curve' },
                { id: 'offers', label: 'Previous Offers Run' },
                { id: 'lifts', label: 'Historical Lifts' }
              ].map((tb) => (
                <button
                  key={tb.id}
                  onClick={() => setActiveTab(tb.id as any)}
                  className={`px-3 py-1.5 rounded text-[10px] font-bold transition-all ${
                    activeTab === tb.id 
                      ? 'bg-indigo-500/25 text-white border border-indigo-500/20' 
                      : 'text-slate-400 hover:text-white bg-transparent'
                  }`}
                >
                  {tb.label}
                </button>
              ))}
            </div>
          </div>

          {/* TAB 1: Bidding Win-Rate Curves */}
          {activeTab === 'bids' && (
            <div className="p-5">
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-white">Auction Win-Rate & Density Probability</h4>
                <p className="text-[11px] text-slate-500">Determine bid pricing floor against overall target segment auction volume.</p>
              </div>

              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={bidCurveData}>
                    <defs>
                      <linearGradient id="colorWin" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorDensity" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="cpm" stroke="#475569" fontSize={9} tickLine={false} axisLine={false} />
                    <YAxis stroke="#475569" fontSize={9} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(17, 24, 39, 0.95)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '10px'
                      }}
                    />
                    <Legend verticalAlign="top" height={32} iconSize={8} wrapperStyle={{ fontSize: 10 }} />
                    <Area 
                      type="monotone" 
                      name="Win Probability (%)"
                      dataKey="winRate" 
                      stroke="var(--accent)" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorWin)" 
                    />
                    <Area 
                      type="monotone" 
                      name="Auction Density (Request Vol)"
                      dataKey="bidDensity" 
                      stroke="#4f46e5" 
                      strokeWidth={1.5}
                      strokeDasharray="4 4"
                      fillOpacity={1} 
                      fill="url(#colorDensity)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-start gap-2.5 mt-4 p-3 bg-slate-950/40 rounded-xl border border-white/5 text-[11px] text-slate-400">
                <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Optimal bidding window identified at CPM range where win rates surpass 70% while request volume remains liquid. Avoid bidding above CPM ceiling to prevent margin decay.</span>
              </div>
            </div>
          )}

          {/* TAB 2: Historical Offers We Ran (Real campaigns from our database) */}
          {activeTab === 'offers' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-slate-950/40 text-slate-500 font-bold uppercase tracking-wider text-[9px]">
                    <th className="p-3">Offer ID</th>
                    <th className="p-3">App Campaign Name</th>
                    <th className="p-3 text-right">Spend</th>
                    <th className="p-3 text-right">Installs</th>
                    <th className="p-3 text-right">Avg. CPI</th>
                    <th className="p-3 text-right">Achieved ROAS</th>
                    <th className="p-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {historicalDspOffers.map((offer) => (
                    <tr key={offer.offerId} className="hover:bg-white/5 transition-colors">
                      <td className="p-3 font-mono text-slate-400">{offer.offerId}</td>
                      <td className="p-3 font-semibold text-white">{offer.appName}</td>
                      <td className="p-3 text-right text-slate-300 font-mono">{offer.spent}</td>
                      <td className="p-3 text-right text-slate-300 font-mono">{offer.installs}</td>
                      <td className="p-3 text-right text-cyan-400 font-semibold">{offer.avgCPI}</td>
                      <td className="p-3 text-right text-emerald-400 font-semibold">{offer.roas}</td>
                      <td className="p-3 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                          offer.status === 'Active' 
                            ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/25' 
                            : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/25'
                        }`}>
                          {offer.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-3 bg-slate-950/30 border-t border-white/5 text-[10px] text-slate-500 text-center">
                * Campaigns compiled from Adsidol in-house DSP database post-2023 campaign archives.
              </div>
            </div>
          )}

          {/* TAB 3: Historical Lifts */}
          {activeTab === 'lifts' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-slate-950/40 text-slate-500 font-bold uppercase tracking-wider text-[9px]">
                    <th className="p-4">Fiscal Year</th>
                    <th className="p-4 text-right">Avg CTR Lift</th>
                    <th className="p-4 text-right">Average CPI Reduction</th>
                    <th className="p-4 text-right">ROAS Improvement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {historicalLifts.map((lift) => (
                    <tr key={lift.year} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-semibold text-white">{lift.year}</td>
                      <td className="p-4 text-right text-emerald-400 font-bold">{lift.ctrLift}</td>
                      <td className="p-4 text-right text-cyan-400 font-bold">{lift.cpiReduction}</td>
                      <td className="p-4 text-right text-purple-400 font-bold">{lift.roasImprovement}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-4 bg-slate-950/30 border-t border-white/5 text-[10px] text-slate-500 text-center">
                * Lifts show relative performance variance against default marketplace programmatic indexes.
              </div>
            </div>
          )}

        </div>

        {/* SSP Inventory Splits Sidebar (Right) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4 text-indigo-400" />
              <h4 className="font-semibold text-sm text-white font-outfit">SSP Inventory Splits</h4>
            </div>

            <div className="space-y-4">
              {sspInventoryVolume.map((ssp, idx) => (
                <div key={idx} className="p-3 bg-slate-950/40 rounded-xl border border-white/5 flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-white">{ssp.sspName}</span>
                    <span className="text-[10px] text-slate-500 uppercase font-bold">{ssp.dailyBidRequests} daily imps</span>
                  </div>
                  <div className="flex justify-between items-end text-xs">
                    <span className="text-[10px] text-slate-400">Win CPM average</span>
                    <span className="font-bold text-cyan-400 font-mono">{ssp.avgWinCPM}</span>
                  </div>
                  
                  {/* Traffic share bar */}
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mt-1.5">
                    <span 
                      className="block h-full bg-indigo-500" 
                      style={{ width: `${ssp.trafficShare}%`, background: 'var(--accent)' }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
