const HTML = (status) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${status === "blocked" ? "Nice Try 😈" : "The Button"}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --red:    #ff2d2d;
      --yellow: #ffe600;
      --black:  #0a0a0a;
      --white:  #f5f5f0;
      --gray:   #1a1a1a;
    }

    html, body {
      height: 100%;
      background: var(--black);
      color: var(--white);
      font-family: 'Space Mono', monospace;
      overflow: hidden;
    }

    /* animated scanlines */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0,0,0,0.15) 2px,
        rgba(0,0,0,0.15) 4px
      );
      pointer-events: none;
      z-index: 100;
    }

    /* grain overlay */
    body::after {
      content: '';
      position: fixed;
      inset: -200%;
      width: 400%; height: 400%;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
      opacity: 0.4;
      pointer-events: none;
      z-index: 99;
      animation: grain 0.5s steps(1) infinite;
    }

    @keyframes grain {
      0%  { transform: translate(0,0); }
      10% { transform: translate(-2%,-3%); }
      20% { transform: translate(2%,2%); }
      30% { transform: translate(-3%,1%); }
      40% { transform: translate(1%,-2%); }
      50% { transform: translate(-1%,3%); }
      60% { transform: translate(3%,-1%); }
      70% { transform: translate(-2%,2%); }
      80% { transform: translate(2%,-3%); }
      90% { transform: translate(-1%,1%); }
    }

    .container {
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      position: relative;
      z-index: 10;
      padding: 2rem;
      text-align: center;
    }

    .eyebrow {
      font-family: 'Space Mono', monospace;
      font-size: 0.7rem;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: var(--yellow);
      opacity: 0.8;
    }

    h1 {
      font-family: 'Bebas Neue', sans-serif;
      font-size: clamp(4rem, 15vw, 10rem);
      line-height: 0.9;
      letter-spacing: 0.02em;
      color: var(--white);
      text-shadow:
        4px 4px 0 var(--red),
        8px 8px 0 rgba(255,45,45,0.3);
    }

    .subtitle {
      font-size: 0.85rem;
      line-height: 1.8;
      opacity: 0.6;
      max-width: 36ch;
      font-style: italic;
    }

    /* ── THE BUTTON ── */
    .btn-wrap {
      position: relative;
      margin-top: 1rem;
    }

    .btn-shadow {
      position: absolute;
      inset: 0;
      background: var(--red);
      transform: translate(6px, 6px);
      border-radius: 4px;
    }

    button#doIt {
      position: relative;
      font-family: 'Bebas Neue', sans-serif;
      font-size: 2rem;
      letter-spacing: 0.1em;
      background: var(--yellow);
      color: var(--black);
      border: 3px solid var(--black);
      padding: 1rem 3rem;
      border-radius: 4px;
      cursor: pointer;
      transition: transform 0.08s ease, box-shadow 0.08s ease;
      outline: none;
      user-select: none;
    }

    button#doIt:hover {
      transform: translate(-2px, -2px);
    }

    button#doIt:active {
      transform: translate(5px, 5px);
    }

    /* ── BLOCKED STATE ── */
    .blocked h1 {
      color: var(--red);
      text-shadow:
        4px 4px 0 #7a0000,
        8px 8px 0 rgba(255,0,0,0.2);
      animation: glitch 2s infinite;
    }

    @keyframes glitch {
      0%, 90%, 100% { clip-path: none; transform: none; }
      91% { clip-path: polygon(0 30%, 100% 30%, 100% 40%, 0 40%); transform: translate(-4px); }
      92% { clip-path: polygon(0 60%, 100% 60%, 100% 70%, 0 70%); transform: translate(4px); }
      93% { clip-path: none; transform: none; }
      94% { clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%); transform: translate(-3px); }
      95% { clip-path: none; transform: none; }
    }

    .blocked-icon {
      font-size: 5rem;
      animation: shake 0.4s ease infinite alternate;
    }

    @keyframes shake {
      from { transform: rotate(-5deg) scale(1); }
      to   { transform: rotate(5deg) scale(1.1); }
    }

    .ip-badge {
      font-size: 0.7rem;
      letter-spacing: 0.2em;
      background: var(--gray);
      border: 1px solid #333;
      padding: 0.5rem 1rem;
      border-radius: 2px;
      font-style: normal;
      opacity: 0.7;
    }

    /* corner decoration */
    .corner {
      position: fixed;
      font-size: 0.6rem;
      letter-spacing: 0.15em;
      opacity: 0.25;
      text-transform: uppercase;
    }
    .corner.tl { top: 1.5rem; left: 1.5rem; }
    .corner.tr { top: 1.5rem; right: 1.5rem; }
    .corner.bl { bottom: 1.5rem; left: 1.5rem; }
    .corner.br { bottom: 1.5rem; right: 1.5rem; }
  </style>
</head>
<body class="${status === "blocked" ? "blocked" : ""}">

  <span class="corner tl">SYSTEM // ONLINE</span>
  <span class="corner tr">v1.0.0</span>
  <span class="corner bl">DO NOT PRESS</span>
  <span class="corner br">SERIOUSLY</span>

  ${status === "blocked" ? `
  <div class="container">
    <div class="eyebrow">Access Denied · IP Flagged</div>
    <div class="blocked-icon">🚫</div>
    <h1>Too Late,<br>Buddy</h1>
    <p class="subtitle">
      You pressed it. You can't un-press it.<br>
      Your IP has been logged, catalogued,<br>
      framed, and hung on the Wall of Shame.
    </p>
    <p class="ip-badge">Your fate was sealed at ${new Date().toUTCString()}</p>
  </div>
  ` : `
  <div class="container">
    <div class="eyebrow">Classified · Top Secret · Do Not Read</div>
    <h1>Do Not<br>Press<br>This</h1>
    <p class="subtitle">
      Seriously. Don't.<br>
      There are absolutely zero consequences.<br>
      We're just asking nicely. Please. No.
    </p>
    <div class="btn-wrap">
      <div class="btn-shadow"></div>
      <button id="doIt" onclick="press()">PRESS ME</button>
    </div>
  </div>

  <script>
    async function press() {
      const btn = document.getElementById('doIt');
      btn.disabled = true;
      btn.textContent = 'OH NO...';
      btn.style.background = '#ff2d2d';
      btn.style.color = '#fff';
      try {
        const res = await fetch('/press', { method: 'POST' });
        const data = await res.json();
        if (data.blocked) window.location.reload();
      } catch(e) {
        btn.textContent = 'ERROR (still blocked)';
      }
    }
  </script>
  `}
</body>
</html>`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Get the real client IP from Cloudflare's header
    const ip =
      request.headers.get("CF-Connecting-IP") ||
      request.headers.get("X-Forwarded-For") ||
      "unknown";

    const kvKey = `blocked:${ip}`;

    // ── POST /press  →  block this IP and confirm ──────────────────────────
    if (request.method === "POST" && url.pathname === "/press") {
      await env.BLOCKED_IPS.put(kvKey, "true", {
        // Optional: auto-expire the block after 24 hours (remove to make permanent)
        expirationTtl: 60 * 60 * 24,
      });
      return new Response(JSON.stringify({ blocked: true }), {
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": "pressed=true; Path=/; Max-Age=86400; SameSite=Strict; HttpOnly",
        },
      });
    }

    // ── GET /  →  serve the page ────────────────────────────────────────────
    if (request.method === "GET" && url.pathname === "/") {
      const cookieHeader = request.headers.get("Cookie") || "";
      const hasCookie = /(?:^|;\s*)pressed=true(?:;|$)/.test(cookieHeader);
      const isBlocked = hasCookie || await env.BLOCKED_IPS.get(kvKey);
      const status = isBlocked ? "blocked" : "ok";

      return new Response(HTML(status), {
        headers: { "Content-Type": "text/html;charset=UTF-8" },
      });
    }

    return new Response("Not found", { status: 404 });
  },
};


