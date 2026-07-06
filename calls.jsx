/* =====================================================================
   TOTAL CALLS & SMS — scannable list with inline detail drawer
   ===================================================================== */

const Calls = () => {
  const [range, setRange] = React.useState('7d');
  const [filter, setFilter] = React.useState('all');
  const [expanded, setExpanded] = React.useState(null);

  const filtered = CALLS.filter(c => {
    if (filter === 'sms' && c.kind !== 'sms') return false;
    if (filter === 'answered' && c.status !== 'answered') return false;
    if (filter === 'missed' && c.status !== 'missed' && c.status !== 'unanswered') return false;
    if (filter === 'voicemail' && c.audio !== 'voicemail') return false;
    if (filter === 'recordings' && c.audio !== 'recording') return false;
    return true;
  });

  return (
    <div className="content">
      <div className="pghd">
        <div>
          <div className="eyebrow">Activity · Calls & SMS</div>
          <h1>Total Calls &amp; SMS</h1>
          <p className="sub">Showing {CALLS.length} of 56 interactions in the last 7 days · 42 answered, 8 missed, 6 voicemails.</p>
        </div>
        <div className="actions">
          <button className="btn ghost" title="Pause live"><Icon name="pause" size={14} /></button>
          <button className="btn ghost" title="Refresh"><Icon name="refresh" size={14} /></button>
          <button className="btn secondary"><Icon name="download" size={14} />Export CSV</button>
          <div className="dropdown" style={{padding:'8px 12px', whiteSpace:'nowrap'}}>
            <Icon name="calendar" size={14} />
            Last 7 days
            <Icon name="chevron-down" size={12} />
          </div>
        </div>
      </div>

      {/* Mini stats row */}
      <div style={{display:'grid', gridTemplateColumns:'repeat(6, 1fr)', gap:10, marginBottom:18}}>
        {[
          { l: 'All', n: 56, c: 'var(--ink-900)', active: filter==='all', f:'all' },
          { l: 'Inbound', n: 38, c: 'var(--info)', active: false, f:'all' },
          { l: 'Outbound', n: 8, c: 'var(--success)', active: false, f:'all' },
          { l: 'SMS', n: 10, c: '#4F46E5', active: filter==='sms', f:'sms' },
          { l: 'Missed', n: 8, c: 'var(--red)', active: filter==='missed', f:'missed' },
          { l: 'Voicemail', n: 6, c: 'var(--warning)', active: filter==='voicemail', f:'voicemail' },
        ].map((s, i) => (
          <button
            key={i}
            onClick={() => setFilter(s.f)}
            style={{
              background: s.active ? '#fff' : 'transparent',
              border: '1px solid ' + (s.active ? 'var(--ink-900)' : 'var(--ink-200)'),
              borderRadius: 10,
              padding: '12px 14px',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'all 120ms',
            }}
          >
            <div style={{display:'flex', alignItems:'center', gap:8}}>
              <span style={{width:8, height:8, borderRadius:'50%', background: s.c}}></span>
              <span style={{fontSize:11, fontFamily:'var(--font-display)', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.1em', color:'var(--ink-500)'}}>{s.l}</span>
            </div>
            <div style={{fontFamily:'var(--font-display)', fontWeight:700, fontSize:24, color:'var(--ink-900)', marginTop:6, letterSpacing:'-0.02em'}}>{s.n}</div>
          </button>
        ))}
      </div>

      <div className="card">
        <div className="tbl-toolbar">
          <div className="search-inline">
            <Icon name="search" size={14}/>
            <input placeholder="Search by number, service, customer or message…" />
          </div>
          <button className={`filter-chip ${filter==='all'?'active':''}`} onClick={() => setFilter('all')}>All</button>
          <button className={`filter-chip ${filter==='answered'?'active':''}`} onClick={() => setFilter('answered')}>Answered</button>
          <button className={`filter-chip ${filter==='missed'?'active':''}`} onClick={() => setFilter('missed')}>Missed</button>
          <button className={`filter-chip ${filter==='voicemail'?'active':''}`} onClick={() => setFilter('voicemail')}>Voicemail</button>
          <button className={`filter-chip ${filter==='recordings'?'active':''}`} onClick={() => setFilter('recordings')}>Recordings</button>
          <div className="spacer"></div>
          <button className="dropdown"><Icon name="filter" size={12}/>More filters</button>
          <button className="dropdown"><Icon name="sliders" size={12}/>Columns</button>
        </div>

        <div className="tbl-wrap">
          <table className="tbl">
            <thead>
              <tr>
                <th style={{width:36, paddingLeft:20}}></th>
                <th style={{width:36}}></th>
                <th style={{width:110, whiteSpace:'nowrap'}}>Date / Time</th>
                <th style={{width:96}}>Duration</th>
                <th style={{minWidth:180}}>Customer</th>
                <th style={{minWidth:200}}>Service</th>
                <th>Message</th>
                <th style={{width:110}}>Status</th>
                <th style={{width:130}}>Phone user</th>
                <th style={{width:80}}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <React.Fragment key={i}>
                  <tr
                    onClick={() => setExpanded(expanded === i ? null : i)}
                    style={{cursor:'pointer'}}
                    className={c.flag ? '' : ''}
                  >
                    <td style={{paddingLeft:20}}>
                      {c.flag && <Icon name="flag" size={14} className="" />}
                    </td>
                    <td>
                      <div className={`dir-ic ${c.dirClass}`}>
                        <Icon name={c.dirIcon} size={12} />
                      </div>
                    </td>
                    <td>
                      <div style={{fontFamily:'var(--font-mono)', fontSize:12, color:'var(--ink-900)', fontWeight:500, whiteSpace:'nowrap'}}>{c.date}</div>
                      <div style={{fontFamily:'var(--font-mono)', fontSize:11, color:'var(--ink-500)', marginTop:2, whiteSpace:'nowrap'}}>{c.time}</div>
                    </td>
                    <td className="num">{c.duration || (c.audio ? '' : '—')}
                      {c.audio && (
                        <div style={{marginTop:4}}>
                          <button className="audio-btn" data-type={c.audio} onClick={(e)=>e.stopPropagation()}>
                            <span className="pp"><Icon name="play" size={8}/></span>
                            {c.audio === 'voicemail' ? 'VM' : 'Rec'}
                          </button>
                        </div>
                      )}
                    </td>
                    <td>
                      <div style={{fontFamily:'var(--font-mono)', fontSize:12.5, color:'var(--ink-900)', fontWeight:500, whiteSpace:'nowrap'}}>{c.customer}</div>
                      <div style={{fontSize:11, color:'var(--ink-500)', marginTop:2, whiteSpace:'nowrap'}}>{c.customerLoc}</div>
                    </td>
                    <td>
                      <div style={{fontSize:12.5, color:'var(--ink-800)', fontWeight:500, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', maxWidth:200}}>{c.service}</div>
                      <div style={{fontFamily:'var(--font-mono)', fontSize:11, color:'var(--ink-500)', marginTop:2, whiteSpace:'nowrap'}}>{c.jetNumber}</div>
                    </td>
                    <td><div className="cell-sms">{c.sms || <span style={{color:'var(--ink-300)'}}>—</span>}</div></td>
                    <td><span className={`pill ${c.statusClass}`}><span className="d"></span>{c.statusLabel}</span></td>
                    <td><div style={{fontSize:12.5, color:'var(--ink-800)', fontWeight:500, whiteSpace:'nowrap'}}>{c.user || <span style={{color:'var(--ink-400)'}}>—</span>}</div></td>
                    <td>
                      <div className="row-acts">
                        <button title="Notes"><Icon name="note" size={14}/></button>
                        <button title="Expand"><Icon name={expanded === i ? 'chevron-down' : 'chevron'} size={14}/></button>
                      </div>
                    </td>
                  </tr>
                  {expanded === i && (
                    <tr className="drawer-row">
                      <td colSpan="10">
                        <div className="drawer">
                          <div className="grp">
                            <h5>Call details</h5>
                            <div className="row"><span className="k">Caller ID</span><span className="v">{c.customer}</span></div>
                            <div className="row"><span className="k">Tracking number</span><span className="v">{c.jetNumber}</span></div>
                            <div className="row"><span className="k">Service</span><span className="v">{c.service}</span></div>
                            <div className="row"><span className="k">Answering point</span><span className="v">{c.answeringPoint || 'Direct to user'}</span></div>
                            <div className="row"><span className="k">IVR path</span><span className="v">{c.ivr || '—'}</span></div>
                            <div className="row"><span className="k">Geo / postcode</span><span className="v">{c.customerLoc}</span></div>
                          </div>
                          <div className="grp">
                            <h5>Attribution &amp; notes</h5>
                            <div className="row"><span className="k">Source</span><span className="v">{c.source || 'Direct'}</span></div>
                            <div className="row"><span className="k">Campaign</span><span className="v">{c.campaign || '—'}</span></div>
                            <div className="row"><span className="k">Landing page</span><span className="v">{c.landingPage || '—'}</span></div>
                            <div style={{marginTop:14, display:'flex', gap:8}}>
                              <button className="btn secondary sm"><Icon name="note" size={12}/>Add note</button>
                              <button className="btn secondary sm"><Icon name="flag" size={12}/>{c.flag ? 'Unflag' : 'Flag'}</button>
                              <button className="btn secondary sm"><Icon name="copy" size={12}/>Copy link</button>
                              <div className="spacer"></div>
                              <button className="btn primary sm">Open full record →</button>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pgn">
          <div className="rng">Showing 1–{filtered.length} of 56</div>
          <div className="pp">
            Rows per page:
            <select defaultValue="25"><option>10</option><option>25</option><option>50</option><option>100</option></select>
          </div>
          <div className="nav">
            <button disabled><Icon name="chevrons-left" size={12}/></button>
            <button disabled><Icon name="chevron-left" size={12}/></button>
            <button><Icon name="chevron-right" size={12}/></button>
            <button><Icon name="chevrons-right" size={12}/></button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- DATA ---------- */
const CALLS = [
  { dirClass:'sms', dirIcon:'sms', date:'2026-05-18', time:'15:27', duration:'', customer:'0485 862 201', customerLoc:'Sydney · NSW 2000', service:'Direct to Jackson Murphy', jetNumber:'0483 916 114', sms:'Thanks for setting up the numbers Jackson! I noticed I\'ve been charged the account invoice earlier than normally. The last charge was May 4th. Is this correct? Thanks, Lee', statusClass:'sent', statusLabel:'Inbound', user:'Jackson Murphy', source:'SMS reply' },
  { flag: true, dirClass:'in', dirIcon:'call-in', date:'2026-05-18', time:'14:52', duration:'02:13', customer:'0411 639 649', customerLoc:'Melbourne · VIC 3000', service:'Direct to Jackson Murphy', jetNumber:'0483 916 114', audio:'recording', statusClass:'ans', statusLabel:'Answered', user:'Jackson Murphy', source:'Google Ads', campaign:'AU · Brand · 2026 Q2', landingPage:'/cloud-phone-system' },
  { flag: true, dirClass:'in', dirIcon:'call-in', date:'2026-05-18', time:'14:48', duration:'01:49', customer:'0411 639 649', customerLoc:'Melbourne · VIC 3000', service:'Session Tracking', jetNumber:'1300 864 138', audio:'voicemail', statusClass:'unav', statusLabel:'Unavailable', user:'Support queue', answeringPoint:'Support IVR', ivr:'Press 2 — Billing', source:'Google Ads', campaign:'AU · Support · Brand' },
  { dirClass:'sms', dirIcon:'sms', date:'2026-05-18', time:'14:35', duration:'', customer:'0485 862 201', customerLoc:'Sydney · NSW 2000', service:'Direct to Jackson Murphy', jetNumber:'0483 916 114', sms:'Great thanks Jackson', statusClass:'sent', statusLabel:'Inbound', user:'Jackson Murphy' },
  { dirClass:'out', dirIcon:'call-out', date:'2026-05-18', time:'13:12', duration:'', customer:'0485 862 201', customerLoc:'Sydney · NSW 2000', service:'Direct to Jackson Murphy', jetNumber:'0483 916 114', sms:'thanks got it!', statusClass:'sent', statusLabel:'Outbound', user:'Jackson Murphy' },
  { dirClass:'sms', dirIcon:'sms', date:'2026-05-18', time:'12:50', duration:'', customer:'0485 862 201', customerLoc:'Sydney · NSW 2000', service:'Direct to Jackson Murphy', jetNumber:'0483 916 114', sms:'Done', statusClass:'sent', statusLabel:'Inbound', user:'Jackson Murphy' },
  { dirClass:'sms', dirIcon:'sms', date:'2026-05-18', time:'12:49', duration:'', customer:'0485 862 201', customerLoc:'Sydney · NSW 2000', service:'Direct to Jackson Murphy', jetNumber:'0483 916 114', sms:'Hey Jackson, it was on Wednesday I\'ll forward the email to support again', statusClass:'sent', statusLabel:'Inbound', user:'Jackson Murphy' },
  { dirClass:'out', dirIcon:'call-out', date:'2026-05-18', time:'12:43', duration:'', customer:'0485 862 201', customerLoc:'Sydney · NSW 2000', service:'Direct to Jackson Murphy', jetNumber:'0483 916 114', sms:'Hi Lee, I cannot find that email at all. what day did you send it?', statusClass:'sent', statusLabel:'Outbound', user:'Jackson Murphy' },
  { dirClass:'sms', dirIcon:'sms', date:'2026-05-18', time:'12:01', duration:'', customer:'0485 862 201', customerLoc:'Sydney · NSW 2000', service:'Direct to Jackson Murphy', jetNumber:'0483 916 114', sms:'Thanks very much Jackson!', statusClass:'sent', statusLabel:'Inbound', user:'Jackson Murphy' },
  { dirClass:'sms', dirIcon:'sms', date:'2026-05-18', time:'12:00', duration:'', customer:'0485 862 201', customerLoc:'Sydney · NSW 2000', service:'Direct to Jackson Murphy', jetNumber:'0483 916 114', sms:'Hi Lee, certainly! I must have missed your email, apologies. I will search for it', statusClass:'sent', statusLabel:'Inbound', user:'Jackson Murphy' },
  { flag: true, dirClass:'in', dirIcon:'call-in', date:'2026-05-18', time:'10:22', duration:'01:59', customer:'0402 541 528', customerLoc:'Brisbane · QLD 4000', service:'Direct to Jackson Murphy', jetNumber:'0483 916 114', audio:'recording', statusClass:'ans', statusLabel:'Answered', user:'Jackson Murphy', source:'Direct', landingPage:'/contact' },
  { flag: true, dirClass:'in', dirIcon:'call-missed', date:'2026-05-16', time:'18:39', duration:'00:09', customer:'0493 851 426', customerLoc:'Sydney · NSW 2026', service:'Direct to Jackson Murphy', jetNumber:'0483 916 114', audio:'voicemail', statusClass:'mis', statusLabel:'Unanswered', user:'Jackson Murphy', source:'Bing Ads', campaign:'AU · Cloud Phone' },
  { flag: true, dirClass:'in', dirIcon:'call-in', date:'2026-05-16', time:'13:02', duration:'00:17', customer:'0452 117 090', customerLoc:'Perth · WA 6000', service:'Session Tracking', jetNumber:'1300 864 138', audio:'recording', statusClass:'canc', statusLabel:'Cancelled', user:'—', answeringPoint:'Sales IVR', ivr:'Hung up before selection' },
  { flag: true, dirClass:'in', dirIcon:'call-in', date:'2026-05-15', time:'14:24', duration:'02:06', customer:'0434 195 971', customerLoc:'Adelaide · SA 5000', service:'Direct to Matt', jetNumber:'0488 811 729', audio:'recording', statusClass:'ans', statusLabel:'Answered', user:'Matt', source:'Facebook Ads', campaign:'Q2 Awareness' },
];

window.Calls = Calls;
