export default function DeleteAccountPage() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      color: "#f0f0f0",
      fontFamily: "'Georgia', serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
    }}>
      <div style={{
        maxWidth: "640px",
        width: "100%",
      }}>
        {/* Header */}
        <div style={{ marginBottom: "48px" }}>
          <div style={{
            display: "inline-block",
            background: "#c0392b",
            color: "white",
            fontSize: "11px",
            fontFamily: "monospace",
            letterSpacing: "0.15em",
            padding: "4px 10px",
            marginBottom: "20px",
            textTransform: "uppercase",
          }}>
            Tekser · by Tekser Team
          </div>
          <h1 style={{
            fontSize: "clamp(28px, 5vw, 42px)",
            fontWeight: "normal",
            lineHeight: 1.15,
            margin: "0 0 16px 0",
            letterSpacing: "-0.02em",
          }}>
            Account Deletion Request
          </h1>
          <p style={{
            color: "#999",
            fontSize: "15px",
            lineHeight: 1.7,
            margin: 0,
            fontFamily: "sans-serif",
          }}>
            You may request the deletion of your Tekser account and all associated data at any time. Please read the information below before proceeding.
          </p>
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid #222", marginBottom: "40px" }} />

        {/* Steps */}
        <section style={{ marginBottom: "40px" }}>
          <h2 style={{
            fontSize: "13px",
            fontFamily: "monospace",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#888",
            margin: "0 0 24px 0",
          }}>
            How to Request Deletion
          </h2>

          {[
            {
              step: "01",
              title: "Open the App",
              desc: "Launch Tekser on your Android or iOS device.",
            },
            {
              step: "02",
              title: "Go to Settings",
              desc: "Navigate to your Profile → Settings → Account.",
            },
            {
              step: "03",
              title: "Request Deletion",
              desc: 'Tap "Delete My Account" and confirm the action.',
            },
            {
              step: "04",
              title: "Or Contact Us",
              desc: "Email us at abdurrauf.sakenov@proton.me with the subject line \"Account Deletion Request\" and your registered phone number.",
            },
          ].map(({ step, title, desc }) => (
            <div key={step} style={{
              display: "flex",
              gap: "20px",
              marginBottom: "24px",
              alignItems: "flex-start",
            }}>
              <span style={{
                fontFamily: "monospace",
                fontSize: "12px",
                color: "#c0392b",
                minWidth: "24px",
                paddingTop: "2px",
              }}>{step}</span>
              <div>
                <div style={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  marginBottom: "4px",
                  fontFamily: "sans-serif",
                }}>{title}</div>
                <div style={{
                  fontSize: "14px",
                  color: "#aaa",
                  lineHeight: 1.6,
                  fontFamily: "sans-serif",
                }}>{desc}</div>
              </div>
            </div>
          ))}
        </section>

        {/* Divider */}
        <div style={{ borderTop: "1px solid #222", marginBottom: "40px" }} />

        {/* Data info */}
        <section style={{ marginBottom: "40px" }}>
          <h2 style={{
            fontSize: "13px",
            fontFamily: "monospace",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#888",
            margin: "0 0 20px 0",
          }}>
            What Gets Deleted
          </h2>

          {[
            { label: "Phone number (account identifier)", deleted: true },
            { label: "Search history", deleted: true },
            { label: "AI chat history", deleted: true },
            { label: "Submitted fraud reports", deleted: false, note: "Anonymized and retained for public safety" },
            { label: "Subscription records", deleted: false, note: "Retained as required by financial regulations" },
          ].map(({ label, deleted, note }) => (
            <div key={label} style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
              marginBottom: "14px",
              fontFamily: "sans-serif",
            }}>
              <span style={{
                color: deleted ? "#2ecc71" : "#e67e22",
                fontSize: "16px",
                lineHeight: 1,
                paddingTop: "1px",
              }}>
                {deleted ? "✓" : "~"}
              </span>
              <div>
                <span style={{ fontSize: "14px", color: "#ddd" }}>{label}</span>
                {note && (
                  <div style={{ fontSize: "12px", color: "#777", marginTop: "2px" }}>{note}</div>
                )}
              </div>
            </div>
          ))}

          <p style={{
            marginTop: "20px",
            fontSize: "13px",
            color: "#666",
            fontFamily: "sans-serif",
            lineHeight: 1.6,
          }}>
            Account deletion is processed within <strong style={{ color: "#999" }}>30 days</strong> of your request.
          </p>
        </section>

        {/* Divider */}
        <div style={{ borderTop: "1px solid #222", marginBottom: "32px" }} />

        {/* Footer */}
        <footer style={{
          fontSize: "12px",
          color: "#555",
          fontFamily: "monospace",
          lineHeight: 1.8,
        }}>
          <div>Tekser — by Tekser Team</div>
          <div>abdurrauf.sakenov@proton.me</div>
          <div style={{ marginTop: "8px", color: "#444" }}>
            Available on Google Play & App Store · Kazakhstan
          </div>
        </footer>
      </div>
    </main>
  );
}