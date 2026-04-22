import { useEffect, useRef } from "react";
import React, { useState } from "react";
import "./LoginForm.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

/* ── Roofline path (hero SVG space: 0–1440 × 0–520) ───────────
   Exact same path as HeroSection. Buildings aren't drawn here —
   only the dot + trail animate across the invisible silhouette. */
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

/* Pre-compute arc-lengths once at module scope */
const DISTS = [0];
for (let i = 1; i < ROOF.length; i++) {
  const dx = ROOF[i][0] - ROOF[i - 1][0];
  const dy = ROOF[i][1] - ROOF[i - 1][1];
  DISTS.push(DISTS[i - 1] + Math.sqrt(dx * dx + dy * dy));
}
const TOTAL_LEN = DISTS[DISTS.length - 1];

/*
 * Animation config
 * DURATION : ms for one full left-to-right sweep (lower = faster)
 * TRAIL    : fraction of total path that glows behind the dot
 */
const DURATION = 10200;
const TRAIL    = 0.06;
const DOT_R    = 3;

export default function LoginForm({ onLogin }) {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        "https://divy-dd00.onrender.com/auth/login",
        form
      );
      if (response.status === 200) {
        Cookies.set("jwt_token", response.data["token"], {
          expires: 1,
          secure: true,
          sameSite: "strict",
        });
        onLogin();
        navigate("/profile");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid username or password.");
    }
  };

  /* ── Tracer animation ── */
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
      // Map SVG space (1440×520) → canvas pixels
      // Y sits in the lower 65% of the viewport, matching the hero
      const cx = (svgX / 1440) * canvas.width;
      const cy = canvas.height * 0.35 + (svgY / 520) * (canvas.height * 0.65);
      return [cx, cy];
    }

    let startTime = null;
    let rafId;

    function draw(ts) {
      if (!startTime) startTime = ts;
      const t   = ((ts - startTime) % DURATION) / DURATION;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* Gradient trail */
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

      /* Soft glow halo */
      const [hx, hy] = pointAt(t);
      const grd = ctx.createRadialGradient(hx, hy, 0, hx, hy, 18);
      grd.addColorStop(0, "rgba(255,255,255,0.55)");
      grd.addColorStop(1, "rgba(255,255,255,0)");
      ctx.beginPath();
      ctx.arc(hx, hy, 18, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      /* Solid leading dot */
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
    <div className="login-page">
      {/* Tracer canvas */}
      <canvas ref={canvasRef} className="login-tracer" />

      <div className="login-card">

        {/* Wordmark */}
        <div className="login-brand">
          <span className="login-brand-name">DIVY</span>
        </div>

        {/* Title */}
        <h1 className="login-title">Welcome back.</h1>
        <p className="login-sub">Sign in to your account to continue</p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="login-fields">

            {/* Username */}
            <div className="field">
              <label htmlFor="username">Username</label>
              <div className="field-wrap">
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter your username"
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

            {/* Password */}
            <div className="field">
              <label htmlFor="password">Password</label>
              <div className="field-wrap">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
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

          </div>

          {/* Error message */}
          {error && <p className="login-error">{error}</p>}

          {/* Forgot password */}
          <div className="login-forgot">
            <a href="#">Forgot password?</a>
          </div>

          {/* Submit */}
          <button type="submit" className="login-btn">
            Sign In
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 3l4 4-4 4" stroke="rgb(43,120,162)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </form>

        {/* Divider */}
        <div className="login-divider">
          <span className="login-divider-line" />
          <span>New to DIVY?</span>
          <span className="login-divider-line" />
        </div>

        {/* Register link */}
        <div className="login-register">
          <Link to="/register">Create a free account →</Link>
        </div>

      </div>
    </div>
  );
}