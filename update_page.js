const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf-8');
const lines = content.split('\n');

function replaceLines(startPattern, endPattern, replacement) {
    const startIndex = lines.findIndex(l => l.includes(startPattern));
    const endIndex = lines.findIndex((l, i) => i > startIndex && l.includes(endPattern));
    if(startIndex !== -1 && endIndex !== -1) {
        lines.splice(startIndex, endIndex - startIndex + 1, replacement);
    } else {
        console.error('Could not find', startPattern);
    }
}

// 1. LandingPage
replaceLines('const LandingPage = () => (', '  );', `  const LandingPage = () => (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-base)', position: 'relative', overflow: 'hidden' }}>
      <div className="glow glow-green" style={{ width: '600px', height: '600px', top: '20%', left: '40%', transform: 'translate(-50%, -50%)', opacity: 0.15 }} />
      <div className="glow glow-blue" style={{ width: '500px', height: '500px', top: '70%', left: '30%', transform: 'translate(-50%, -50%)', opacity: 0.1 }} />
      <div className="glow glow-purple" style={{ width: '400px', height: '400px', top: '30%', right: '10%', transform: 'translate(-50%, -50%)', opacity: 0.1 }} />

      <div className="anim-fade-up" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '28px', padding: '6px 14px', borderRadius: '99px', border: '1px solid var(--accent-border)', background: 'var(--accent-dim)', backdropFilter: 'blur(8px)' }}>
        <div className="pulse-dot" />
        <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--accent)', letterSpacing: '0.05em' }}>AI-Powered Performance Intelligence · v3.0</span>
      </div>

      <h1 className="anim-fade-up" style={{ textAlign: 'center', marginBottom: '16px', fontSize: 'clamp(48px, 8vw, 88px)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 0.95, color: 'var(--text)', zIndex: 1 }}>
        Intelligence That
        <br />
        <span style={{ background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Wins Campaigns.</span>
      </h1>

      <p className="anim-fade-up" style={{ textAlign: 'center', fontSize: '16px', color: 'var(--text-2)', lineHeight: 1.6, maxWidth: '500px', marginBottom: '40px', zIndex: 1 }}>
        Decipher competitor strategies, align publisher signals, and execute precision campaigns with unmatched programmatic intelligence.
      </p>

      <div className="anim-fade-up" style={{ width: '100%', maxWidth: '600px', position: 'relative', zIndex: 1 }}>
        <div className="search-wrap" style={{ height: '56px', padding: '0 24px', borderRadius: '16px', background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(20px)', border: '1px solid var(--card-border)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
          <Search style={{ width: '20px', height: '20px', color: 'var(--text-3)' }} />
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') runAnalysis(inputValue); }}
            placeholder="Paste Google Play or App Store URL..."
            style={{ fontSize: '16px', background: 'transparent' }}
          />
          <button className="btn btn-accent" style={{ height: '40px' }} onClick={() => runAnalysis(inputValue)}>
            Analyze
          </button>
        </div>
      </div>

      <div className="anim-fade-up" style={{ marginTop: '30px', display: 'flex', gap: '12px', zIndex: 1 }}>
        {DEMO_PRESETS.map(p => (
          <button
            key={p.name}
            onClick={() => { setInputValue(p.url); runAnalysis(p.url); }}
            style={{ padding: '8px 16px', borderRadius: '99px', border: '1px solid var(--card-border)', background: 'var(--card)', color: 'var(--text-2)', fontSize: '12px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-border)'; e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--card-border)'; e.currentTarget.style.color = 'var(--text-2)'; }}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="anim-fade-up" style={{ position: 'absolute', bottom: '0', left: '0', right: '0', padding: '24px', display: 'flex', justifyContent: 'center', gap: '60px', background: 'linear-gradient(0deg, var(--bg-surface-1) 0%, transparent 100%)', borderTop: '1px solid var(--card-border)', zIndex: 1 }}>
        {[
          { v: '85M+', l: 'Signals' },
          { v: '120+', l: 'Countries' },
          { v: '5yr', l: 'History' },
          { v: '<30s', l: 'Analysis' },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '800', fontFamily: 'var(--font-mono)', color: 'var(--text)' }}>{s.v}</div>
            <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );`);

// 2. Sidebar
let sbStart = lines.findIndex(l => l.includes('<aside className="dash-sidebar">'));
let sbEnd = lines.findIndex((l, i) => i > sbStart && l.includes('</aside>'));
lines.splice(sbStart, sbEnd - sbStart + 1, `        <aside className="dash-sidebar">
          <div className="sidebar-brand">
            <div className="sidebar-logo-mark">A</div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: '800', letterSpacing: '-0.02em', color: 'var(--text)' }}>Atlas DMP</div>
            </div>
          </div>

          <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-4)', padding: '10px 12px 6px' }}>Workspace</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {TABS.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  className={\`nav-item \${activeTab === tab.id ? 'active' : ''}\`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon style={{ width: '16px', height: '16px', flexShrink: 0, opacity: activeTab === tab.id ? 1 : 0.5 }} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--card-border)' }}>
            {app.metadata.icon && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', borderRadius: '8px', background: 'var(--card)', border: '1px solid var(--card-border)', marginBottom: '12px' }}>
                <img src={app.metadata.icon} alt="" style={{ width: '28px', height: '28px', borderRadius: '6px', objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{app.metadata.scannedApp}</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-3)', fontWeight: '500' }}>Active Analysis</div>
                </div>
              </div>
            )}
            <div className="live-indicator">
              <div className="pulse-dot" />
              {app.metadata.isMockedData ? 'SIMULATED DATA' : 'LIVE SYSTEM'}
            </div>
          </div>
        </aside>`);

// 3. Topbar + App Header
let thStart = lines.findIndex(l => l.includes('<header className="dash-topbar">'));
let thEnd = lines.findIndex((l, i) => i > thStart && l.includes('</div>') && lines[i-1].includes('</div>') && lines[i-2].includes('</div>') && lines[i-3].includes('</div>')); // wait, safer to just replace from <header to <div className="dash-content">
thEnd = lines.findIndex((l, i) => i > thStart && l.includes('<div className="dash-content"'));
lines.splice(thStart, thEnd - thStart, `          <header className="dash-topbar">
            <div className="search-wrap" style={{ flex: 1, maxWidth: '400px' }}>
              <Search style={{ width: '14px', height: '14px', color: 'var(--text-3)', flexShrink: 0 }} />
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && runAnalysis(inputValue)}
                placeholder="Search queries..."
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: 'auto' }}>
              <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} className="btn btn-ghost btn-sm">
                {theme === 'dark' ? <Sun style={{ width: '14px', height: '14px' }} /> : <Moon style={{ width: '14px', height: '14px' }} />}
              </button>
              <button onClick={() => window.print()} className="btn btn-outline btn-sm">
                <Download style={{ width: '14px', height: '14px' }} /> Export
              </button>
              <button className="avatar" onClick={() => setShowProfile(!showProfile)}>{profile.initials}</button>
            </div>
          </header>

          <div className="dash-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              {app.metadata.icon && (
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{ position: 'absolute', inset: '-4px', borderRadius: '20px', background: 'var(--accent-gradient)', filter: 'blur(8px)', opacity: 0.5 }} />
                  <img src={app.metadata.icon} alt="" style={{ width: '56px', height: '56px', borderRadius: '16px', position: 'relative', zIndex: 1, border: '2px solid var(--bg-surface-1)' }} />
                </div>
              )}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <h1 style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '-0.02em', color: 'var(--text)' }}>
                    {app.metadata.scannedApp}
                  </h1>
                  <div className="live-indicator" style={{ background: 'transparent', border: '1px solid var(--accent-border)' }}>
                    <div className="pulse-dot" /> LIVE
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span className="tag">{app.overview.primaryMarket}</span>
                  <span className="tag">{app.metadata.platform === 'ios' ? 'iOS' : 'Android'}</span>
                  <span className="tag tag-accent">{app.metadata.installs ? \`\${app.metadata.installs} Installs\` : 'Installs N/A'}</span>
                  {app.metadata.category && <span className="tag">{app.metadata.category}</span>}
                  {app.metadata.rating && <span className="tag tag-success">★ {app.metadata.rating}</span>}
                </div>
              </div>
            </div>
          </div>
`);

// 4. Score Strip
let scStart = lines.findIndex(l => l.includes('gridTemplateColumns: \'repeat(4, 1fr)'));
let scEnd = lines.findIndex((l, i) => i > scStart && l.includes('</div>')); 
scEnd = lines.findIndex((l, i) => i > scEnd && l.includes('</div>')); // Since it's a loop, wait, better bounds.
scEnd = lines.findIndex((l, i) => i > scStart && l.includes('{/* Tab content */}')) - 1;
lines.splice(scStart, scEnd - scStart + 1, `            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '24px' }}>
              {[
                { l: 'Campaign Readiness', v: \`\${app.overview.campaignReadinessScore}%\`, cls: 'success' },
                { l: 'Audience Match', v: \`\${app.overview.audienceScore || 85}%\`, cls: 'info' },
                { l: 'Publisher Fit', v: \`\${app.overview.publisherMatchScore || 88}%\`, cls: 'success' },
                { l: 'UA Maturity', v: app.overview.uaMaturity, cls: 'purple' },
                { l: 'Market Opportunity', v: app.overview.marketCompetition, cls: 'warning' },
              ].map((s,i) => (
                <div key={i} className="score-card">
                  <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.05em', color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: '12px' }}>{s.l}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div className="stat-big">{s.v}</div>
                  </div>
                  <div className="glow" style={{ background: \`radial-gradient(circle, var(--\${s.cls}) 0%, transparent 70%)\`, opacity: 0.1, width: '100px', height: '100px', top: '-20px', right: '-20px' }} />
                </div>
              ))}
            </div>`);

// 5. Overview Tab
let otStart = lines.findIndex(l => l.includes("activeTab === 'overview' && ("));
let otEnd = lines.findIndex((l, i) => i > otStart && l.includes("activeTab === 'campaign' && (")) - 1;
lines.splice(otStart, otEnd - otStart + 1, `              {activeTab === 'overview' && (
                <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                    <div className="bento" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '40px' }}>
                      <div style={{ position: 'relative', width: '180px', height: '180px', flexShrink: 0 }}>
                        <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                          <circle cx="50" cy="50" r="40" fill="none" stroke="var(--card-border)" strokeWidth="8" />
                          <circle cx="50" cy="50" r="40" fill="none" stroke="var(--accent)" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * app.overview.campaignReadinessScore) / 100} style={{ transition: 'stroke-dashoffset 1.5s ease-out' }} />
                        </svg>
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                          <div style={{ fontSize: '36px', fontWeight: '800', fontFamily: 'var(--font-mono)', color: 'var(--text)', lineHeight: 1 }}>{app.overview.campaignReadinessScore}</div>
                          <div style={{ fontSize: '10px', color: 'var(--accent)', fontWeight: 'bold' }}>READINESS</div>
                        </div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text)', marginBottom: '16px' }}>Campaign Directives</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          {[
                            { l: 'Scaling Strategy', v: app.mediaPlanningIntelligence.scalingStrategy },
                            { l: 'Inventory Mix', v: app.mediaPlanningIntelligence.inventoryMix },
                            { l: 'Testing Strategy', v: app.mediaPlanningIntelligence.testingStrategy },
                          ].map((item, idx) => (
                            <div key={idx} style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--card-border)' }}>
                              <div style={{ fontSize: '10px', fontWeight: '700', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '0.05em' }}>{item.l}</div>
                              <div style={{ fontSize: '12px', color: 'var(--text-2)', lineHeight: 1.5 }}>{item.v}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bento" style={{ padding: '24px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: '20px' }}>Audience Purity Matrix</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {[
                          { l: 'High Value Users', v: app.audienceQualityIndicators.highValueUserPct },
                          { l: 'Organic Affinity', v: app.audienceQualityIndicators.organicAffinity },
                          { l: 'Returning Users', v: app.audienceQualityIndicators.returningUserPct },
                          { l: 'Loyalty Prob.', v: app.audienceQualityIndicators.loyaltyProbability },
                        ].map((q, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '12px', color: 'var(--text-2)' }}>{q.l}</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <div style={{ width: '80px', height: '6px', background: 'var(--card-border)', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{ width: \`\${q.v}%\`, height: '100%', background: 'var(--info)' }} />
                              </div>
                              <span style={{ fontSize: '12px', fontWeight: 'bold', fontFamily: 'var(--font-mono)', width: '32px', textAlign: 'right' }}>{q.v}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="bento" style={{ padding: '24px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: '16px' }}>Geo Intelligence</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {app.geoIntelligence.regionalDemand?.slice(0, 5).map((r, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '13px', color: 'var(--text)', width: '120px' }}>{r.region}</span>
                            <div style={{ flex: 1, margin: '0 16px', height: '4px', background: 'var(--card-border)', borderRadius: '2px', overflow: 'hidden' }}>
                              <div style={{ width: \`\${r.share}%\`, height: '100%', background: 'var(--success)' }} />
                            </div>
                            <span style={{ fontSize: '12px', fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}>{r.share}%</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bento" style={{ padding: '24px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: '16px' }}>Publisher Signal</h3>
                      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '160px', paddingBottom: '20px', borderBottom: '1px solid var(--card-border)' }}>
                        {app.publisherIntelligence.categories.slice(0, 6).map((c, i) => (
                          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '100%', height: \`\${c.affinityScore}%\`, background: 'var(--purple)', borderRadius: '4px 4px 0 0', opacity: 0.8 }} />
                          </div>
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                        {app.publisherIntelligence.categories.slice(0, 6).map((c, i) => (
                          <div key={i} style={{ flex: 1, fontSize: '9px', textAlign: 'center', color: 'var(--text-3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {c.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                    <div className="bento" style={{ padding: '24px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: '16px' }}>Inventory Quality</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {app.inventoryIntelligence.formats.slice(0, 3).map((f, i) => (
                          <div key={i} style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--card-border)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                              <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{f.type}</span>
                              <span style={{ fontSize: '11px', color: 'var(--text-2)' }}>CVR: {f.estimatedCVR}</span>
                            </div>
                            <div style={{ fontSize: '11px', color: 'var(--text-3)' }}>Win Rate: {f.winRate}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bento" style={{ padding: '24px', gridColumn: 'span 2' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: '16px' }}>Behavioral Insights</h3>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                        {app.audienceIntel.behavioralInsights.map((ins, i) => (
                          <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', marginTop: '6px', boxShadow: '0 0 6px var(--accent)' }} />
                            <span style={{ fontSize: '13px', color: 'var(--text)', lineHeight: 1.5 }}>{ins}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}`);

fs.writeFileSync('src/app/page.tsx', lines.join('\n'));
