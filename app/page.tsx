import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@300;400;700;900&family=Epilogue:ital,wght@0,300;0,400;1,300&display=swap');

        :root {
          --bg: #060608;
          --surface: #0e0e12;
          --border: #1a1a22;
          --accent: #00e5ff;
          --accent2: #ff3b5c;
          --text: #f0f0f5;
          --muted: #555566;
          --card-bg: #0c0c10;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'Epilogue', sans-serif;
          overflow-x: hidden;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 0.6; }
          70% { transform: scale(1.15); opacity: 0; }
          100% { transform: scale(0.95); opacity: 0; }
        }

        @keyframes scan {
          0% { top: 0%; }
          100% { top: 100%; }
        }

        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-2%, -3%); }
          30% { transform: translate(3%, 2%); }
          50% { transform: translate(-1%, 4%); }
          70% { transform: translate(4%, -2%); }
          90% { transform: translate(-3%, 1%); }
        }

        .grain::before {
          content: '';
          position: fixed;
          top: -50%; left: -50%;
          width: 200%; height: 200%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.03;
          animation: grain 0.5s steps(1) infinite;
          pointer-events: none;
          z-index: 9999;
        }

        .hero-glow {
          position: absolute;
          top: -200px;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 600px;
          background: radial-gradient(ellipse at center, rgba(0,229,255,0.04) 0%, transparent 70%);
          pointer-events: none;
        }

        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 48px;
          border-bottom: 1px solid transparent;
          background: rgba(6,6,8,0.8);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .nav-logo {
          font-family: 'Unbounded', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--text);
          text-decoration: none;
        }

        .nav-logo span {
          color: var(--accent);
        }

        .nav-link {
          font-size: 12px;
          font-family: monospace;
          letter-spacing: 0.1em;
          color: var(--muted);
          text-decoration: none;
          text-transform: uppercase;
          transition: color 0.2s;
        }

        .nav-link:hover { color: var(--text); }

        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 120px 24px 80px;
          position: relative;
          overflow: hidden;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(0,229,255,0.06);
          border: 1px solid rgba(0,229,255,0.15);
          border-radius: 100px;
          padding: 6px 16px;
          font-size: 11px;
          font-family: monospace;
          letter-spacing: 0.12em;
          color: var(--accent);
          text-transform: uppercase;
          margin-bottom: 40px;
          animation: fadeUp 0.6s ease both;
        }

        .hero-badge::before {
          content: '';
          width: 6px; height: 6px;
          background: var(--accent);
          border-radius: 50%;
          box-shadow: 0 0 8px var(--accent);
        }

        .hero-title {
          font-family: 'Unbounded', sans-serif;
          font-size: clamp(36px, 7vw, 80px);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -0.03em;
          max-width: 880px;
          animation: fadeUp 0.6s 0.1s ease both;
        }

        .hero-title .highlight {
          color: var(--accent);
          position: relative;
        }

        .hero-title .danger {
          color: var(--accent2);
        }

        .hero-sub {
          margin-top: 28px;
          font-size: clamp(15px, 2vw, 18px);
          font-weight: 300;
          color: #8888aa;
          max-width: 520px;
          line-height: 1.7;
          animation: fadeUp 0.6s 0.2s ease both;
        }

        .hero-cta {
          margin-top: 48px;
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
          animation: fadeUp 0.6s 0.3s ease both;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--accent);
          color: #000;
          font-family: 'Unbounded', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.06em;
          padding: 14px 28px;
          border-radius: 4px;
          text-decoration: none;
          text-transform: uppercase;
          transition: opacity 0.2s, transform 0.2s;
        }

        .btn-primary:hover { opacity: 0.85; transform: translateY(-2px); }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          color: var(--text);
          font-family: monospace;
          font-size: 12px;
          letter-spacing: 0.08em;
          padding: 14px 28px;
          border-radius: 4px;
          border: 1px solid var(--border);
          text-decoration: none;
          text-transform: uppercase;
          transition: border-color 0.2s, transform 0.2s;
        }

        .btn-secondary:hover { border-color: #444455; transform: translateY(-2px); }

        /* Phone mockup */
        .phone-wrap {
          margin-top: 80px;
          position: relative;
          display: inline-block;
          animation: fadeUp 0.8s 0.4s ease both;
        }

        .phone-ring {
          position: absolute;
          inset: -30px;
          border-radius: 60px;
          border: 1px solid rgba(0,229,255,0.12);
          animation: pulse-ring 3s ease-out infinite;
        }

        .phone-ring:nth-child(2) {
          inset: -60px;
          border-color: rgba(0,229,255,0.06);
          animation-delay: 1s;
        }

        .phone {
          width: 220px;
          background: var(--surface);
          border-radius: 36px;
          border: 1px solid var(--border);
          padding: 20px 16px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04);
        }

        .phone::after {
          content: '';
          position: absolute;
          left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--accent), transparent);
          opacity: 0.4;
          animation: scan 3s linear infinite;
        }

        .phone-notch {
          width: 60px;
          height: 6px;
          background: #1a1a22;
          border-radius: 3px;
          margin: 0 auto 20px;
        }

        .phone-input {
          background: #12121a;
          border: 1px solid #1e1e2a;
          border-radius: 10px;
          padding: 12px 14px;
          font-family: monospace;
          font-size: 13px;
          color: var(--accent);
          margin-bottom: 10px;
          letter-spacing: 0.1em;
        }

        .phone-score {
          background: linear-gradient(135deg, rgba(255,59,92,0.1), rgba(255,59,92,0.05));
          border: 1px solid rgba(255,59,92,0.2);
          border-radius: 10px;
          padding: 14px;
          margin-bottom: 10px;
        }

        .score-label {
          font-size: 10px;
          font-family: monospace;
          color: var(--muted);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        .score-value {
          font-family: 'Unbounded', sans-serif;
          font-size: 28px;
          font-weight: 900;
          color: var(--accent2);
        }

        .score-tag {
          display: inline-block;
          background: rgba(255,59,92,0.15);
          color: var(--accent2);
          font-size: 9px;
          font-family: monospace;
          letter-spacing: 0.1em;
          padding: 3px 8px;
          border-radius: 4px;
          margin-top: 6px;
          text-transform: uppercase;
        }

        .phone-row {
          display: flex;
          gap: 8px;
        }

        .phone-chip {
          flex: 1;
          background: #12121a;
          border: 1px solid #1e1e2a;
          border-radius: 8px;
          padding: 10px 8px;
          font-size: 9px;
          font-family: monospace;
          color: var(--muted);
          text-align: center;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .phone-chip span {
          display: block;
          font-size: 14px;
          margin-bottom: 4px;
        }

        /* Features */
        .section {
          max-width: 1100px;
          margin: 0 auto;
          padding: 100px 24px;
        }

        .section-label {
          font-size: 11px;
          font-family: monospace;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 16px;
        }

        .section-title {
          font-family: 'Unbounded', sans-serif;
          font-size: clamp(24px, 4vw, 42px);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.02em;
          max-width: 600px;
          margin-bottom: 64px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1px;
          background: var(--border);
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
        }

        .feature-card {
          background: var(--card-bg);
          padding: 36px 32px;
          transition: background 0.3s;
        }

        .feature-card:hover { background: #0f0f14; }

        .feature-icon {
          font-size: 28px;
          margin-bottom: 20px;
          display: block;
        }

        .feature-title {
          font-family: 'Unbounded', sans-serif;
          font-size: 15px;
          font-weight: 700;
          margin-bottom: 10px;
          letter-spacing: -0.01em;
        }

        .feature-desc {
          font-size: 13px;
          color: #666677;
          line-height: 1.7;
          font-weight: 300;
        }

        /* Stats */
        .stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: var(--border);
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          margin-top: 80px;
        }

        .stat-cell {
          background: var(--card-bg);
          padding: 40px 32px;
          text-align: center;
        }

        .stat-num {
          font-family: 'Unbounded', sans-serif;
          font-size: clamp(28px, 4vw, 48px);
          font-weight: 900;
          letter-spacing: -0.04em;
          color: var(--text);
          margin-bottom: 8px;
        }

        .stat-num .accent { color: var(--accent); }

        .stat-label {
          font-size: 12px;
          font-family: monospace;
          color: var(--muted);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        /* CTA section */
        .cta-section {
          margin: 0 24px 100px;
          max-width: 1100px;
          margin-left: auto;
          margin-right: auto;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 80px 48px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .cta-section::before {
          content: '';
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 60%;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--accent), transparent);
          opacity: 0.4;
        }

        .cta-title {
          font-family: 'Unbounded', sans-serif;
          font-size: clamp(24px, 4vw, 48px);
          font-weight: 900;
          letter-spacing: -0.03em;
          margin-bottom: 20px;
          line-height: 1.1;
        }

        .cta-sub {
          color: #666677;
          font-size: 15px;
          font-weight: 300;
          margin-bottom: 40px;
          max-width: 400px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.7;
        }

        .store-badges {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .store-badge {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: #111116;
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 12px 24px;
          text-decoration: none;
          color: var(--text);
          transition: border-color 0.2s, transform 0.2s;
        }

        .store-badge:hover { border-color: #333344; transform: translateY(-2px); }

        .store-badge-icon { font-size: 24px; }

        .store-badge-text {
          text-align: left;
        }

        .store-badge-sub {
          font-size: 10px;
          font-family: monospace;
          color: var(--muted);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .store-badge-name {
          font-family: 'Unbounded', sans-serif;
          font-size: 13px;
          font-weight: 700;
        }

        /* Footer */
        .footer {
          border-top: 1px solid var(--border);
          padding: 40px 48px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          max-width: 1100px;
          margin: 0 auto;
        }

        .footer-logo {
          font-family: 'Unbounded', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: var(--text);
          text-decoration: none;
        }

        .footer-logo span { color: var(--accent); }

        .footer-links {
          display: flex;
          gap: 32px;
        }

        .footer-link {
          font-size: 12px;
          font-family: monospace;
          letter-spacing: 0.08em;
          color: var(--muted);
          text-decoration: none;
          text-transform: uppercase;
          transition: color 0.2s;
        }

        .footer-link:hover { color: var(--text); }

        .footer-copy {
          font-size: 11px;
          font-family: monospace;
          color: #333344;
          letter-spacing: 0.06em;
        }

        @media (max-width: 640px) {
          .nav { padding: 16px 20px; }
          .stats-row { grid-template-columns: 1fr; }
          .footer { padding: 32px 20px; flex-direction: column; align-items: flex-start; }
          .cta-section { padding: 48px 24px; }
        }
      `}</style>

      <div className="grain" />

      {/* Nav */}
      <nav className="nav">
        <a href="/" className="nav-logo">TEKSER<span>.</span></a>
        <a href="mailto:abdurrauf.sakenov@proton.me" className="nav-link">Contact</a>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-glow" />

        <div className="hero-badge">Kazakhstan Anti-Fraud Shield</div>

        <h1 className="hero-title">
          Know who's calling.<br />
          <span className="danger">Before</span> you{" "}
          <span className="highlight">answer.</span>
        </h1>

        <p className="hero-sub">
          Tekser instantly checks any phone number against our community-powered fraud database — protecting you from scams, spam, and financial fraud.
        </p>

        <div className="hero-cta">
          <a href="#download" className="btn-primary">
            ↓ Get the App
          </a>
          <a href="#features" className="btn-secondary">
            See How It Works →
          </a>
        </div>

        {/* Phone Mockup */}
        <div className="phone-wrap">
          <div className="phone-ring" />
          <div className="phone-ring" style={{ animationDelay: "1s" }} />
          <div className="phone">
            <div className="phone-notch" />
            <div className="phone-input">+7 700 *** **32</div>
            <div className="phone-score">
              <div className="score-label">Risk Score</div>
              <div className="score-value">94</div>
              <div className="score-tag">⚠ Investment Scam</div>
            </div>
            <div className="phone-row">
              <div className="phone-chip">
                <span>🚩</span>
                Reports
                <br />
                <span style={{ color: "#ff3b5c", fontSize: "12px" }}>148</span>
              </div>
              <div className="phone-chip">
                <span>📍</span>
                Region
                <br />
                <span style={{ color: "#f0f0f5", fontSize: "11px" }}>Almaty</span>
              </div>
              <div className="phone-chip">
                <span>🤖</span>
                AI Chat
                <br />
                <span style={{ color: "#00e5ff", fontSize: "11px" }}>Active</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section" id="features">
        <div className="section-label">// Core Features</div>
        <h2 className="section-title">
          Everything you need to stay safe.
        </h2>

        <div className="features-grid">
          {[
            {
              icon: "🔍",
              title: "Number Verification",
              desc: "Check any phone number instantly. Get a risk score, fraud type classification, and community report count.",
            },
            {
              icon: "🚨",
              title: "Community Reporting",
              desc: "Report scam numbers by category — spam, credit fraud, investment scam — and help protect others in Kazakhstan.",
            },
            {
              icon: "🗺️",
              title: "Scam Map & Statistics",
              desc: "Visualize fraud hotspots across Kazakhstan's regions. Know where scam activity is surging in real time.",
            },
            {
              icon: "🤖",
              title: "AI Safety Assistant",
              desc: "24/7 multilingual AI chat powered by Gemini. Ask anything about scams, the app, or how to stay protected.",
            },
            {
              icon: "📋",
              title: "Search History",
              desc: "Every number you've checked is saved to your account. Review your lookup history anytime.",
            },
            {
              icon: "🌐",
              title: "3 Languages",
              desc: "Fully localized in Russian, Kazakh, and English. Tekser speaks your language.",
            },
          ].map(({ icon, title, desc }) => (
            <div className="feature-card" key={title}>
              <span className="feature-icon">{icon}</span>
              <div className="feature-title">{title}</div>
              <div className="feature-desc">{desc}</div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="stats-row">
          <div className="stat-cell">
            <div className="stat-num">1<span className="accent">M+</span></div>
            <div className="stat-label">Numbers in Database</div>
          </div>
          <div className="stat-cell">
            <div className="stat-num">16<span className="accent">+</span></div>
            <div className="stat-label">Regions Covered</div>
          </div>
          <div className="stat-cell">
            <div className="stat-num">24<span className="accent">/7</span></div>
            <div className="stat-label">AI Support</div>
          </div>
        </div>
      </section>

      {/* CTA / Download */}
      <div className="section" style={{ paddingTop: 0 }} id="download">
        <div className="cta-section">
          <h2 className="cta-title">
            Download Tekser.<br />Stay protected.
          </h2>
          <p className="cta-sub">
            Free to use. Premium plan available for unlimited checks and advanced statistics.
          </p>
          <div className="store-badges">
            <a href="#" className="store-badge">
              <span className="store-badge-icon">🤖</span>
              <div className="store-badge-text">
                <div className="store-badge-sub">Get it on</div>
                <div className="store-badge-name">Google Play</div>
              </div>
            </a>
            <a href="#" className="store-badge">
              <span className="store-badge-icon"></span>
              <div className="store-badge-text">
                <div className="store-badge-sub">Download on the</div>
                <div className="store-badge-name">App Store</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #1a1a22", padding: "0 24px" }}>
        <div className="footer">
          <a href="/" className="footer-logo">TEKSER<span>.</span></a>
          <div className="footer-links">
            <Link href="/privacy-policy" className="footer-link">Privacy Policy</Link>
            <Link href="/delete-account" className="footer-link">Delete Account</Link>
            <a href="mailto:abdurrauf.sakenov@proton.me" className="footer-link">Contact</a>
          </div>
          <div className="footer-copy">© {new Date().getFullYear()} Tekser Team · Kazakhstan</div>
        </div>
      </footer>
    </>
  );
}