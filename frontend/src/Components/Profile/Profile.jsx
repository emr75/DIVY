import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import "./Profile.css";

/* ── Static mock data ────────────────────────────────────────── */
const INVESTMENTS = [
  { id: 1, name: "109 Linden Street, Brooklyn", category: "Real Estate", shares: 5, value: "$2,300", return: "+8.3%" },
  { id: 2, name: "300 Linden Street, Brooklyn", category: "Real Estate", shares: 5, value: "$2,300", return: "+8.3%" },
  { id: 3, name: "109 Linden Street, Brooklyn", category: "Real Estate", shares: 5, value: "$2,300", return: "+8.3%" },
];

const TRANSACTIONS = [
  { id: 1, type: "buy",  asset: "109 Linden Street, Brooklyn", shares: 2, price: "$2,300", date: "Oct 15, 2025" },
  { id: 2, type: "buy",  asset: "300 Linden Street, Brooklyn", shares: 2, price: "$2,300", date: "Oct 12, 2025" },
  { id: 3, type: "sell", asset: "109 Linden Street, Brooklyn", shares: 1, price: "$1,800", date: "Sep 28, 2025" },
];

const HOLDINGS = [
  { name: "109 Linden St, Brooklyn",  value: 3470,  color: "rgb(43,120,162)"  },
  { name: "300 Linden St, Brooklyn",  value: 2300,  color: "rgb(117,152,180)" },
  { name: "Midtown Office Suite",     value: 5556,  color: "#0a3d62"          },
  { name: "Luxury Waterfront Condo",  value: 1470,  color: "#a8c8e0"          },
  { name: "Other",                    value: 1094,  color: "#cddde9"          },
];

const NAV_ITEMS = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="9" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="1" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4"/>
      </svg>
    ),
  },
  {
    id: "investments",
    label: "My Investments",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 12l4-4 3 3 5-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 14h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "transactions",
    label: "Transactions",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 4h12M2 8h8M2 12h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.1 3.1l1.4 1.4M11.5 11.5l1.4 1.4M11.5 4.5l1.4-1.4M3.1 12.9l1.4-1.4"
          stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
];

/* ── Stagger animation hook ─────────────────────────────────────*/
function useStaggerAnim(activeTab) {
  useEffect(() => {
    const section = document.getElementById(`tab-${activeTab}`);
    if (!section) return;

    const items = section.querySelectorAll(".anim-item");
    // Reset first
    items.forEach(el => {
      el.classList.remove("anim-ready");
      void el.offsetWidth;
    });
    // Stagger in
    const timers = [];
    items.forEach((el, i) => {
      timers.push(setTimeout(() => el.classList.add("anim-ready"), i * 65));
    });
    return () => timers.forEach(clearTimeout);
  }, [activeTab]);
}

/* ── Pie chart component ────────────────────────────────────────
  Pure SVG donut using stroke-dasharray segments.
──────────────────────────────────────────────────────────────── */
function PieChart({ holdings }) {
  const svgRef = useRef(null);
  const total  = holdings.reduce((s, h) => s + h.value, 0);
  const R      = 15.9155;
  const GAP    = 0.6;
  const CX = 18, CY = 18;

  // Build segments
  let offset = 0;
  const segments = holdings.map((h, i) => {
    const pct  = (h.value / total) * 100;
    const dash = Math.max(0, pct - GAP);
    const seg  = { ...h, pct, dash, offset };
    offset += pct;
    return seg;
  });

  // Animate on mount
  useEffect(() => {
    if (!svgRef.current) return;
    const circles = svgRef.current.querySelectorAll("circle[data-animate]");
    circles.forEach((c, i) => {
      const finalDash = parseFloat(c.getAttribute("data-dash"));
      const finalGap  = 100 - finalDash;
      c.setAttribute("stroke-dasharray", "0 100");
      c.style.transition = `stroke-dasharray 0.6s ease ${i * 0.12}s`;
      requestAnimationFrame(() =>
        requestAnimationFrame(() =>
          c.setAttribute("stroke-dasharray", `${finalDash} ${finalGap}`)
        )
      );
    });
  }, []);

  return (
    <div className="chart-card anim-item">
      <div className="card-heading" style={{ gridColumn: "span 2", marginBottom: 16 }}>
        Portfolio Allocation
      </div>

      <div className="pie-wrap">
        <svg ref={svgRef} viewBox="0 0 36 36" style={{ transform: "rotate(-90deg)" }}>
          {/* Track */}
          <circle cx={CX} cy={CY} r={R} fill="none" stroke="#f0f5f9" strokeWidth="4"/>
          {/* Segments */}
          {segments.map((seg, i) => (
            <circle
              key={i}
              cx={CX} cy={CY} r={R}
              fill="none"
              stroke={seg.color}
              strokeWidth="4"
              strokeDasharray={`0 100`}
              strokeDashoffset={-seg.offset}
              strokeLinecap="butt"
              data-animate="true"
              data-dash={seg.dash}
            />
          ))}
        </svg>
        <div className="pie-center">
          <span className="pie-center-value">$13,890</span>
          <span className="pie-center-label">Total Value</span>
        </div>
      </div>

      <div className="pie-legend">
        {segments.map((seg, i) => (
          <div key={i} className="legend-item">
            <span className="legend-dot" style={{ background: seg.color }} />
            <span className="legend-name">{seg.name}</span>
            <span className="legend-pct">{seg.pct.toFixed(1)}%</span>
            <span className="legend-value">${seg.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Nav icon svgs ── */
const BuyArrow = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M6 2v8M2 6l4-4 4 4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const SellArrow = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M6 10V2M2 6l4 4 4-4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const StarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M9 2l2 4 4.5.7-3.2 3.1.8 4.5L9 12l-4 2.1.8-4.5L2.5 6.7l4.5-.7z"
      stroke="white" strokeWidth="1.3" strokeLinejoin="round" fill="none"/>
  </svg>
);
const HouseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M11 2l6 4v4H5V6z" stroke="rgb(43,120,162)" strokeWidth="1.4" strokeLinejoin="round" fill="none"/>
    <rect x="4" y="10" width="14" height="10" rx="1" stroke="rgb(43,120,162)" strokeWidth="1.4" fill="none"/>
    <rect x="9" y="14" width="4" height="6" stroke="rgb(43,120,162)" strokeWidth="1.2" fill="none"/>
  </svg>
);

/* MAIN COMPONENT */

export default function Profile() {
  const navigate    = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  const [userData, setUserData] = useState({
    name:               "Krishna Nadella",
    email:              "Krishna.nadella@email.com",
    username:           "KNadella",
    joinDate:           "January 2024",
    totalInvested:      "$12,450",
    portfolioValue:     "$13,890",
    totalReturn:        "+11.6%",
    activeInvestments:  8,
    photo:              "/images/stock-image-4.png",
  });

  /* Trigger stagger animations whenever the tab changes */
  useStaggerAnim(activeTab);

  /* Fetch real user data from API */
  useEffect(() => {
    // const token = Cookies.get("jwt_token");
    // if (!token) { navigate("/loginform"); return; }

    (async () => {
      try {
        const res = await axios.post("https://divy-dd00.onrender.com/auth/user_info", {
          // jwt_token: token,
        });
        if (res.status === 200) {
          const d = res.data;
          const formatted = new Date(d.created_at).toLocaleDateString("en-US", {
            month: "long", year: "numeric",
          });
          setUserData(prev => ({
            ...prev,
            username: d.username,
            email:    d.email,
            joinDate: formatted,
          }));
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    })();
  }, []);

  const initials = userData.name.split(" ").map(n => n[0]).join("");

  return (
    <div className="profile-page">

      {/* ══ SIDEBAR ══ */}
      <aside className="profile-sidebar">
        <div className="sidebar-header">
          <div className="user-profile">
            <div className="user-avatar">
              {userData.photo
                ? <img src={userData.photo} alt={userData.name} className="avatar-photo" />
                : initials}
            </div>
            <div>
              <div className="user-name">{userData.name}</div>
              <div className="user-email">{userData.email}</div>
            </div>
          </div>
          <div className="quick-stats">
            <div className="qs-card">
              <div className="qs-label">Portfolio</div>
              <div className="qs-value">{userData.portfolioValue}</div>
            </div>
            <div className="qs-card">
              <div className="qs-label">Return</div>
              <div className="qs-value">{userData.totalReturn}</div>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              className={`nav-btn${activeTab === item.id ? " active" : ""}`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">Member since {userData.joinDate}</div>
      </aside>

      {/* ══ MAIN ══ */}
      <main className="profile-main">

        {/* ── Dashboard ── */}
        <div id="tab-dashboard" style={{ display: activeTab === "dashboard" ? "contents" : "none" }}>
          <div>
            <h1 className="page-title">Dashboard</h1>
            <p className="page-sub">Get a clear snapshot of your investments. See how your properties are performing, track returns over time, and manage your portfolio with confidence. This is a preview of what your personalized dashboard would look like.</p>
          </div>

          <div className="stats-grid">
            {[
              { label: "Total Invested",     value: userData.totalInvested,     positive: false },
              { label: "Portfolio Value",    value: userData.portfolioValue,    positive: false },
              { label: "Total Return",       value: userData.totalReturn,       positive: true  },
              { label: "Active Investments", value: userData.activeInvestments, positive: false },
            ].map((s, i) => (
              <div key={i} className="stat-box anim-item">
                <span className="stat-box-label">{s.label}</span>
                <span className={`stat-box-value${s.positive ? " positive" : ""}`}>{s.value}</span>
              </div>
            ))}
          </div>

          <PieChart holdings={HOLDINGS} />

          <div className="content-grid">
            {/* Recent Activity */}
            <div className="content-card anim-item">
              <div className="card-heading">Recent Activity</div>
              <div className="activity-list">
                {TRANSACTIONS.map(tx => (
                  <div key={tx.id} className="activity-item">
                    <div className={`activity-badge ${tx.type}`}>
                      {tx.type === "buy" ? <BuyArrow /> : <SellArrow />}
                    </div>
                    <div className="activity-details">
                      <div className="activity-name">{tx.asset}</div>
                      <div className="activity-date">{tx.date}</div>
                    </div>
                    <div className="activity-amount">
                      {tx.type === "buy" ? "−" : "+"}{tx.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Performers */}
            <div className="content-card anim-item">
              <div className="card-heading">Top Performers</div>
              <div className="performer-list">
                {INVESTMENTS.map(inv => (
                  <div key={inv.id} className="performer-item">
                    <div className="performer-icon-box"><StarIcon /></div>
                    <div className="performer-details">
                      <div className="performer-name">{inv.name}</div>
                      <div className="performer-cat">{inv.category}</div>
                    </div>
                    <div className="performer-return">{inv.return}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── My Investments ── */}
        <div id="tab-investments" style={{ display: activeTab === "investments" ? "contents" : "none" }}>
          <div>
            <h1 className="page-title">My Investments</h1>
            <p className="page-sub">Manage your fractional asset holdings</p>
          </div>
          <div className="investments-list">
            {INVESTMENTS.map(inv => (
              <div key={inv.id} className="investment-row anim-item">
                <div className="inv-icon-box"><HouseIcon /></div>
                <div className="inv-info">
                  <div className="inv-name">{inv.name}</div>
                  <div className="inv-cat">{inv.category}</div>
                </div>
                <div className="inv-stat">
                  <div className="inv-stat-label">Shares</div>
                  <div className="inv-stat-value">{inv.shares}</div>
                </div>
                <div className="inv-stat">
                  <div className="inv-stat-label">Value</div>
                  <div className="inv-stat-value">{inv.value}</div>
                </div>
                <div className="inv-stat">
                  <div className="inv-stat-label">Return</div>
                  <div className="inv-stat-value positive">{inv.return}</div>
                </div>
                <button className="manage-btn">Manage</button>
              </div>
            ))}
          </div>
        </div>

        {/* ── Transactions ── */}
        <div id="tab-transactions" style={{ display: activeTab === "transactions" ? "contents" : "none" }}>
          <div>
            <h1 className="page-title">Transaction History</h1>
            <p className="page-sub">A full record of your buying and selling activity</p>
          </div>
          <div className="transactions-table anim-item">
            <div className="table-hdr">
              <div>Type</div>
              <div>Asset</div>
              <div>Amount</div>
              <div>Date</div>
            </div>
            {TRANSACTIONS.map(tx => (
              <div key={tx.id} className="table-row">
                <div><span className={`tx-badge ${tx.type}`}>{tx.type.toUpperCase()}</span></div>
                <div className="tx-asset">{tx.asset}</div>
                <div className="tx-amount">{tx.shares} × {tx.price}</div>
                <div className="tx-date">{tx.date}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Settings ── */}
        <div id="tab-settings" style={{ display: activeTab === "settings" ? "contents" : "none" }}>
          <div>
            <h1 className="page-title">Account Settings</h1>
            <p className="page-sub">Manage your personal information and security</p>
          </div>
          <div className="settings-stack">
            <div className="settings-card anim-item">
              <div className="settings-title">Personal Information</div>
              <div className="form-fields">
                <div className="form-field">
                  <label className="field-label">Username</label>
                  <input className="field-input" type="text" defaultValue={userData.username} readOnly/>
                </div>
                <div className="form-field">
                  <label className="field-label">Full Name</label>
                  <input className="field-input" type="text" defaultValue={userData.name} readOnly/>
                </div>
                <div className="form-field">
                  <label className="field-label">Email Address</label>
                  <input className="field-input" type="email" defaultValue={userData.email} readOnly/>
                </div>
                <button className="update-btn">Update Information</button>
              </div>
            </div>

            <div className="settings-card anim-item">
              <div className="settings-title">Security</div>
              <div className="security-options">
                <div className="security-option">
                  <div>
                    <div className="security-option-title">Change Password</div>
                    <div className="security-option-desc">Update your password regularly to keep your account safe</div>
                  </div>
                  <button className="security-btn">Change</button>
                </div>
                <div className="security-option">
                  <div>
                    <div className="security-option-title">Two-Factor Authentication</div>
                    <div className="security-option-desc">Add an extra layer of security to your account</div>
                  </div>
                  <button className="security-btn">Enable</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}