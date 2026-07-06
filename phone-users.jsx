/* =====================================================================
   PHONE USERS — Cleaner table with feature legend + drawer
   ===================================================================== */

const PhoneUsers = () => {
  const [selected, setSelected] = React.useState(new Set());
  const [filter, setFilter] = React.useState('all');
  const [search, setSearch] = React.useState('');

  const filtered = USERS.filter(u => {
    if (filter === 'mobile' && !u.feats.includes('mobile')) return false;
    if (filter === 'voicemail' && !u.feats.includes('voicemail')) return false;
    if (filter === 'alerts' && !u.alert) return false;
    if (search && !(u.name + u.email + u.ext).toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const toggleSel = (id) => {
    const n = new Set(selected);
    n.has(id) ? n.delete(id) : n.add(id);
    setSelected(n);
  };
  const toggleAll = () => {
    if (selected.size === filtered.length) setSelected(new Set());
    else setSelected(new Set(filtered.map(u => u.id)));
  };

  return (
    <div className="content">
      <div className="pghd">
        <div>
          <div className="eyebrow">Manage · Users</div>
          <h1>Phone Users</h1>
          <p className="sub">16 phone users · 3 with feature alerts. Set up extensions, devices, and call forwarding.</p>
        </div>
        <div className="actions">
          <button className="btn secondary"><Icon name="download" size={14} />Download CSV</button>
          <button className="btn primary"><Icon name="plus" size={14} />Create phone user</button>
        </div>
      </div>

      {/* Bulk-action bar */}
      {selected.size > 0 && (
        <div style={{
          marginBottom: 14, padding: '10px 14px',
          background: 'var(--ink-900)', color: '#fff', borderRadius: 10,
          display: 'flex', alignItems: 'center', gap: 12,
          boxShadow: 'var(--shadow-2)'
        }}>
          <strong style={{fontFamily:'var(--font-display)', fontSize:13}}>{selected.size} selected</strong>
          <div style={{flex:1, fontSize:12.5, color:'rgba(255,255,255,0.6)'}}>Bulk actions apply to all selected users.</div>
          <button className="btn sm" style={{background:'rgba(255,255,255,0.1)', color:'#fff'}}><Icon name="mail" size={12}/>Send invite</button>
          <button className="btn sm" style={{background:'rgba(255,255,255,0.1)', color:'#fff'}}><Icon name="edit" size={12}/>Edit forwarding</button>
          <button className="btn sm" style={{background:'rgba(237,28,36,0.9)', color:'#fff'}}><Icon name="trash" size={12}/>Delete</button>
          <button className="btn sm" style={{background:'transparent', color:'rgba(255,255,255,0.6)'}} onClick={() => setSelected(new Set())}><Icon name="x" size={12}/></button>
        </div>
      )}

      <div className="card">
        <div className="tbl-toolbar">
          <div className="search-inline">
            <Icon name="search" size={14} />
            <input
              placeholder="Search by name, extension or email…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button className={`filter-chip ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All <strong>16</strong></button>
          <button className={`filter-chip ${filter === 'mobile' ? 'active' : ''}`} onClick={() => setFilter('mobile')}><Icon name="mobile" size={12}/>Mobile <strong>9</strong></button>
          <button className={`filter-chip ${filter === 'voicemail' ? 'active' : ''}`} onClick={() => setFilter('voicemail')}><Icon name="voicemail" size={12}/>Voicemail <strong>14</strong></button>
          <button className={`filter-chip ${filter === 'alerts' ? 'active' : ''}`} onClick={() => setFilter('alerts')}><Icon name="alert" size={12}/>Alerts <strong>3</strong></button>
          <div className="spacer"></div>
          <button className="dropdown"><Icon name="sliders" size={12}/>Columns</button>
          <button className="dropdown">Sort: Extension <Icon name="chevron-down" size={12}/></button>
        </div>

        <div className="tbl-wrap">
          <table className="tbl">
            <thead>
              <tr>
                <th style={{width:38, paddingLeft:20}}>
                  <span
                    className={`checkbox ${selected.size === filtered.length && filtered.length > 0 ? 'on' : ''}`}
                    onClick={toggleAll}
                  ></span>
                </th>
                <th style={{minWidth:200}}>User</th>
                <th style={{width:70}}>Ext.</th>
                <th style={{width:140}}>Features</th>
                <th>Email</th>
                <th style={{minWidth:200}}>Forwarding</th>
                <th style={{width:100, whiteSpace:'nowrap'}}>Created</th>
                <th style={{width:100, whiteSpace:'nowrap'}}>Updated</th>
                <th style={{width:140}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id} className={selected.has(u.id) ? 'selected' : ''}>
                  <td style={{paddingLeft:20}}>
                    <span
                      className={`checkbox ${selected.has(u.id) ? 'on' : ''}`}
                      onClick={() => toggleSel(u.id)}
                    ></span>
                  </td>
                  <td>
                    <div className="cell-user">
                      <div className={`av ${u.alert ? 'warn' : ''}`} style={u.color ? {background: u.color, color:'#fff'} : null}>{u.initials}</div>
                      <div>
                        <div className="nm">{u.name}</div>
                        <div className="ext" style={{color: u.kind === 'mobile' ? 'var(--info)' : u.kind === 'web' ? 'var(--success)' : 'var(--ink-500)'}}>{u.kind === 'mobile' ? 'Mobile' : u.kind === 'web' ? 'Webphone' : u.kind === 'forward' ? 'Forward only' : 'Desk phone'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="num">{u.ext}</td>
                  <td>
                    <div className="feats">
                      <span className={`feat ${u.feats.includes('voicemail') ? 'on' : ''}`} data-tip={u.feats.includes('voicemail') ? 'Voicemail enabled' : 'Voicemail off'}>
                        <Icon name="voicemail" size={13}/>
                      </span>
                      <span className={`feat ${u.feats.includes('mobile') ? 'on' : ''}`} data-tip={u.feats.includes('mobile') ? 'Mobile app' : 'No mobile'}>
                        <Icon name="mobile" size={13}/>
                      </span>
                      <span className={`feat ${u.feats.includes('forward') ? 'on' : ''}`} data-tip={u.feats.includes('forward') ? 'Forwarding active' : 'No forwarding'}>
                        <Icon name="forward" size={13}/>
                      </span>
                      <span className={`feat ${u.feats.includes('recording') ? 'on' : ''}`} data-tip={u.feats.includes('recording') ? 'Recording on' : 'Recording off'}>
                        <Icon name="play" size={13}/>
                      </span>
                    </div>
                  </td>
                  <td className="muted" style={{fontSize:12.5, whiteSpace:'nowrap', maxWidth:240, overflow:'hidden', textOverflow:'ellipsis'}}>{u.email || '—'}</td>
                  <td>
                    {u.forward ? (
                      <span className="num-chip" style={{maxWidth:'100%'}}>{u.forward}</span>
                    ) : <span style={{color:'var(--ink-400)', fontSize:12}}>—</span>}
                  </td>
                  <td className="num muted" style={{fontSize:11.5, whiteSpace:'nowrap'}}>{u.created || '—'}</td>
                  <td className="num muted" style={{fontSize:11.5, whiteSpace:'nowrap'}}>{u.updated || '—'}</td>
                  <td>
                    <div className="row-acts">
                      <button title="Edit"><Icon name="edit" size={14}/></button>
                      <button title="Send invite"><Icon name="mail" size={14}/></button>
                      <button title="More"><Icon name="more" size={14}/></button>
                      <button className="danger" title="Delete"><Icon name="trash" size={14}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Feature legend */}
        <div className="legend">
          <strong>Features</strong>
          <span className="key"><span className="feat on"><Icon name="voicemail" size={11}/></span> Voicemail</span>
          <span className="key"><span className="feat on"><Icon name="mobile" size={11}/></span> Mobile app</span>
          <span className="key"><span className="feat on"><Icon name="forward" size={11}/></span> Forwarding</span>
          <span className="key"><span className="feat on"><Icon name="play" size={11}/></span> Recording</span>
          <span style={{color:'var(--ink-400)'}}>·</span>
          <span className="key"><span className="feat"><Icon name="voicemail" size={11}/></span> Off / not configured</span>
        </div>

        <div className="pgn">
          <div className="rng">Showing 1–{filtered.length} of {filtered.length}</div>
          <div className="pp">
            Rows per page:
            <select defaultValue="25"><option>10</option><option>25</option><option>50</option></select>
          </div>
          <div className="nav">
            <button disabled><Icon name="chevrons-left" size={12}/></button>
            <button disabled><Icon name="chevron-left" size={12}/></button>
            <button disabled><Icon name="chevron-right" size={12}/></button>
            <button disabled><Icon name="chevrons-right" size={12}/></button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- DATA ---------- */
const USERS = [
  { id: 1, initials: 'MW', name: 'Matt Webphone', kind: 'web', ext: '100', feats: ['voicemail'], alert: true, email: 'matthew@jetinteractive.com.au', forward: '0480 092 095 · Sales Mobile #2', created: '2025-09-05', updated: '2025-11-21' },
  { id: 2, initials: 'MS', name: 'Matt SF Demo', kind: 'web', ext: '101', feats: [], email: 'matthew.cahill+sfdemo@jetinteractive.com.au', forward: '0480 092 095 · Sales Mobile #2', created: '2025-09-08', updated: '2025-11-21' },
  { id: 3, initials: 'PT', name: 'Pete Test', kind: 'mobile', ext: '102', feats: ['voicemail','mobile','recording'], email: 'peter.graham.008@gmail.com', forward: '0480 015 155 · 2FA', created: '2025-02-14', updated: '2025-11-14' },
  { id: 4, initials: 'GW', name: 'Glenn Webphone', kind: 'web', ext: '103', feats: ['voicemail'], email: 'glenn.tyler@jetinteractive.com.au', forward: '0481 611 538 · CS Mobile #1', created: '2025-06-12', updated: '' },
  { id: 5, initials: 'JS', name: 'Jackson SF', kind: 'web', ext: '104', feats: [], email: 'jackson.murphy+sf@jetinteractive.com.au', forward: '0483 914 114 · Matt June', created: '2025-12-11', updated: '' },
  { id: 6, initials: 'JM', name: 'Jackson Murphy', kind: 'mobile', ext: '105', feats: ['voicemail','mobile'], email: 'jackson.murphy+mobile@jetinteractive.com.au', forward: '0483 916 114 · Direct to Jackson', created: '2025-09-03', updated: '2026-02-02' },
  { id: 7, initials: 'GS', name: 'Glenn SF Demo', kind: 'web', ext: '106', feats: [], email: 'glenn.tyler+sfdemo@jetinteractive.com.au', forward: '0480 015 538 · Dev Team SMS', created: '2025-09-08', updated: '' },
  { id: 8, initials: 'JW', name: 'Justin Webphone', kind: 'web', ext: '107', feats: ['voicemail'], alert: true, email: 'justin.graham@jetinteractive.com.au', forward: '0480 015 155 · 2FA', created: '2025-09-08', updated: '2026-04-20' },
  { id: 9, initials: 'BI', name: 'Bianca', kind: 'forward', ext: '108', feats: [], alert: true, email: '', forward: '(02) 9146 4614 · Direct to Bianca Local', created: '2025-11-21', updated: '2025-12-17' },
  { id: 10, initials: 'GR', name: 'Grant', kind: 'forward', ext: '109', feats: [], email: '', forward: '0483 913 114 · Direct to Grant Mobile', created: '2025-11-21', updated: '2025-12-17' },
  { id: 11, initials: 'DR', name: 'Daniel Russell', kind: 'mobile', ext: '111', feats: ['mobile'], email: 'daniel.russell@jetinteractive.com.au', forward: '0485 862 108 · Direct to Daniel Russell', created: '2026-03-16', updated: '2026-03-16' },
  { id: 12, initials: 'JG', name: 'Justin Graham', kind: 'mobile', ext: '5950', feats: ['voicemail','mobile','forward'], email: 'justin@jetinteractive.com.au', forward: '0488 839 133 · Direct to Justin Graham', created: '', updated: '2026-04-20', color: 'var(--red)' },
  { id: 13, initials: 'MC', name: 'Matt', kind: 'mobile', ext: '5956', feats: ['voicemail','mobile','forward','recording'], email: 'matthew.cahill@jetinteractive.com.au', forward: '0488 811 729 · Direct to Matt Mobile', created: '', updated: '2026-01-30' },
  { id: 14, initials: 'BB', name: 'Ben Bewick', kind: 'desk', ext: '5992', feats: ['voicemail','mobile','recording'], email: 'ben.bewick+production@jetinteractive.com.au', forward: '(02) 9146 4608 · Ben B Desk', created: '', updated: '2026-04-22' },
  { id: 15, initials: 'GT', name: 'Glenn Tyler', kind: 'mobile', ext: '5998', feats: ['voicemail'], email: 'glenn.tyler@jetinteractive.com.au', forward: '0480 015 155 · 2FA', created: '2023-05-05', updated: '2026-01-30' },
];

window.PhoneUsers = PhoneUsers;
