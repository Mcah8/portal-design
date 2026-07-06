/* =====================================================================
   ICONS — Lucide-style stroke icons used throughout the portal
   ===================================================================== */
const Icon = ({ name, size = 18, className = '' }) => {
  const paths = {
    home: <><path d="M3 11 L12 4 L21 11" /><path d="M5 10 V20 H19 V10" /></>,
    users: <><circle cx="9" cy="9" r="3.5"/><path d="M3 19 V18 A4 4 0 0 1 7 14 H11 A4 4 0 0 1 15 18 V19"/><path d="M16 7 A3 3 0 0 1 16 13"/><path d="M22 19 V18 A4 4 0 0 0 18 14"/></>,
    dollar: <><path d="M12 2 V22"/><path d="M16 6 H10 A3 3 0 0 0 10 12 H14 A3 3 0 0 1 14 18 H8"/></>,
    phone: <><path d="M5 4 L9 4 L11 8 L9 9 C10 12 12 14 15 15 L16 13 L20 15 L20 19 C12 19 5 12 5 5 Z"/></>,
    chart: <><path d="M3 21 V3"/><path d="M3 21 H21"/><rect x="6" y="13" width="3" height="5"/><rect x="11" y="9" width="3" height="9"/><rect x="16" y="5" width="3" height="13"/></>,
    bolt: <><path d="M13 2 L4 14 H11 L10 22 L20 9 H13 Z"/></>,
    help: <><circle cx="12" cy="12" r="9"/><path d="M9.5 9 A2.5 2.5 0 0 1 14.5 9 C14.5 11 12 11.5 12 13.5"/><circle cx="12" cy="17" r="0.5" fill="currentColor"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M12 2 V4 M12 20 V22 M4 12 H2 M22 12 H20 M5.6 5.6 L4.2 4.2 M19.8 19.8 L18.4 18.4 M5.6 18.4 L4.2 19.8 M19.8 4.2 L18.4 5.6"/></>,
    'phone-list': <><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 17 H15"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="M21 21 L16 16"/></>,
    bell: <><path d="M6 8 A6 6 0 0 1 18 8 V13 L20 16 H4 L6 13 Z"/><path d="M10 19 A2 2 0 0 0 14 19"/></>,
    plus: <><path d="M12 5 V19 M5 12 H19"/></>,
    download: <><path d="M12 3 V15 M7 10 L12 15 L17 10"/><path d="M5 21 H19"/></>,
    edit: <><path d="M14 4 L20 10 L10 20 H4 V14 Z"/><path d="M13 5 L19 11"/></>,
    trash: <><path d="M4 7 H20 M9 7 V4 H15 V7 M6 7 L7 20 H17 L18 7"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 7 L12 13 L21 7"/></>,
    voicemail: <><circle cx="7" cy="13" r="4"/><circle cx="17" cy="13" r="4"/><path d="M7 17 H17"/></>,
    mobile: <><rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18 H13"/></>,
    desktop: <><rect x="2" y="4" width="20" height="13" rx="1"/><path d="M9 21 H15 M12 17 V21"/></>,
    forward: <><path d="M5 12 H19 M13 6 L19 12 L13 18"/></>,
    'call-in': <><path d="M19 5 L11 13 M14 13 H11 V10"/><path d="M5 14 V18 C5 19 6 20 7 20 L11 20"/></>,
    'call-out': <><path d="M11 13 L19 5 M19 9 V5 H15"/><path d="M5 14 V18 C5 19 6 20 7 20 L11 20"/></>,
    'call-missed': <><path d="M5 5 L11 11 M5 9 V5 H9"/><path d="M11 11 L19 19"/></>,
    sms: <><path d="M4 5 H20 V17 H13 L8 21 V17 H4 Z"/><circle cx="9" cy="11" r="0.5" fill="currentColor"/><circle cx="12" cy="11" r="0.5" fill="currentColor"/><circle cx="15" cy="11" r="0.5" fill="currentColor"/></>,
    chevron: <><path d="M9 6 L15 12 L9 18"/></>,
    'chevron-down': <><path d="M6 9 L12 15 L18 9"/></>,
    'chevron-left': <><path d="M15 6 L9 12 L15 18"/></>,
    'chevron-right': <><path d="M9 6 L15 12 L9 18"/></>,
    'chevrons-right': <><path d="M7 6 L13 12 L7 18 M13 6 L19 12 L13 18"/></>,
    'chevrons-left': <><path d="M17 6 L11 12 L17 18 M11 6 L5 12 L11 18"/></>,
    filter: <><path d="M3 5 H21 L14 13 V19 L10 21 V13 Z"/></>,
    flag: <><path d="M5 21 V4 H17 L15 8 L17 12 H5"/></>,
    note: <><path d="M5 3 H15 L19 7 V21 H5 Z"/><path d="M9 12 H15 M9 16 H13"/></>,
    refresh: <><path d="M3 12 A9 9 0 0 1 18 6 L21 9 M21 12 A9 9 0 0 1 6 18 L3 15"/><path d="M3 4 V9 H8 M21 14 V19 H16"/></>,
    pause: <><path d="M9 5 V19 M15 5 V19"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="1"/><path d="M3 9 H21 M8 3 V7 M16 3 V7"/></>,
    sliders: <><path d="M4 6 H10 M14 6 H20"/><circle cx="12" cy="6" r="2"/><path d="M4 12 H6 M10 12 H20"/><circle cx="8" cy="12" r="2"/><path d="M4 18 H14 M18 18 H20"/><circle cx="16" cy="18" r="2"/></>,
    more: <><circle cx="5" cy="12" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/><circle cx="19" cy="12" r="1.2" fill="currentColor"/></>,
    'more-v': <><circle cx="12" cy="5" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/><circle cx="12" cy="19" r="1.2" fill="currentColor"/></>,
    x: <><path d="M5 5 L19 19 M19 5 L5 19"/></>,
    alert: <><path d="M10.3 3.5 L2.5 18 A2 2 0 0 0 4 21 H20 A2 2 0 0 0 21.5 18 L13.7 3.5 A2 2 0 0 0 10.3 3.5 Z"/><path d="M12 9 V14 M12 17 V17.5"/></>,
    'arrow-up': <><path d="M12 19 V5 M5 12 L12 5 L19 12"/></>,
    'arrow-down': <><path d="M12 5 V19 M5 12 L12 19 L19 12"/></>,
    'arrow-up-right': <><path d="M7 17 L17 7 M9 7 H17 V15"/></>,
    'arrow-down-left': <><path d="M17 7 L7 17 M15 17 H7 V9"/></>,
    play: <><path d="M6 4 L20 12 L6 20 Z" fill="currentColor" stroke="none"/></>,
    headset: <><path d="M4 13 V11 A8 8 0 0 1 20 11 V13"/><rect x="4" y="13" width="4" height="6" rx="1"/><rect x="16" y="13" width="4" height="6" rx="1"/><path d="M20 19 V20 A2 2 0 0 1 18 22 H13"/></>,
    sim: <><path d="M6 3 H14 L18 7 V21 H6 Z"/><rect x="9" y="12" width="6" height="6"/><path d="M9 14 H15 M9 16 H15 M11 12 V18 M13 12 V18"/></>,
    eye: <><path d="M2 12 C5 6 8 4 12 4 C16 4 19 6 22 12 C19 18 16 20 12 20 C8 20 5 18 2 12 Z"/><circle cx="12" cy="12" r="3"/></>,
    upload: <><path d="M12 21 V9 M7 14 L12 9 L17 14"/><path d="M5 3 H19"/></>,
    copy: <><rect x="9" y="9" width="12" height="12" rx="1"/><path d="M5 15 V5 H15"/></>,
    wifi: <><path d="M5 9 A11 11 0 0 1 19 9"/><path d="M8 13 A6 6 0 0 1 16 13"/><circle cx="12" cy="17" r="1" fill="currentColor"/></>,
    globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12 H21 M12 3 C9 6 9 18 12 21 M12 3 C15 6 15 18 12 21"/></>,
    queue: <><circle cx="6" cy="12" r="2.5"/><circle cx="12" cy="12" r="2.5"/><circle cx="18" cy="12" r="2.5"/></>,
  };
  return (
    <svg
      viewBox="0 0 24 24"
      width={size} height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >{paths[name] || null}</svg>
  );
};

window.Icon = Icon;
