import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./HeroSection.css";

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

/* Pre-compute cumulative arc-lengths once at module scope */
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
 * TRAIL    : fraction of total path length that glows behind the dot
 */
const DURATION = 10200;
const TRAIL    = 0.06;
const DOT_R    = 3;

export const HeroSection = () => {
  const wrapRef   = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap   = wrapRef.current;
    if (!canvas || !wrap) return;

    function resize() {
      canvas.width  = wrap.offsetWidth;
      canvas.height = wrap.offsetHeight;
    }
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

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
      return [
        (svgX / 1440) * canvas.width,
        canvas.height - ((520 - svgY) / 520) * canvas.height,
      ];
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
      ro.disconnect();
    };
  }, []);

  return (
    <section className="hero">

      {/* Skyline SVG + tracer canvas */}
      <div className="skyline-wrap" ref={wrapRef}>
        <svg
          viewBox="0 0 1440 520"
          preserveAspectRatio="xMidYMax meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" stroke="rgba(255,255,255,0.13)" strokeWidth="1" strokeLinejoin="round">

            {/* NEW LEFT 1: very slim far-left anchor */}
            <rect x="-10" y="300" width="22" height="220"/>
            <rect x="-7" y="284" width="16" height="18"/>
            <rect x="-4" y="310" width="5" height="5"/><rect x="5" y="310" width="5" height="5"/>
            <rect x="-4" y="323" width="5" height="5"/><rect x="5" y="323" width="5" height="5"/>
            <rect x="-4" y="336" width="5" height="5"/><rect x="5" y="336" width="5" height="5"/>

            {/* NEW LEFT 2: medium stepped block with spire */}
            <rect x="14" y="340" width="38" height="180"/>
            <rect x="20" y="320" width="26" height="22"/>
            <rect x="26" y="304" width="14" height="18"/>
            <line x1="33" x2="33" y1="292" y2="304"/>
            <rect x="19" y="348" width="7" height="7"/><rect x="32" y="348" width="7" height="7"/><rect x="44" y="348" width="7" height="7"/>
            <rect x="19" y="363" width="7" height="7"/><rect x="32" y="363" width="7" height="7"/><rect x="44" y="363" width="7" height="7"/>
            <rect x="19" y="378" width="7" height="7"/><rect x="32" y="378" width="7" height="7"/><rect x="44" y="378" width="7" height="7"/>
            <rect x="19" y="393" width="7" height="7"/><rect x="32" y="393" width="7" height="7"/><rect x="44" y="393" width="7" height="7"/>

            {/* B1: slim tower */}
            <rect x="55" y="260" width="28" height="260"/>
            <rect x="59" y="240" width="20" height="22"/>
            <line x1="69" x2="69" y1="230" y2="240"/>
            <rect x="60" y="268" width="6" height="6"/><rect x="70" y="268" width="6" height="6"/>
            <rect x="60" y="282" width="6" height="6"/><rect x="70" y="282" width="6" height="6"/>
            <rect x="60" y="296" width="6" height="6"/><rect x="70" y="296" width="6" height="6"/>
            <rect x="60" y="310" width="6" height="6"/><rect x="70" y="310" width="6" height="6"/>

            {/* B2: wide block */}
            <rect x="90" y="310" width="55" height="210"/>
            <rect x="100" y="290" width="35" height="22"/>
            <rect x="95" y="320" width="8" height="8"/><rect x="110" y="320" width="8" height="8"/><rect x="125" y="320" width="8" height="8"/>
            <rect x="95" y="336" width="8" height="8"/><rect x="110" y="336" width="8" height="8"/><rect x="125" y="336" width="8" height="8"/>
            <rect x="95" y="352" width="8" height="8"/><rect x="110" y="352" width="8" height="8"/><rect x="125" y="352" width="8" height="8"/>
            <rect x="95" y="368" width="8" height="8"/><rect x="110" y="368" width="8" height="8"/><rect x="125" y="368" width="8" height="8"/>
            <rect x="95" y="384" width="8" height="8"/><rect x="110" y="384" width="8" height="8"/><rect x="125" y="384" width="8" height="8"/>

            {/* B3: tall narrow */}
            <rect x="160" y="200" width="36" height="320"/>
            <rect x="164" y="180" width="28" height="22"/>
            <line x1="178" x2="178" y1="168" y2="180"/>
            <rect x="165" y="210" width="7" height="7"/><rect x="179" y="210" width="7" height="7"/>
            <rect x="165" y="226" width="7" height="7"/><rect x="179" y="226" width="7" height="7"/>
            <rect x="165" y="242" width="7" height="7"/><rect x="179" y="242" width="7" height="7"/>
            <rect x="165" y="258" width="7" height="7"/><rect x="179" y="258" width="7" height="7"/>
            <rect x="165" y="274" width="7" height="7"/><rect x="179" y="274" width="7" height="7"/>
            <rect x="165" y="290" width="7" height="7"/><rect x="179" y="290" width="7" height="7"/>
            <rect x="165" y="306" width="7" height="7"/><rect x="179" y="306" width="7" height="7"/>

            {/* B4: stepped tower */}
            <rect x="210" y="280" width="60" height="240"/>
            <rect x="220" y="250" width="40" height="32"/>
            <rect x="230" y="228" width="20" height="24"/>
            <line x1="240" x2="240" y1="214" y2="228"/>
            <rect x="215" y="290" width="9" height="9"/><rect x="232" y="290" width="9" height="9"/><rect x="249" y="290" width="9" height="9"/>
            <rect x="215" y="308" width="9" height="9"/><rect x="232" y="308" width="9" height="9"/><rect x="249" y="308" width="9" height="9"/>
            <rect x="215" y="326" width="9" height="9"/><rect x="232" y="326" width="9" height="9"/><rect x="249" y="326" width="9" height="9"/>
            <rect x="215" y="344" width="9" height="9"/><rect x="232" y="344" width="9" height="9"/><rect x="249" y="344" width="9" height="9"/>

            {/* B5: low wide block */}
            <rect x="283" y="350" width="70" height="170"/>
            <rect x="290" y="360" width="10" height="10"/><rect x="308" y="360" width="10" height="10"/><rect x="326" y="360" width="10" height="10"/>
            <rect x="290" y="378" width="10" height="10"/><rect x="308" y="378" width="10" height="10"/><rect x="326" y="378" width="10" height="10"/>
            <rect x="290" y="396" width="10" height="10"/><rect x="308" y="396" width="10" height="10"/><rect x="326" y="396" width="10" height="10"/>

            {/* B6: tall hero building centre-left */}
            <rect x="367" y="140" width="54" height="380"/>
            <rect x="373" y="116" width="42" height="26"/>
            <rect x="381" y="96" width="26" height="22"/>
            <line x1="394" x2="394" y1="80" y2="96"/>
            <rect x="375" y="155" width="9" height="9"/><rect x="392" y="155" width="9" height="9"/><rect x="406" y="155" width="9" height="9"/>
            <rect x="375" y="173" width="9" height="9"/><rect x="392" y="173" width="9" height="9"/><rect x="406" y="173" width="9" height="9"/>
            <rect x="375" y="191" width="9" height="9"/><rect x="392" y="191" width="9" height="9"/><rect x="406" y="191" width="9" height="9"/>
            <rect x="375" y="209" width="9" height="9"/><rect x="392" y="209" width="9" height="9"/><rect x="406" y="209" width="9" height="9"/>
            <rect x="375" y="227" width="9" height="9"/><rect x="392" y="227" width="9" height="9"/><rect x="406" y="227" width="9" height="9"/>
            <rect x="375" y="245" width="9" height="9"/><rect x="392" y="245" width="9" height="9"/><rect x="406" y="245" width="9" height="9"/>
            <rect x="375" y="263" width="9" height="9"/><rect x="392" y="263" width="9" height="9"/><rect x="406" y="263" width="9" height="9"/>

            {/* B7: mid block */}
            <rect x="435" y="310" width="48" height="210"/>
            <rect x="441" y="295" width="36" height="17"/>
            <rect x="441" y="320" width="8" height="8"/><rect x="457" y="320" width="8" height="8"/><rect x="472" y="320" width="8" height="8"/>
            <rect x="441" y="336" width="8" height="8"/><rect x="457" y="336" width="8" height="8"/><rect x="472" y="336" width="8" height="8"/>
            <rect x="441" y="352" width="8" height="8"/><rect x="457" y="352" width="8" height="8"/><rect x="472" y="352" width="8" height="8"/>
            <rect x="441" y="368" width="8" height="8"/><rect x="457" y="368" width="8" height="8"/><rect x="472" y="368" width="8" height="8"/>

            {/* B8: landmark skyscraper centre */}
            <rect x="497" y="100" width="64" height="420"/>
            <rect x="505" y="76" width="48" height="26"/>
            <rect x="515" y="54" width="28" height="24"/>
            <rect x="522" y="34" width="14" height="22"/>
            <line x1="529" x2="529" y1="14" y2="34"/>
            <rect x="505" y="115" width="10" height="10"/><rect x="524" y="115" width="10" height="10"/><rect x="543" y="115" width="10" height="10"/>
            <rect x="505" y="134" width="10" height="10"/><rect x="524" y="134" width="10" height="10"/><rect x="543" y="134" width="10" height="10"/>
            <rect x="505" y="153" width="10" height="10"/><rect x="524" y="153" width="10" height="10"/><rect x="543" y="153" width="10" height="10"/>
            <rect x="505" y="172" width="10" height="10"/><rect x="524" y="172" width="10" height="10"/><rect x="543" y="172" width="10" height="10"/>
            <rect x="505" y="191" width="10" height="10"/><rect x="524" y="191" width="10" height="10"/><rect x="543" y="191" width="10" height="10"/>
            <rect x="505" y="210" width="10" height="10"/><rect x="524" y="210" width="10" height="10"/><rect x="543" y="210" width="10" height="10"/>
            <rect x="505" y="229" width="10" height="10"/><rect x="524" y="229" width="10" height="10"/><rect x="543" y="229" width="10" height="10"/>
            <rect x="505" y="248" width="10" height="10"/><rect x="524" y="248" width="10" height="10"/><rect x="543" y="248" width="10" height="10"/>

            {/* B9: adjacent tower */}
            <rect x="575" y="170" width="44" height="350"/>
            <rect x="581" y="150" width="32" height="22"/>
            <line x1="597" x2="597" y1="136" y2="150"/>
            <rect x="582" y="184" width="8" height="8"/><rect x="598" y="184" width="8" height="8"/><rect x="610" y="184" width="8" height="8"/>
            <rect x="582" y="200" width="8" height="8"/><rect x="598" y="200" width="8" height="8"/><rect x="610" y="200" width="8" height="8"/>
            <rect x="582" y="216" width="8" height="8"/><rect x="598" y="216" width="8" height="8"/><rect x="610" y="216" width="8" height="8"/>
            <rect x="582" y="232" width="8" height="8"/><rect x="598" y="232" width="8" height="8"/><rect x="610" y="232" width="8" height="8"/>
            <rect x="582" y="248" width="8" height="8"/><rect x="598" y="248" width="8" height="8"/><rect x="610" y="248" width="8" height="8"/>
            <rect x="582" y="264" width="8" height="8"/><rect x="598" y="264" width="8" height="8"/><rect x="610" y="264" width="8" height="8"/>

            {/* B10: short block */}
            <rect x="633" y="360" width="52" height="160"/>
            <rect x="639" y="372" width="9" height="9"/><rect x="655" y="372" width="9" height="9"/><rect x="671" y="372" width="9" height="9"/>
            <rect x="639" y="389" width="9" height="9"/><rect x="655" y="389" width="9" height="9"/><rect x="671" y="389" width="9" height="9"/>
            <rect x="639" y="406" width="9" height="9"/><rect x="655" y="406" width="9" height="9"/><rect x="671" y="406" width="9" height="9"/>

            {/* B11: tall right-centre */}
            <rect x="700" y="210" width="50" height="310"/>
            <rect x="706" y="190" width="38" height="22"/>
            <rect x="714" y="170" width="22" height="22"/>
            <line x1="725" x2="725" y1="155" y2="170"/>
            <rect x="707" y="224" width="9" height="9"/><rect x="724" y="224" width="9" height="9"/><rect x="739" y="224" width="9" height="9"/>
            <rect x="707" y="241" width="9" height="9"/><rect x="724" y="241" width="9" height="9"/><rect x="739" y="241" width="9" height="9"/>
            <rect x="707" y="258" width="9" height="9"/><rect x="724" y="258" width="9" height="9"/><rect x="739" y="258" width="9" height="9"/>
            <rect x="707" y="275" width="9" height="9"/><rect x="724" y="275" width="9" height="9"/><rect x="739" y="275" width="9" height="9"/>
            <rect x="707" y="292" width="9" height="9"/><rect x="724" y="292" width="9" height="9"/><rect x="739" y="292" width="9" height="9"/>

            {/* B12: wide block right */}
            <rect x="765" y="290" width="72" height="230"/>
            <rect x="773" y="302" width="10" height="10"/><rect x="791" y="302" width="10" height="10"/><rect x="809" y="302" width="10" height="10"/>
            <rect x="773" y="320" width="10" height="10"/><rect x="791" y="320" width="10" height="10"/><rect x="809" y="320" width="10" height="10"/>
            <rect x="773" y="338" width="10" height="10"/><rect x="791" y="338" width="10" height="10"/><rect x="809" y="338" width="10" height="10"/>
            <rect x="773" y="356" width="10" height="10"/><rect x="791" y="356" width="10" height="10"/><rect x="809" y="356" width="10" height="10"/>
            <rect x="773" y="374" width="10" height="10"/><rect x="791" y="374" width="10" height="10"/><rect x="809" y="374" width="10" height="10"/>

            {/* B13: stepped far right */}
            <rect x="853" y="250" width="56" height="270"/>
            <rect x="861" y="228" width="40" height="24"/>
            <rect x="869" y="208" width="24" height="22"/>
            <line x1="881" x2="881" y1="194" y2="208"/>
            <rect x="861" y="264" width="9" height="9"/><rect x="878" y="264" width="9" height="9"/><rect x="895" y="264" width="9" height="9"/>
            <rect x="861" y="281" width="9" height="9"/><rect x="878" y="281" width="9" height="9"/><rect x="895" y="281" width="9" height="9"/>
            <rect x="861" y="298" width="9" height="9"/><rect x="878" y="298" width="9" height="9"/><rect x="895" y="298" width="9" height="9"/>
            <rect x="861" y="315" width="9" height="9"/><rect x="878" y="315" width="9" height="9"/><rect x="895" y="315" width="9" height="9"/>

            {/* B14: low right */}
            <rect x="923" y="370" width="58" height="150"/>
            <rect x="931" y="382" width="10" height="10"/><rect x="949" y="382" width="10" height="10"/><rect x="967" y="382" width="10" height="10"/>
            <rect x="931" y="400" width="10" height="10"/><rect x="949" y="400" width="10" height="10"/><rect x="967" y="400" width="10" height="10"/>

            {/* B15: slim tower */}
            <rect x="995" y="230" width="34" height="290"/>
            <rect x="1000" y="210" width="24" height="22"/>
            <line x1="1012" x2="1012" y1="196" y2="210"/>
            <rect x="1002" y="244" width="7" height="7"/><rect x="1016" y="244" width="7" height="7"/>
            <rect x="1002" y="259" width="7" height="7"/><rect x="1016" y="259" width="7" height="7"/>
            <rect x="1002" y="274" width="7" height="7"/><rect x="1016" y="274" width="7" height="7"/>
            <rect x="1002" y="289" width="7" height="7"/><rect x="1016" y="289" width="7" height="7"/>
            <rect x="1002" y="304" width="7" height="7"/><rect x="1016" y="304" width="7" height="7"/>

            {/* B16: block */}
            <rect x="1043" y="320" width="60" height="200"/>
            <rect x="1051" y="332" width="9" height="9"/><rect x="1068" y="332" width="9" height="9"/><rect x="1085" y="332" width="9" height="9"/>
            <rect x="1051" y="349" width="9" height="9"/><rect x="1068" y="349" width="9" height="9"/><rect x="1085" y="349" width="9" height="9"/>
            <rect x="1051" y="366" width="9" height="9"/><rect x="1068" y="366" width="9" height="9"/><rect x="1085" y="366" width="9" height="9"/>

            {/* B17: rightmost tall */}
            <rect x="1117" y="270" width="46" height="250"/>
            <rect x="1123" y="250" width="34" height="22"/>
            <rect x="1130" y="230" width="20" height="22"/>
            <line x1="1140" x2="1140" y1="216" y2="230"/>
            <rect x="1124" y="284" width="8" height="8"/><rect x="1140" y="284" width="8" height="8"/><rect x="1154" y="284" width="8" height="8"/>
            <rect x="1124" y="300" width="8" height="8"/><rect x="1140" y="300" width="8" height="8"/><rect x="1154" y="300" width="8" height="8"/>
            <rect x="1124" y="316" width="8" height="8"/><rect x="1140" y="316" width="8" height="8"/><rect x="1154" y="316" width="8" height="8"/>
            <rect x="1124" y="332" width="8" height="8"/><rect x="1140" y="332" width="8" height="8"/><rect x="1154" y="332" width="8" height="8"/>

            {/* B18: wide edge block */}
            <rect x="1177" y="340" width="70" height="180"/>
            <rect x="1185" y="352" width="10" height="10"/><rect x="1203" y="352" width="10" height="10"/><rect x="1221" y="352" width="10" height="10"/>
            <rect x="1185" y="370" width="10" height="10"/><rect x="1203" y="370" width="10" height="10"/><rect x="1221" y="370" width="10" height="10"/>
            <rect x="1185" y="388" width="10" height="10"/><rect x="1203" y="388" width="10" height="10"/><rect x="1221" y="388" width="10" height="10"/>

            {/* NEW RIGHT 1: slim spire */}
            <rect x="1260" y="280" width="28" height="240"/>
            <rect x="1264" y="258" width="20" height="24"/>
            <rect x="1269" y="238" width="10" height="22"/>
            <line x1="1274" x2="1274" y1="222" y2="238"/>
            <rect x="1265" y="288" width="7" height="7"/><rect x="1277" y="288" width="7" height="7"/>
            <rect x="1265" y="303" width="7" height="7"/><rect x="1277" y="303" width="7" height="7"/>
            <rect x="1265" y="318" width="7" height="7"/><rect x="1277" y="318" width="7" height="7"/>
            <rect x="1265" y="333" width="7" height="7"/><rect x="1277" y="333" width="7" height="7"/>

            {/* NEW RIGHT 2: wide stepped block with antenna */}
            <rect x="1300" y="310" width="65" height="210"/>
            <rect x="1308" y="288" width="49" height="24"/>
            <rect x="1318" y="268" width="29" height="22"/>
            <line x1="1332" x2="1332" y1="254" y2="268"/>
            <rect x="1305" y="320" width="9" height="9"/><rect x="1322" y="320" width="9" height="9"/><rect x="1339" y="320" width="9" height="9"/><rect x="1354" y="320" width="9" height="9"/>
            <rect x="1305" y="337" width="9" height="9"/><rect x="1322" y="337" width="9" height="9"/><rect x="1339" y="337" width="9" height="9"/><rect x="1354" y="337" width="9" height="9"/>
            <rect x="1305" y="354" width="9" height="9"/><rect x="1322" y="354" width="9" height="9"/><rect x="1339" y="354" width="9" height="9"/><rect x="1354" y="354" width="9" height="9"/>
            <rect x="1305" y="371" width="9" height="9"/><rect x="1322" y="371" width="9" height="9"/><rect x="1339" y="371" width="9" height="9"/>

            {/* NEW RIGHT 3: short anchor at far edge */}
            <rect x="1378" y="360" width="80" height="160"/>
            <rect x="1386" y="372" width="10" height="10"/><rect x="1404" y="372" width="10" height="10"/><rect x="1422" y="372" width="10" height="10"/>
            <rect x="1386" y="390" width="10" height="10"/><rect x="1404" y="390" width="10" height="10"/><rect x="1422" y="390" width="10" height="10"/>
            <rect x="1386" y="408" width="10" height="10"/><rect x="1404" y="408" width="10" height="10"/>

            {/* Ground line */}
            <line x1="0" y1="520" x2="1440" y2="520" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
          </g>
        </svg>

        <canvas ref={canvasRef} />
      </div>

      {/* Hero copy */}
      <div className="hero-content">
        <div className="eyebrow">
          <span className="eyebrow-line" />
          Fractional Investing
          <span className="eyebrow-line" />
        </div>

        <div className="headline">Own Premium Assets,</div>
        <span className="headline-plain">Without the Premium Price.</span>

        <div className="rule" />

        <p className="description">
          Hold fractional stakes in high-value real estate, collectibles, and
          alternative assets. Pool capital with other investors and trade your
          shares on our secondary market — anytime.
        </p>

        <div className="actions">
          <Link to="/register" className="btn-primary">
            Start Investing
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M5 3l4 4-4 4"
                stroke="rgb(43,120,162)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <Link to="/explore" className="btn-secondary">
            Explore Assets
          </Link>
        </div>
      </div>

      {/* Stats bar */}
      <div className="stats">
        <div className="stat-item">
          <span className="stat-num">$48M+</span>
          <span className="stat-label">Assets Listed</span>
        </div>
        <div className="stat-item">
          <span className="stat-num">12,000+</span>
          <span className="stat-label">Investors</span>
        </div>
        <div className="stat-item">
          <span className="stat-num">94%</span>
          <span className="stat-label">Satisfaction</span>
        </div>
      </div>

    </section>
  );
};
export default HeroSection;