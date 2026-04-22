import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

/* ── Roofline path (same as HeroSection + LoginForm) ───────── */
const ROOF = [
  [0,   300],
  [33,  292], [33,  304], [52,  304], [52,  340],
  [55,  340], [55,  230], [75,  230], [75,  260],
  [90,  260], [90,  290], [100, 290], [100, 310], [145, 310],
  [160, 310], [160, 168], [188, 168], [188, 200], [196, 200],
  [210, 200], [210, 214], [220, 214], [220, 228], [230, 228],
  [230, 250], [270, 250], [270, 280],
  [283, 280], [283, 350], [353, 350],
  [367, 350], [367,  80], [394,  80], [394,  96],
  [407,  96], [407, 116], [421, 116], [421, 140],
  [435, 140], [435, 295], [477, 295], [477, 310],
  [497, 310], [497,  14], [529,  14], [529,  34],
  [536,  34], [536,  54], [543,  54], [543,  76],
  [561,  76], [561, 100],
  [575, 100], [575, 136], [597, 136], [597, 150],
  [619, 150], [619, 170],
  [633, 170], [633, 360], [685, 360],
  [700, 360], [700, 155], [725, 155], [725, 170],
  [736, 170], [736, 190], [750, 190], [750, 210],
  [765, 210], [765, 290], [837, 290],
  [853, 290], [853, 194], [881, 194], [881, 208],
  [893, 208], [893, 228], [909, 228], [909, 250],
  [923, 250], [923, 370], [981, 370],
  [995, 370], [995, 196], [1012, 196], [1012, 210],
  [1029, 210], [1029, 230],
  [1043, 230], [1043, 320], [1103, 320],
  [1117, 320], [1117, 216], [1140, 216], [1140, 230],
  [1150, 230], [1150, 250], [1163, 250], [1163, 270],
  [1177, 270], [1177, 340], [1247, 340],
  [1260, 340], [1260, 222], [1274, 222], [1274, 238],
  [1284, 238], [1284, 258], [1288, 258], [1288, 280],
  [1300, 280], [1300, 254], [1332, 254], [1332, 268],
  [1347, 268], [1347, 288], [1365, 288], [1365, 310],
  [1378, 310], [1378, 360], [1440, 360],
  [1440, 520],
];

const DISTS = [0];
for (let i = 1; i < ROOF.length; i++) {
  const dx = ROOF[i][0] - ROOF[i - 1][0];
  const dy = ROOF[i][1] - ROOF[i - 1][1];
  DISTS.push(DISTS[i - 1] + Math.sqrt(dx * dx + dy * dy));
}
const TOTAL_LEN = DISTS[DISTS.length - 1];

const DURATION = 10200;
const TRAIL    = 0.06;
const DOT_R    = 3;

export default function Register() {
  const navigate  = useNavigate();
  const canvasRef = useRef(null);

  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "https://divy-dd00.onrender.com/users/create",
        form
      );
      if (response.status === 201) {
        setSuccess(true);
        setTimeout(() => navigate("/loginform"), 2000);
      }
    } catch (err) {
      console.error("Register error:", err);
      setError(
        "Could not create account. Username, email, or phone may already be in use."
      );
    }
  };

  /* ── Tracer animation — identical to LoginForm ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function pointAt(t) {
      const target = t * TOTAL_LEN;
      let lo = 0, hi = DISTS.length - 1;
      while (lo < hi - 1) {
        const mid = (lo + hi) >> 1;
        if (DISTS[mid] <= target) lo = mid; else hi = mid;
      }
      const seg  = (target - DISTS[lo]) / (DISTS[hi] - DISTS[lo]);
      const svgX = ROOF[lo][0] + seg * (ROOF[hi][0] - ROOF[lo][0]);
      const svgY = ROOF[lo][1] + seg * (ROOF[hi][1] - ROOF[lo][1]);
      const cx   = (svgX / 1440) * canvas.width;
      const cy   = canvas.height * 0.35 + (svgY / 520) * (canvas.height * 0.65);
      return [cx, cy];
    }

    let startTime = null;
    let rafId;

    function draw(ts) {
      if (!startTime) startTime = ts;
      const t   = ((ts - startTime) % DURATION) / DURATION;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const steps      = 120;
      const trailStart = Math.max(0, t - TRAIL);
      for (let i = 0; i < steps; i++) {
        const t0 = trailStart + (i       / steps) * (t - trailStart);
        const t1 = trailStart + ((i + 1) / steps) * (t - trailStart);
        if (t0 < 0 || t1 > 1) continue;
        const alpha    = i / steps;
        const [x0, y0] = pointAt(t0);
        const [x1, y1] = pointAt(t1);
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.8})`;
        ctx.lineWidth   = 1.5 + alpha * 1.5;
        ctx.lineCap     = "round";
        ctx.stroke();
      }

      const [hx, hy] = pointAt(t);
      const grd = ctx.createRadialGradient(hx, hy, 0, hx, hy, 18);
      grd.addColorStop(0, "rgba(255,255,255,0.55)");
      grd.addColorStop(1, "rgba(255,255,255,0)");
      ctx.beginPath();
      ctx.arc(hx, hy, 18, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(hx, hy, DOT_R, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();

      rafId = requestAnimationFrame(draw);
    }

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="register-page">
      <canvas ref={canvasRef} className="register-tracer" />

      <div className="register-card">

        {/* Wordmark */}
        <div className="register-brand">
          <span className="register-brand-name">DIVY</span>
        </div>

        {/* Title */}
        <h1 className="register-title">Create your account.</h1>
        <p className="register-sub">Start investing in premium assets today</p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="register-fields">

            {/* Username */}
            <div className="field">
              <label htmlFor="reg-username">Username</label>
              <div className="field-wrap">
                <input
                  id="reg-username"
                  name="username"
                  type="text"
                  placeholder="Choose a username"
                  value={form.username}
                  onChange={handleChange}
                  required
                />
                <span className="field-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.4"/>
                    <path d="M2 14c0-3.3 2.7-5 6-5s6 1.7 6 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
                  </svg>
                </span>
              </div>
            </div>

            {/* Email */}
            <div className="field">
              <label htmlFor="reg-email">Email</label>
              <div className="field-wrap">
                <input
                  id="reg-email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <span className="field-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="2" y="4" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                    <path d="M2 5l6 4.5L14 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
                  </svg>
                </span>
              </div>
            </div>

            {/* Phone */}
            <div className="field">
              <label htmlFor="reg-phone">Phone</label>
              <div className="field-wrap">
                <input
                  id="reg-phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
                <span className="field-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="4" y="1" width="8" height="14" rx="2" stroke="currentColor" strokeWidth="1.4"/>
                    <circle cx="8" cy="12.5" r="0.75" fill="currentColor"/>
                  </svg>
                </span>
              </div>
            </div>

            {/* Password */}
            <div className="field">
              <label htmlFor="reg-password">Password</label>
              <div className="field-wrap">
                <input
                  id="reg-password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <span className="field-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                    <path d="M5 7V5a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
                    <circle cx="8" cy="10.5" r="1" fill="currentColor"/>
                  </svg>
                </span>
              </div>
            </div>

            {/* Confirm password */}
            <div className="field">
              <label htmlFor="reg-confirm">Confirm Password</label>
              <div className="field-wrap">
                <input
                  id="reg-confirm"
                  name="confirm"
                  type="password"
                  placeholder="Retype your password"
                  value={form.confirm}
                  onChange={handleChange}
                  required
                />
                <span className="field-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                    <path d="M5 7V5a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
                    <path d="M6 11l1.5 1.5L10 9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </div>

          </div>

          {/* Error / success messages */}
          {error   && <p className="register-error">{error}</p>}
          {success && <p className="register-success">Account created! Redirecting…</p>}

          {/* Submit */}
          <button type="submit" className="register-btn">
            Create Account
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 3l4 4-4 4" stroke="rgb(43,120,162)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </form>

        {/* Divider */}
        <div className="register-divider">
          <span className="register-divider-line" />
          <span>Already have an account?</span>
          <span className="register-divider-line" />
        </div>

        {/* Login link */}
        <div className="register-login-link">
          <Link to="/loginform">Sign in →</Link>
        </div>

      </div>
    </div>
  );
}