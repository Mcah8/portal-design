/* =====================================================================
   DASHBOARD — Home with real call activity
   ===================================================================== */

const Dashboard = ({ setPage }) => {
  const [range, setRange] = React.useState('14d');
  const [bannerOpen, setBannerOpen] = React.useState(true);

  return (
    <div className="content">

      <div className="pghd">
        <div>
          <div className="eyebrow">Tuesday, 19 May 2026 · 11:58 am</div>
          <h1>Good morning, Justin</h1>
          <p className="sub">Here's what's happening across your numbers today. <strong style={{color:'var(--ink-800)'}}>23 calls</strong> so far, <strong style={{color:'var(--ink-800)'}}>91%</strong> answered.</p>
        </div>
        <div className="actions">
          <button className="btn secondary"><Icon name="download" size={14} />Export</button>
          <button className="btn primary" onClick={() => setPage('phone-users')}><Icon name="plus" size={14} />Add phone user</button>
        </div>
      </div>

      {bannerOpen && (
        <div className="banner">
          <div className="ic"><Icon name="alert" size={16} /></div>
          <div className="msg">
            <div className="ttl">Payment overdue — $3,702.18</div>
            <div className="sb">Invoice #INV-2026-0419 was due 14 May. Pay now to avoid service suspension on 25 May.</div>
          </div>
          <button className="btn primary sm">Pay now</button>
          <button className="x" onClick={() => setBannerOpen(false)}><Icon name="x" size={14} /></button>
        </div>
      )}

      {/* KPI ROW */}
      <div className="kpis">
        <KPI tone="red" icon="phone" label="Calls today" value="847" delta="+12.4%" deltaDir="up" sparkColor="#ED1C24" sparkPoints="0,24 20,22 40,20 60,18 80,12 100,16 120,10 140,14 160,8 180,10 200,4" />
        <KPI tone="green" icon="call-in" label="Answer rate" value="91.2%" delta="+1.8 pts" deltaDir="up" sparkColor="#0E8A4A" sparkPoints="0,18 20,20 40,16 60,14 80,18 100,14 120,12 140,10 160,12 180,8 200,8" />
        <KPI tone="amber" icon="voicemail" label="Voicemails" value="14" delta="+3 unheard" deltaDir="up" sparkColor="#D97706" sparkPoints="0,28 20,26 40,28 60,22 80,24 100,18 120,20 140,14 160,16 180,12 200,10" />
        <KPI tone="blue" icon="sms" label="SMS today" value="42" delta="+8 inbound" deltaDir="up" sparkColor="#1D4FD8" sparkPoints="0,28 40,24 80,26 120,18 160,20 200,12" />
      </div>

      {/* MAIN GRID */}
      <div className="dash-grid">
        <div className="dash-left">

          {/* CHART */}
          <div className="card chart-card">
            <div className="hd">
              <div>
                <h3>Call volume</h3>
                <div className="meta">Answered vs missed across all tracking numbers</div>
              </div>
              <div className="seg">
                {['24h', '7d', '14d', '30d', 'QTD'].map(r => (
                  <button key={r} className={range === r ? 'on' : ''} onClick={() => setRange(r)}>{r}</button>
                ))}
              </div>
            </div>
            <div className="chart-legend">
              <span><span className="sw" style={{background:'var(--red)'}}></span>Answered</span>
              <span><span className="sw" style={{background:'var(--ink-400)', borderTop:'2px dashed var(--ink-400)', height:0}}></span>Missed</span>
              <span><span className="sw" style={{background:'var(--warning)'}}></span>Voicemail</span>
            </div>
            <div style={{padding:'4px 20px 20px'}}>
              <CallChart />
            </div>
          </div>

          {/* RECENT CALLS */}
          <div className="card">
            <div className="hd">
              <div>
                <h3>Recent activity</h3>
                <div className="meta">Last 25 calls and SMS</div>
              </div>
              <button className="btn ghost sm" onClick={() => setPage('calls')}>View all →</button>
            </div>
            {RECENT.map((r, i) => (
              <div key={i} className="compact-row">
                <div className={`ic ${r.kind}`}><Icon name={r.icon} size={12} /></div>
                <div className="who">
                  <div className="who-num">{r.from}</div>
                  <div className="who-meta">{r.service} · {r.user}</div>
                </div>
                <div className="t">{r.time}</div>
                <div className="du">{r.dur}</div>
              </div>
            ))}
          </div>

        </div>

        <div className="dash-right">

          {/* LIVE CALLS */}
          <div className="card">
            <div className="hd">
              <div>
                <h3>Live calls</h3>
                <div className="meta">In progress now</div>
              </div>
              <span className="pill live"><span className="d"></span>3 LIVE</span>
            </div>
            <div className="live-list">
              {LIVE.map((l, i) => (
                <div key={i} className="live-item">
                  <span className="dot"></span>
                  <div>
                    <div className="num">{l.num}</div>
                    <div className="src">{l.src}</div>
                  </div>
                  <div className="dur">{l.dur}</div>
                </div>
              ))}
            </div>
          </div>

          {/* TOP NUMBERS */}
          <div className="card">
            <div className="hd">
              <div>
                <h3>Busiest numbers</h3>
                <div className="meta">Today's call volume</div>
              </div>
            </div>
            {NUMBERS.map((s, i) => (
              <div key={i} className="src-row">
                <div>
                  <div className="nm">{s.name}</div>
                  <div style={{fontSize:'11.5px', color:'var(--ink-500)', marginTop:2, fontFamily:'var(--font-mono)'}}>{s.num}</div>
                </div>
                <div className="bar"><div className="fill" style={{width: s.pct + '%'}}></div></div>
                <div className="ct">{s.count}</div>
              </div>
            ))}
          </div>

          {/* VOICEMAIL INBOX */}
          <div className="card">
            <div className="hd">
              <div>
                <h3>Voicemail inbox</h3>
                <div className="meta">3 new since yesterday</div>
              </div>
              <button className="btn ghost sm">All →</button>
            </div>
            {VOICEMAILS.map((v, i) => (
              <div key={i} style={{padding:'12px 20px', borderBottom: i < VOICEMAILS.length - 1 ? '1px solid var(--ink-100)' : 0, display:'flex', gap:10, alignItems:'center'}}>
                <button className="audio-btn" data-type="voicemail">
                  <span className="pp"><Icon name="play" size={8} /></span>
                  {v.dur}
                </button>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{fontFamily:'var(--font-mono)', fontSize:12.5, color:'var(--ink-900)'}}>{v.from}</div>
                  <div style={{fontSize:11.5, color:'var(--ink-500)', marginTop:2}}>{v.to} · {v.when}</div>
                </div>
                {!v.heard && <span className="pill mis" style={{padding:'2px 7px'}}>NEW</span>}
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

/* ---------- KPI Card ---------- */
const KPI = ({ tone, icon, label, value, delta, deltaDir, sparkColor, sparkPoints }) => (
  <div className={`kpi tone-${tone}`}>
    <div className="top">
      <div className="ic"><Icon name={icon} size={15} /></div>
      <div className="lbl">{label}</div>
    </div>
    <div className="n">{value}</div>
    <div className={`d ${deltaDir}`}>
      <Icon name={deltaDir === 'up' ? 'arrow-up' : 'arrow-down'} size={12} />
      {delta}
    </div>
    <svg className="spark" viewBox="0 0 200 36" preserveAspectRatio="none">
      <polyline fill="none" stroke={sparkColor} strokeWidth="1.6" points={sparkPoints} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

/* ---------- Chart ---------- */
const CallChart = () => {
  const w = 720, h = 220;
  const days = ['12', '13', '14', '15', '16', '17', '18', '19'];
  const answered = [120, 95, 140, 168, 152, 70, 60, 184];
  const missed = [12, 8, 14, 18, 13, 5, 4, 18];
  const max = 220;
  const x = i => (i / (days.length - 1)) * w;
  const y = v => h - 30 - ((v / max) * (h - 50));

  const linePath = vals => vals.map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(v)}`).join(' ');
  const areaPath = vals => `${vals.map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(v)}`).join(' ')} L ${w} ${h - 30} L 0 ${h - 30} Z`;

  return (
    <svg className="chart" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="cg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#ED1C24" stopOpacity="0.18"/>
          <stop offset="1" stopColor="#ED1C24" stopOpacity="0"/>
        </linearGradient>
      </defs>
      {/* gridlines */}
      <g stroke="#EEF0F3" strokeWidth="1">
        {[50, 100, 150, 200].map(v => (
          <line key={v} x1="0" y1={y(v)} x2={w} y2={y(v)} />
        ))}
      </g>
      {/* y-axis labels */}
      <g fontFamily="JetBrains Mono" fontSize="10" fill="#9A9DA4">
        {[0, 50, 100, 150, 200].map(v => (
          <text key={v} x="0" y={y(v) - 4}>{v}</text>
        ))}
      </g>
      {/* area */}
      <path d={areaPath(answered)} fill="url(#cg)" />
      {/* answered line */}
      <path d={linePath(answered)} fill="none" stroke="#ED1C24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      {/* dots */}
      {answered.map((v, i) => (
        <circle key={i} cx={x(i)} cy={y(v)} r="3" fill="#fff" stroke="#ED1C24" strokeWidth="2" />
      ))}
      {/* highlight latest */}
      <circle cx={x(answered.length - 1)} cy={y(answered[answered.length - 1])} r="6" fill="#ED1C24" fillOpacity="0.15" />
      <circle cx={x(answered.length - 1)} cy={y(answered[answered.length - 1])} r="4" fill="#ED1C24" />
      {/* missed line */}
      <path d={linePath(missed)} fill="none" stroke="#9A9DA4" strokeWidth="1.5" strokeDasharray="5 4" strokeLinecap="round" />
      {/* x labels */}
      <g fontFamily="JetBrains Mono" fontSize="10" fill="#9A9DA4" textAnchor="middle">
        {days.map((d, i) => (
          <text key={i} x={x(i)} y={h - 8}>May {d}</text>
        ))}
      </g>
      {/* tooltip on latest */}
      <g transform={`translate(${x(answered.length - 1) - 130}, ${y(answered[answered.length - 1]) - 56})`}>
        <rect width="120" height="44" rx="6" fill="#0B0B0C"/>
        <text x="10" y="17" fontFamily="Saira" fontSize="10" fontWeight="600" fill="#9A9DA4" letterSpacing="0.1em">TODAY · MAY 19</text>
        <text x="10" y="34" fontFamily="Saira" fontSize="14" fontWeight="700" fill="#fff">184 answered</text>
        <path d={`M ${120} 30 L ${130} 36 L ${120} 42 Z`} fill="#0B0B0C"/>
      </g>
    </svg>
  );
};

/* ---------- DATA ---------- */
const RECENT = [
  { kind: 'ans', icon: 'call-in', from: '+61 412 884 902', service: 'Direct to Jackson Murphy', user: 'Jackson Murphy', time: '11:47', dur: '04:12' },
  { kind: 'ans', icon: 'call-in', from: '02 9146 4610', service: 'Direct to Bianca Local', user: 'Bianca', time: '11:43', dur: '01:04' },
  { kind: 'mis', icon: 'call-missed', from: '+61 423 110 887', service: 'Session Tracking', user: 'Support queue', time: '11:32', dur: '—' },
  { kind: 'vm',  icon: 'voicemail', from: '+61 7 3088 5520', service: 'Direct to Matt', user: 'Matt', time: '11:18', dur: '00:48' },
  { kind: 'ans', icon: 'call-out', from: '+61 412 008 553', service: 'Outbound — Justin', user: 'Justin Graham', time: '10:54', dur: '06:21' },
  { kind: 'ans', icon: 'sms', from: '+61 411 639 649', service: 'SMS · Direct to Jackson Murphy', user: 'Jackson Murphy', time: '10:33', dur: '—' },
];

const LIVE = [
  { num: '+61 412 884 902', src: 'Google Ads · "cloud phone sydney"', dur: '00:42' },
  { num: '02 9146 4610', src: 'Direct to Bianca Local', dur: '01:08' },
  { num: '+61 422 901 314', src: 'Bing · cloud phone australia', dur: '02:45' },
];

const NUMBERS = [
  { name: 'Direct to Jackson Murphy', num: '0483 916 114', count: 218, pct: 92 },
  { name: 'Direct to Matt', num: '0488 811 729', count: 142, pct: 60 },
  { name: 'Session Tracking', num: '1300 864 138', count: 96, pct: 41 },
  { name: 'Direct to Justin Graham', num: '0488 839 133', count: 48, pct: 20 },
  { name: 'Ben B Desk', num: '(02) 9146 4608', count: 24, pct: 10 },
];

const VOICEMAILS = [
  { from: '+61 411 639 649', to: '0483 916 114', when: '11:18 am', dur: '0:48', heard: false },
  { from: '+61 432 901 011', to: '1300 864 138', when: '10:42 am', dur: '1:12', heard: false },
  { from: '+61 7 3088 5520', to: '0488 811 729', when: '09:55 am', dur: '0:23', heard: false },
  { from: '+61 402 541 528', to: '0483 916 114', when: 'Yesterday', dur: '2:03', heard: true },
];

window.Dashboard = Dashboard;
