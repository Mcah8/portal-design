/* =====================================================================
   SIDEBAR + TOPBAR
   ===================================================================== */

const Sidebar = ({ page, setPage, counts }) => {
  const nav = [
    { group: 'Manage', items: [
      { id: 'dashboard', label: 'Home', icon: 'home' },
      { id: 'phone-users', label: 'Phone Users', icon: 'users', count: 16 },
      { id: 'numbers', label: 'Phone Numbers', icon: 'phone-list' },
      { id: 'calls', label: 'Total Calls & SMS', icon: 'phone', count: 56 },
      { id: 'reports', label: 'Reports', icon: 'chart' },
      { id: 'queues', label: 'Queues & IVR', icon: 'queue' },
    ]},
    { group: 'Account', items: [
      { id: 'billing', label: 'Billing', icon: 'dollar' },
      { id: 'integrations', label: 'Integrations', icon: 'bolt' },
      { id: 'settings', label: 'Settings', icon: 'settings' },
    ]},
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="mark"><img src="design-system/jet-symbol-solid.png" alt="" /></div>
        <div className="wm">jet <em>hub</em></div>
      </div>

      <div className="acct">
        <div style={{flex:1, minWidth:0}}>
          <div className="ext">1104</div>
          <div className="org">Jet Interactive</div>
        </div>
        <Icon name="chevron-down" size={16} className="chev" />
      </div>

      <nav className="nav">
        {nav.map((g, gi) => (
          <React.Fragment key={gi}>
            <div className="navlbl">{g.group}</div>
            {g.items.map(item => (
              <a
                key={item.id}
                className={`item ${page === item.id ? 'active' : ''}`}
                onClick={() => setPage(item.id)}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
                {item.count != null && <span className="ct">{item.count}</span>}
              </a>
            ))}
          </React.Fragment>
        ))}
      </nav>

      <div className="me">
        <div className="av">JG</div>
        <div style={{flex:1, minWidth:0}}>
          <div className="nm">Justin Graham</div>
          <div className="em">justin@jetinteractive.com.au</div>
        </div>
      </div>
    </aside>
  );
};

const QuickPill = ({ tone, label, count, onClick }) => (
  <button
    className={`qpill ${count > 0 ? 'has-count' : ''}`}
    data-tone={tone}
    onClick={onClick}
  >
    <span className="dot"></span>
    <span className="lbl">{label}</span>
    <span className="ct">{count}</span>
  </button>
);

const TopBar = ({ page, counts, setPage }) => {
  return (
    <header className="topbar">
      <div className="search">
        <Icon name="search" size={14} />
        <input placeholder="Search numbers, users, calls, SMS…" />
        <kbd>⌘K</kbd>
      </div>

      <div className="qpills">
        <QuickPill tone="sms" label="SMS" count={counts.sms} onClick={() => setPage('calls')} />
        <QuickPill tone="online" label="Online" count={counts.online} />
        <QuickPill tone="voicemail" label="Voicemail" count={counts.voicemail} onClick={() => setPage('calls')} />
        <QuickPill tone="missed" label="Missed" count={counts.missed} onClick={() => setPage('calls')} />
      </div>

      <button className="helpbtn">
        <Icon name="help" size={14} />
        Help centre
      </button>

      <button className="iconbtn"><Icon name="bell" size={18} /></button>
      <button className="iconbtn"><Icon name="more-v" size={18} /></button>
    </header>
  );
};

window.Sidebar = Sidebar;
window.TopBar = TopBar;
