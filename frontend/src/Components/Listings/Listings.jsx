import { useState } from "react";
import { Link } from "react-router-dom";
import "./Listings.css";

/* ── Static asset data ─────────────────────────────────────────
   To add a real image, import it at the top of the file:
     import retailImg from "../../assets/retail.jpg";
   Then set  photo: retailImg  on the relevant listing object.
──────────────────────────────────────────────────────────────── */
const LISTINGS = [
  {
    id: 1,
    status: "active",
    type: "Commercial",
    name: "Prime Street-Level Retail",
    address: "1200 Broadway, Brooklyn, NY 11221",
    desc: "Well-maintained mixed-use commercial property on a high-visibility corridor with strong foot traffic.",
    totalValue: "$1,850,000",
    perShare: "$740",
    available: "2500/2500",
    returnPct: "+0.0%",
    funded: 0,
    photo: "/images/commercial-placeholder (1).jpg",
  },
  {
    id: 2,
    status: "active",
    type: "Land",
    name: "Build-Ready Residential Lot",
    address: "789 Oak Ridge Road, Beacon, NY 12508",
    desc: "Build your dream home on this prime residential lot in a quiet, established neighbourhood.",
    totalValue: "$175,000",
    perShare: "$1,000",
    available: "175/175",
    returnPct: "+0.0%",
    funded: 0,
    photo: "/images/apartment-placeholder.jpg",
  },
  {
    id: 3,
    status: "active",
    type: "Real Estate",
    name: "Charming Alcove Home",
    address: "456 Maple Avenue, Jersey City, NJ 07304",
    desc: "Beautifully renovated single-family home with open-concept living, dining, and modern finishes.",
    totalValue: "$650,000",
    perShare: "$6,500",
    available: "100/100",
    returnPct: "+0.0%",
    funded: 0,
    photo: "/images/house-placeholder.jpg",
  },
  {
    id: 4,
    status: "sold-out",
    type: "Real Estate",
    name: "Downtown Apartment",
    address: "123 Test Street, New York, NY",
    desc: "2 bed · 2 bath · 1,000 sq ft apartment in the heart of downtown with city views.",
    totalValue: "$1,200,000",
    perShare: "$11,881",
    available: "101/101",
    returnPct: "0.0%",
    funded: 100,
    photo: "/images/downtown-condo.jpg",
  },
  {
    id: 5,
    status: "active",
    type: "Real Estate",
    name: "Luxury Waterfront Condo",
    address: "88 Harbor Drive, Miami, FL 33101",
    desc: "Floor-to-ceiling windows, private balcony, and direct marina access in one of Miami's most desirable buildings.",
    totalValue: "$980,000",
    perShare: "$4,900",
    available: "140/200",
    returnPct: "+8.2%",
    funded: 30,
    photo: "/images/waterfront.jpg",
  },
  {
    id: 6,
    status: "active",
    type: "Commercial",
    name: "Office Suite",
    address: "271 Central Park, New York, NY",
    desc: "Fully leased Class-A office suite in midtown Manhattan with long-term tenants and stable rental income.",
    totalValue: "$3,200,000",
    perShare: "$3,200",
    available: "720/1000",
    returnPct: "+11.4%",
    funded: 28,
    photo: "/images/ny-office.jpg",
  },
  {
    id: 7,
    status: "sold-out",
    type: "Automotive",
    name: "1967 Ferrari 275 GTB",
    address: "Secure Storage, Geneva, Switzerland",
    desc: "Fully authenticated, museum-grade condition stored in a climate-controlled facility with full provenance.",
    totalValue: "$2,400,000",
    perShare: "$12,000",
    available: "200/200",
    returnPct: "+18.7%",
    funded: 100,
    photo: "/images/car.jpg",
  },
];

const STATUS_FILTERS = [
  { label: "All",      value: "all",      count: 7 },
  { label: "Active",   value: "active",   count: 5 },
  { label: "Pending",  value: "pending",  count: 0 },
  { label: "Sold Out", value: "sold-out", count: 2 },
];

const BED_OPTIONS = ["Any", "1+", "2+", "3+", "4+"];

/* ── Sub-components ──────────────────────────────────────────── */

function PinIcon() {
  return (
    <svg width="11" height="13" viewBox="0 0 11 13" fill="none">
      <path d="M5.5 1C3 1 1 3 1 5.5c0 3.5 4.5 7.5 4.5 7.5s4.5-4 4.5-7.5C10 3 8 1 5.5 1z"
        stroke="currentColor" strokeWidth="1.2" fill="none"/>
      <circle cx="5.5" cy="5.5" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
      <path d="M5 3l4 4-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function AssetCard({ listing, index }) {
  const isSoldOut = listing.status === "sold-out";

  return (
    <div
      className="asset-card"
      style={{ animationDelay: `${0.05 + index * 0.07}s` }}
    >
      {/* Image slot */}
      <div className="card-img">
        {listing.photo && (
          <img src={listing.photo} alt={listing.name} className="card-photo" />
        )}
        <span className={`card-badge ${listing.status}`}>
          {listing.status === "active"   ? "Active"
           : listing.status === "pending" ? "Pending"
           : "Sold Out"}
        </span>
      </div>

      <div className="card-body">
        <span className="card-type-tag">{listing.type}</span>

        <h3 className="card-name">{listing.name}</h3>

        <div className="card-address">
          <PinIcon />
          {listing.address}
        </div>

        <p className="card-desc">{listing.desc}</p>

        <div className="card-stats">
          <div className="card-stat">
            <span className="card-stat-label">Total Value</span>
            <span className="card-stat-value">{listing.totalValue}</span>
          </div>
          <div className="card-stat">
            <span className="card-stat-label">Per Share</span>
            <span className="card-stat-value">{listing.perShare}</span>
          </div>
          <div className="card-stat">
            <span className="card-stat-label">Available</span>
            <span className="card-stat-value">{listing.available}</span>
          </div>
          <div className="card-stat">
            <span className="card-stat-label">Return</span>
            <span className={`card-stat-value ${listing.returnPct.startsWith("+") ? "positive" : ""}`}>
              {listing.returnPct}
            </span>
          </div>
        </div>

        <div className="card-progress">
          <div className="card-progress-bar">
            <div className="card-progress-fill" style={{ width: `${listing.funded}%` }} />
          </div>
          <span className="card-progress-label">{listing.funded}% funded</span>
        </div>
      </div>

      <div className="card-footer">
        {isSoldOut ? (
          <span className="card-cta sold-out">Sold Out</span>
        ) : (
          <Link to={`/assets/${listing.id}`} className="card-cta">
            Invest Now <ChevronIcon />
          </Link>
        )}
      </div>
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────── */
export default function Listings() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter,   setTypeFilter]   = useState("All Types");
  const [sortBy,       setSortBy]       = useState("Newest");
  const [minPrice,     setMinPrice]     = useState("");
  const [maxPrice,     setMaxPrice]     = useState("");
  const [bedrooms,     setBedrooms]     = useState("Any");

  const filtered = LISTINGS.filter((l) => {
    if (statusFilter !== "all" && l.status !== statusFilter) return false;
    if (typeFilter !== "All Types" && l.type !== typeFilter) return false;
    return true;
  });

  return (
    <div className="listings-page">

      {/* ── Sidebar ── */}
      <aside className="sidebar">
        <div className="sidebar-title">Filters</div>

        {/* Status */}
        <div className="filter-group">
          <span className="filter-group-label">Status</span>
          <div className="status-pills">
            {STATUS_FILTERS.map((s) => (
              <button
                key={s.value}
                className={`status-pill${statusFilter === s.value ? " active" : ""}`}
                onClick={() => setStatusFilter(s.value)}
              >
                {s.label}
                <span className="count">{s.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Property Type */}
        <div className="filter-group">
          <span className="filter-group-label">Property Type</span>
          <select
            className="filter-select"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option>All Types</option>
            <option>Real Estate</option>
            <option>Commercial</option>
            <option>Land</option>
            <option>Collectible</option>
            <option>Automotive</option>
          </select>
        </div>

        {/* Price Range */}
        <div className="filter-group">
          <span className="filter-group-label">Price Range</span>
          <div className="price-range">
            <input
              className="price-input"
              type="number"
              placeholder="Min $"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              className="price-input"
              type="number"
              placeholder="Max $"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>

        {/* Bedrooms */}
        <div className="filter-group">
          <span className="filter-group-label">Bedrooms</span>
          <div className="bed-options">
            {BED_OPTIONS.map((b) => (
              <button
                key={b}
                className={`bed-btn${bedrooms === b ? " active" : ""}`}
                onClick={() => setBedrooms(b)}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        <button className="filter-apply">Apply Filters</button>
      </aside>

      {/* ── Main ── */}
      <main className="listings-main">

        {/* Header */}
        <div className="listings-hdr">
          <div className="listings-eyebrow">
            <span className="listings-eyebrow-line" />
            Fractional Investing
            <span className="listings-eyebrow-line" />
          </div>
          <h1 className="listings-title">Asset Listings</h1>
          <p className="listings-sub">Browse and invest in fractional ownership opportunities</p>
        </div>

        {/* Results bar */}
        <div className="results-bar">
          <span className="results-count">
            Showing <strong>{filtered.length}</strong> assets
          </span>
          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option>Sort: Newest</option>
            <option>Sort: Price ↑</option>
            <option>Sort: Price ↓</option>
            <option>Sort: Return ↑</option>
            <option>Sort: % Funded</option>
          </select>
        </div>

        {/* Cards */}
        <div className="cards-grid">
          {filtered.map((listing, i) => (
            <AssetCard key={listing.id} listing={listing} index={i} />
          ))}
        </div>

      </main>
    </div>
  );
}