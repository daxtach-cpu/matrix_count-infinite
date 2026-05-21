/* ═══════════════════════════════════════════
   1. PLUIE MATRIX
═══════════════════════════════════════════ */
(function() {
  const canvas = document.getElementById('rain');
  const ctx = canvas.getContext('2d');
  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF∑∫√π∞≈≠≤≥±×÷';
 
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);
 
  const fontSize = 14;
  let cols = Math.floor(canvas.width / fontSize);
  let drops = Array(cols).fill(0).map(() => Math.random() * -100);
 
  function draw() {
    ctx.fillStyle = 'rgba(0,3,0,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
 
    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const brightness = Math.random();
      if (brightness > 0.95) {
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#00ff41';
      } else if (brightness > 0.7) {
        ctx.fillStyle = '#00ff41';
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#00ff41';
      } else {
        ctx.fillStyle = '#006614';
        ctx.shadowBlur = 0;
      }
 
      ctx.font = fontSize + 'px Share Tech Mono, monospace';
      ctx.fillText(char, i * fontSize, drops[i] * fontSize);
 
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }
 
  setInterval(draw, 45);
})();
 
/* ═══════════════════════════════════════════
   2. CALCULS GÉANTS EN FOND
═══════════════════════════════════════════ */
(function() {
  const canvas = document.getElementById('calculs');
  const ctx = canvas.getContext('2d');
 
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);
 
  const formulas = [
    '∫₀^∞ e^(-x²) dx = √π/2',
    'E = mc²',
    'F(s) = ∫₀^∞ f(t)e^(-st) dt',
    '∑ n=1→∞ 1/n² = π²/6',
    'e^(iπ) + 1 = 0',
    '∇²φ = ρ/ε₀',
    '∂u/∂t = α∇²u',
    'H|ψ⟩ = E|ψ⟩',
    'ds² = -c²dt² + dx² + dy² + dz²',
    'Γ(n+1) = n!',
    '∮ E·dl = -dΦ/dt',
    'PV = nRT',
    'λ = h/mv',
    '∑ᵢ∑ⱼ aᵢⱼxᵢxⱼ > 0',
    '∇×B = μ₀J + μ₀ε₀∂E/∂t',
  ];
 
  const particles = Array.from({ length: 18 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vy: 0.12 + Math.random() * 0.25,
    formula: formulas[Math.floor(Math.random() * formulas.length)],
    size: 18 + Math.random() * 36,
    alpha: 0.04 + Math.random() * 0.1,
  }));
 
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particles) {
      ctx.font = `${p.size}px VT323, monospace`;
      ctx.fillStyle = `rgba(0,255,65,${p.alpha})`;
      ctx.fillText(p.formula, p.x, p.y);
      p.y += p.vy;
      if (p.y > canvas.height + 60) {
        p.y = -60;
        p.x = Math.random() * canvas.width;
        p.formula = formulas[Math.floor(Math.random() * formulas.length)];
      }
    }
  }
 
  setInterval(draw, 50);
})();
 
/* ═══════════════════════════════════════════
   3. MOTEUR DE CALCUL INFINI
═══════════════════════════════════════════ */
(function() {
  const opEl     = document.getElementById('current-op');
  const cntOps   = document.getElementById('cnt-ops');
  const cntSpeed = document.getElementById('cnt-speed');
  const cntRes   = document.getElementById('cnt-result');
  const logEl    = document.getElementById('log');
  const progEl   = document.getElementById('prog');
  const sbTime   = document.getElementById('sb-time');
  const sbMem    = document.getElementById('sb-mem');
  const sbEnt    = document.getElementById('sb-entropy');
 
  let totalOps = 0;
  let opsThisSec = 0;
  let startTime = Date.now();
  let progress = 0;
  let accumulator = BigInt(0);
 
  const OPS = [
    (a, b) => ({ expr: `${a} + ${b}`, res: a + b, sym: '+' }),
    (a, b) => ({ expr: `${a} × ${b}`, res: a * b, sym: '×' }),
    (a, b) => ({ expr: `${a} − ${b}`, res: a - b, sym: '−' }),
    (a, b) => ({ expr: `${a} mod ${b || 1n}`, res: b ? a % b : 0n, sym: 'mod' }),
    (a, b) => ({ expr: `(${a})² + (${b})²`, res: a * a + b * b, sym: '^2' }),
    (a, b) => ({ expr: `∑[${a}..${a + b}]`, res: ((a + b) * (b + 1n)) / 2n, sym: '∑' }),
    (a, b) => ({ expr: `⌊√(${a * a + b * b})⌋`, res: bigSqrt(a * a + b * b), sym: '√' }),
    (a, b) => ({ expr: `${a} ⊕ ${b} (XOR)`, res: a ^ b, sym: '⊕' }),
    (a, b) => ({ expr: `GCD(${a}, ${b})`, res: gcd(a < 0n ? -a : a, b < 0n ? -b : b), sym: 'GCD' }),
    (a, b) => ({ expr: `${a} << ${b % 8n}`, res: a << (b % 8n), sym: '<<' }),
  ];
 
  function bigSqrt(n) {
    if (n < 0n) return 0n;
    if (n === 0n) return 0n;
    let x = n;
    let y = (x + 1n) / 2n;
    while (y < x) { x = y; y = (x + n / x) / 2n; }
    return x;
  }
 
  function gcd(a, b) {
    while (b) { let t = b; b = a % b; a = t; }
    return a;
  }
 
  function randBig(max = 999999n) {
    return BigInt(Math.floor(Math.random() * Number(max)));
  }
 
  function formatBig(n) {
    const s = n.toString();
    if (s.length > 18) return s.slice(0, 8) + '...' + s.slice(-6) + ` [${s.length} chiffres]`;
    return s;
  }
 
  function addLog(text, bright = false) {
    const el = document.createElement('div');
    el.className = 'log-line' + (bright ? ' bright' : '');
    el.textContent = text;
    logEl.prepend(el);
    while (logEl.children.length > 12) logEl.lastChild.remove();
  }
 
  let seq = 0;
  function runCalc() {
    const a = randBig(BigInt(10 ** (4 + (seq % 6))));
    const b = randBig(BigInt(10 ** (2 + (seq % 4)))) + 1n;
    const op = OPS[seq % OPS.length];
    const { expr, res } = op(a, b);
 
    accumulator += (res < 0n ? -res : res) % (10n ** 20n);
    totalOps++;
    opsThisSec++;
    seq++;
 
    const resStr = formatBig(res < 0n ? -res : res);
    opEl.textContent = `[ OP #${totalOps} ]  ${expr}  =  ${resStr}`;
    cntOps.textContent = totalOps.toLocaleString();
    cntRes.textContent = formatBig(accumulator).slice(0, 12);
 
    addLog(`  ${expr} = ${resStr}`, totalOps % 7 === 0);
 
    progress = (progress + (1.3 + Math.random() * 2.5)) % 100;
    progEl.style.width = progress + '%';
  }
 
  // Vitesse adaptative — rapide mais lisible
  let delay = 120;
  function loop() {
    runCalc();
    // Accélération progressive
    if (totalOps < 50)       delay = 180;
    else if (totalOps < 200) delay = 100;
    else if (totalOps < 500) delay = 60;
    else                      delay = 35;
    setTimeout(loop, delay);
  }
  setTimeout(loop, 400);
 
  // Compteur vitesse
  setInterval(() => {
    cntSpeed.textContent = opsThisSec;
    opsThisSec = 0;
  }, 1000);
 
  // Status bar
  setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const h = String(Math.floor(elapsed / 3600)).padStart(2, '0');
    const m = String(Math.floor((elapsed % 3600) / 60)).padStart(2, '0');
    const s = String(elapsed % 60).padStart(2, '0');
    sbTime.textContent = `${h}:${m}:${s}`;
    sbMem.textContent  = (Math.floor(totalOps * 0.28 + 44)).toLocaleString();
    sbEnt.textContent  = (Math.random() * 0.9 + 0.1).toFixed(6);
  }, 500);
})();