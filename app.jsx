/* =====================================================================
   APP — Root + page routing
   ===================================================================== */

const App = () => {
  const [page, setPage] = React.useState('dashboard');

  // mock counts shown in topbar pills
  const counts = { sms: 0, online: 6, voicemail: 14, missed: 0 };

  return (
    <div className="app" data-screen-label={`Portal — ${page}`}>
      <Sidebar page={page} setPage={setPage} counts={counts} />
      <div className="main">
        <TopBar page={page} counts={counts} setPage={setPage} />
        {page === 'dashboard' && <Dashboard setPage={setPage} />}
        {page === 'phone-users' && <PhoneUsers />}
        {page === 'calls' && <Calls />}
        {page !== 'dashboard' && page !== 'phone-users' && page !== 'calls' && (
          <div className="content">
            <div className="pghd"><div><h1 style={{textTransform:'capitalize'}}>{page.replace('-', ' ')}</h1><p className="sub">This screen wasn't part of the redesign scope. Try Home, Phone Users, or Total Calls & SMS in the sidebar.</p></div></div>
          </div>
        )}
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
