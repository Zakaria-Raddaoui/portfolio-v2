import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

function useLoopingTypewriter(
  text: string,
  typeSpeed = 55,
  deleteSpeed = 28,
  pauseMs = 2000,
  startDelay = 0,
) {
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<
    "waiting" | "typing" | "pausing" | "deleting"
  >("waiting");

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (phase === "waiting") {
      timeout = setTimeout(() => setPhase("typing"), startDelay);
    } else if (phase === "typing") {
      if (displayed.length < text.length) {
        timeout = setTimeout(
          () => setDisplayed(text.slice(0, displayed.length + 1)),
          typeSpeed,
        );
      } else {
        timeout = setTimeout(() => setPhase("pausing"), pauseMs);
      }
    } else if (phase === "pausing") {
      setPhase("deleting");
    } else if (phase === "deleting") {
      if (displayed.length > 0) {
        timeout = setTimeout(
          () => setDisplayed(text.slice(0, displayed.length - 1)),
          deleteSpeed,
        );
      } else {
        timeout = setTimeout(() => setPhase("typing"), 350);
      }
    }
    return () => clearTimeout(timeout);
  }, [phase, displayed, text, typeSpeed, deleteSpeed, pauseMs, startDelay]);

  return { displayed, isTyping: phase === "typing" || phase === "waiting" };
}

function ContactHeadline() {
  const { displayed, isTyping } = useLoopingTypewriter(
    "Let's build something great.",
    60,
    30,
    2200,
    300,
  );

  return (
    <>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(36px, 5.5vw, 68px)",
          fontWeight: 800,
          letterSpacing: "-2.5px",
          color: "#fff",
          lineHeight: 1.05,
          minHeight: "1.2em",
        }}
      >
        {displayed}
        <span
          style={{
            display: "inline-block",
            width: "3px",
            height: "0.8em",
            background: "var(--accent)",
            marginLeft: "4px",
            verticalAlign: "middle",
            animation: isTyping ? "none" : "blink 0.75s step-end infinite",
            opacity: isTyping ? 1 : undefined,
          }}
        />
      </h2>
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </>
  );
}

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("raddaouizakariya@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      style={{
        padding: "clamp(72px, 10vw, 128px) clamp(40px, 6vw, 96px)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div ref={ref}>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: "14px",
          }}
        >
          04 — Contact
        </motion.p>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.05 }}
        >
          {inView ? (
            <ContactHeadline />
          ) : (
            <div style={{ minHeight: "180px" }} />
          )}
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.55 }}
          style={{
            fontSize: "16px",
            color: "var(--text-secondary)",
            marginTop: "24px",
            lineHeight: 1.8,
            fontWeight: 300,
            maxWidth: "480px",
          }}
        >
          I'm open to freelance projects, full-time roles, and interesting
          collaborations. Whether you have a clear idea or just want to talk
          tech, my inbox is always open.
        </motion.p>

        {/* Big email CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginTop: "52px" }}
        >
          <a
            href="mailto:raddaouizakariya@gmail.com"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "16px",
              textDecoration: "none",
              padding: "20px 32px",
              background: "var(--accent)",
              borderRadius: "6px",
              fontFamily: "var(--font-display)",
              fontSize: "clamp(15px, 2vw, 18px)",
              fontWeight: 700,
              color: "#0a0a0a",
              letterSpacing: "-0.3px",
              transition: "transform 0.2s, opacity 0.2s",
              boxShadow: "0 0 40px rgba(201,255,71,0.15)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow =
                "0 8px 48px rgba(201,255,71,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 0 40px rgba(201,255,71,0.15)";
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            Say hello →
          </a>
        </motion.div>

        {/* Secondary links row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.45, duration: 0.5 }}
          style={{
            marginTop: "32px",
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            alignItems: "center",
          }}
        >
          {/* Copy email */}
          <button
            onClick={copyEmail}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "transparent",
              border: "1px solid var(--border)",
              borderRadius: "4px",
              padding: "10px 18px",
              fontSize: "13px",
              color: copied ? "var(--accent)" : "var(--text-secondary)",
              fontFamily: "var(--font-body)",
              cursor: "pointer",
              transition: "color 0.2s, border-color 0.2s",
              letterSpacing: "0.3px",
            }}
            onMouseEnter={(e) => {
              if (!copied) {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                e.currentTarget.style.color = "#fff";
              }
            }}
            onMouseLeave={(e) => {
              if (!copied) {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.color = "var(--text-secondary)";
              }
            }}
          >
            {copied ? (
              <>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                Copy email
              </>
            )}
          </button>

          <span
            style={{ color: "var(--border)", fontSize: "18px", lineHeight: 1 }}
          >
            ·
          </span>

          {/* GitHub */}
          <a
            href="https://github.com/Zakaria-Raddaoui"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              border: "1px solid var(--border)",
              borderRadius: "4px",
              padding: "10px 18px",
              fontSize: "13px",
              color: "var(--text-secondary)",
              transition: "color 0.2s, border-color 0.2s",
              letterSpacing: "0.3px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-secondary)";
              e.currentTarget.style.borderColor = "var(--border)";
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/zakariya-raddaoui"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              border: "1px solid var(--border)",
              borderRadius: "4px",
              padding: "10px 18px",
              fontSize: "13px",
              color: "var(--text-secondary)",
              transition: "color 0.2s, border-color 0.2s",
              letterSpacing: "0.3px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#0a66c2";
              e.currentTarget.style.borderColor = "rgba(10,102,194,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-secondary)";
              e.currentTarget.style.borderColor = "var(--border)";
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
        </motion.div>
      </div>
    </section>
  );
}
