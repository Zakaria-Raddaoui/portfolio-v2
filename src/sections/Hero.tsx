import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Marquee from "../components/Marquee";

/* ── Looping typewriter hook ─────────────────────────────── */
function useLoopingTypewriter(
  text: string,
  typeSpeed = 68,
  deleteSpeed = 32,
  pauseMs = 1800,
  startDelay = 400,
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
        timeout = setTimeout(() => setPhase("typing"), 400);
      }
    }

    return () => clearTimeout(timeout);
  }, [phase, displayed, text, typeSpeed, deleteSpeed, pauseMs, startDelay]);

  const isTyping = phase === "typing" || phase === "waiting";
  return { displayed, isTyping };
}

/* ── Floating tag decoration ─────────────────────────────── */
function FloatingTags() {
  const tags = [
    { label: "React", x: "72%", y: "18%", delay: 1.4 },
    { label: "TypeScript", x: "78%", y: "38%", delay: 1.6 },
    { label: "Moodle / PHP", x: "68%", y: "56%", delay: 1.8 },
    { label: "Docker", x: "80%", y: "72%", delay: 2.0 },
    { label: "Node.js", x: "65%", y: "86%", delay: 2.1 },
    { label: "Python", x: "55%", y: "40%", delay: 1.6 },
  ];

  return (
    <>
      {tags.map((tag) => (
        <motion.span
          key={tag.label}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: tag.delay, duration: 0.5, ease: "easeOut" }}
          style={{
            position: "absolute",
            left: tag.x,
            top: tag.y,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.09)",
            borderRadius: "999px",
            padding: "5px 14px",
            fontSize: "11px",
            color: "rgba(255,255,255,0.3)",
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            letterSpacing: "0.5px",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            animation: `floatTag${tag.label.replace(/\W/g, "")} 4s ease-in-out infinite`,
            animationDelay: `${tag.delay + 0.5}s`,
          }}
        >
          {tag.label}
        </motion.span>
      ))}
      <style>{`
        ${tags
          .map(
            (tag) => `
          @keyframes floatTag${tag.label.replace(/\W/g, "")} {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-7px); }
          }
        `,
          )
          .join("")}
      `}</style>
    </>
  );
}

/* ── Name with looping typewriter cursor ─────────────────── */
function NameTypewriter() {
  const fullName = "Zakariya Raddaoui";
  const { displayed, isTyping } = useLoopingTypewriter(
    fullName,
    68,
    32,
    2000,
    300,
  );

  const zakariya = displayed.slice(0, 8);
  const raddaoui = displayed.slice(9);
  const showSpace = displayed.length > 8;

  return (
    <div style={{ position: "relative" }}>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: "48px",
          height: "2px",
          background: "var(--accent)",
          transformOrigin: "left",
          marginBottom: "20px",
        }}
      />
      <h1
        aria-label={fullName}
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(42px, 6.5vw, 80px)",
          fontWeight: 800,
          lineHeight: 0.95,
          letterSpacing: "-2.5px",
          color: "#fff",
          minHeight: "2em",
        }}
      >
        <span style={{ display: "block" }}>{zakariya}</span>
        <span style={{ display: "block", color: "var(--accent)" }}>
          {showSpace ? raddaoui : ""}
          <span
            style={{
              display: "inline-block",
              width: "3px",
              height: "0.82em",
              background: "var(--accent)",
              marginLeft: "2px",
              verticalAlign: "middle",
              animation: isTyping ? "none" : "blink 0.75s step-end infinite",
              opacity: isTyping ? 1 : undefined,
            }}
          />
        </span>
      </h1>

      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.8, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginTop: "18px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          Full-Stack Dev
        </span>
        <span
          style={{
            width: "4px",
            height: "4px",
            borderRadius: "50%",
            background: "var(--accent)",
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          LMS Engineer
        </span>
        <span
          style={{
            width: "4px",
            height: "4px",
            borderRadius: "50%",
            background: "var(--accent)",
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          Tunisia
        </span>
      </motion.div>
    </div>
  );
}

/* ── Magnetic button ─────────────────────────────────────── */
function MagneticBtn({
  children,
  href,
  onClick,
  variant = "primary",
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
}) {
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = "translate(0,0)";
    if (variant === "ghost") {
      e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
      e.currentTarget.style.color = "rgba(255,255,255,0.6)";
    }
  };

  const style: React.CSSProperties =
    variant === "primary"
      ? {
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          background: "var(--accent)",
          color: "#0a0a0a",
          borderRadius: "4px",
          padding: "13px 28px",
          fontFamily: "var(--font-display)",
          fontSize: "13px",
          fontWeight: 700,
          cursor: "pointer",
          transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
          border: "none",
          letterSpacing: "0.3px",
          textDecoration: "none",
        }
      : {
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          background: "transparent",
          color: "rgba(255,255,255,0.6)",
          border: "1px solid rgba(255,255,255,0.14)",
          borderRadius: "4px",
          padding: "12px 24px",
          fontFamily: "var(--font-body)",
          fontSize: "13px",
          fontWeight: 400,
          cursor: "pointer",
          transition:
            "transform 0.35s cubic-bezier(0.22,1,0.36,1), border-color 0.2s, color 0.2s",
          letterSpacing: "0.3px",
          textDecoration: "none",
        };

  return (
    <a
      href={href}
      onClick={onClick}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={(e) => {
        if (variant === "ghost") {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)";
          e.currentTarget.style.color = "#fff";
        }
      }}
    >
      {children}
    </a>
  );
}

/* ── Hero section ────────────────────────────────────────── */
export default function Hero() {
  return (
    <section id="home">
      <div
        style={{
          minHeight: "100vh",
          padding: "clamp(96px, 14vw, 156px) clamp(40px, 6vw, 96px) 60px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)`,
            backgroundSize: "72px 72px",
            pointerEvents: "none",
            maskImage:
              "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          }}
        />

        {/* Radial glow top-right */}
        <div
          style={{
            position: "absolute",
            top: "-15%",
            right: "-5%",
            width: "55vw",
            height: "55vw",
            maxWidth: "650px",
            maxHeight: "650px",
            background:
              "radial-gradient(circle, rgba(201,255,71,0.07) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />

        {/* Floating tech tags (right side, decorative) */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <FloatingTags />
        </div>

        <div style={{ position: "relative", zIndex: 2, maxWidth: "640px" }}>
          {/* Available badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ marginBottom: "32px" }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(201,255,71,0.08)",
                border: "1px solid rgba(201,255,71,0.22)",
                borderRadius: "999px",
                padding: "6px 16px",
                fontSize: "11px",
                color: "var(--accent)",
                letterSpacing: "1px",
                textTransform: "uppercase",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "var(--accent)",
                  animation: "pulse 2s ease-in-out infinite",
                }}
              />
              Available for work
            </span>
          </motion.div>

          {/* Typewriter name */}
          <NameTypewriter />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6, ease: "easeOut" }}
            style={{
              marginTop: "28px",
              fontSize: "clamp(15px, 1.8vw, 17px)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--text-secondary)",
              maxWidth: "500px",
              lineHeight: 1.8,
            }}
          >
            Building digital products full-stack web apps, LMS
            platforms, and tools that actually feel good to use.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.75, duration: 0.6, ease: "easeOut" }}
            style={{
              marginTop: "44px",
              display: "flex",
              gap: "14px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <MagneticBtn
              href="#projects"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View my work <span style={{ fontSize: "15px" }}>↗</span>
            </MagneticBtn>
            <MagneticBtn href="/CV_Zakariya_Raddaoui.pdf" variant="ghost">
             View CV
            </MagneticBtn>
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0, duration: 0.5 }}
            style={{ marginTop: "36px" }}
          >
            <a
              href="mailto:raddaouizakariya@gmail.com"
              style={{
                fontSize: "12px",
                color: "var(--text-muted)",
                letterSpacing: "0.5px",
                transition: "color 0.2s",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--accent)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-muted)")
              }
            >
              <span
                style={{
                  width: "28px",
                  height: "1px",
                  background: "currentColor",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              raddaouizakariya@gmail.com
            </a>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          style={{
            position: "absolute",
            bottom: "36px",
            left: "clamp(40px, 6vw, 96px)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: "var(--text-muted)",
            fontSize: "10px",
            letterSpacing: "2.5px",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "1px",
              background: "rgba(255,255,255,0.1)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                height: "100%",
                width: "100%",
                background: "var(--accent)",
                animation: "scanline 2.2s ease-in-out infinite",
              }}
            />
          </div>
          Scroll
        </motion.div>
      </div>

      <Marquee />

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes scanline { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </section>
  );
}
