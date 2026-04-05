import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { EXPERIENCE } from "../data";

// ── Word-by-word reveal for the bio ─────────────────────────────────────
function RevealText({
  children,
  delay = 0,
  highlight = [],
}: {
  children: string;
  delay?: number;
  highlight?: string[];
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });
  const words = children.split(" ");

  return (
    <p ref={ref} style={{ lineHeight: 1.85, margin: 0 }}>
      {words.map((word, i) => {
        const clean = word.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        const isHighlight = highlight.some((h) =>
          clean.includes(h.toLowerCase()),
        );
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * 0.028,
            }}
            style={{
              display: "inline-block",
              marginRight: "0.28em",
              color: isHighlight ? "#fff" : "rgba(255,255,255,0.45)",
              fontWeight: isHighlight ? 500 : 300,
              fontSize: "clamp(15px, 1.8vw, 17px)",
            }}
          >
            {word}
          </motion.span>
        );
      })}
    </p>
  );
}

// ── Stat — large number with animated count-up ──────────────────────────
function AnimatedStat({
  value,
  suffix,
  label,
  delay,
}: {
  value: number | string;
  suffix: string;
  label: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      style={{ position: "relative" }}
    >
      {/* Giant background number — decorative */}
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(72px, 10vw, 120px)",
          fontWeight: 800,
          letterSpacing: "-4px",
          lineHeight: 1,
          color: "transparent",
          WebkitTextStroke: "1px rgba(255,255,255,0.06)",
          userSelect: "none",
          position: "absolute",
          top: "-16px",
          left: "-4px",
          zIndex: 0,
        }}
      >
        {value}
        {suffix}
      </div>

      {/* Foreground */}
      <div style={{ position: "relative", zIndex: 1, paddingTop: "8px" }}>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(40px, 6vw, 72px)",
            fontWeight: 800,
            letterSpacing: "-2.5px",
            lineHeight: 1,
            color: "#fff",
          }}
        >
          {value}
          <span style={{ color: "var(--accent)" }}>{suffix}</span>
        </div>
        <div
          style={{
            fontSize: "12px",
            color: "var(--text-muted)",
            marginTop: "8px",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            fontFamily: "var(--font-display)",
            fontWeight: 600,
          }}
        >
          {label}
        </div>
      </div>
    </motion.div>
  );
}

// ── Experience timeline card ─────────────────────────────────────────────
function ExpCard({
  exp,
  index,
  inView,
}: {
  exp: (typeof EXPERIENCE)[0];
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const above = index % 2 === 0;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        minWidth: "260px",
        flex: "0 0 260px",
      }}
    >
      {/* Card — above or below the line */}
      <motion.div
        initial={{ opacity: 0, y: above ? -32 : 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.65,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.2 + index * 0.15,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          order: above ? 0 : 2,
          padding: "20px 22px",
          borderRadius: "12px",
          background: hovered
            ? "rgba(201,255,71,0.05)"
            : "rgba(255,255,255,0.025)",
          border: `1px solid ${hovered ? "rgba(201,255,71,0.2)" : "rgba(255,255,255,0.07)"}`,
          transition: "background 0.25s, border-color 0.25s",
          width: "100%",
          marginBottom: above ? "0" : "0",
          position: "relative",
        }}
      >
        {/* Logo / initials */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "12px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              background: "rgba(201,255,71,0.07)",
              border: "1px solid rgba(201,255,71,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              overflow: "hidden",
            }}
          >
            <img
              src={`/logos/${exp.logoFile}`}
              alt={exp.company}
              style={{ width: "26px", height: "26px", objectFit: "contain" }}
              onError={(e) => {
                const img = e.currentTarget;
                img.style.display = "none";
                const parent = img.parentElement;
                if (parent)
                  parent.innerHTML = `<span style="font-family:var(--font-display);font-size:13px;font-weight:800;color:var(--accent)">${exp.company.slice(0, 2).toUpperCase()}</span>`;
              }}
            />
          </div>
          <div>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "13px",
                fontWeight: 700,
                color: "#fff",
                letterSpacing: "-0.2px",
              }}
            >
              {exp.company}
            </p>
            <p
              style={{
                fontSize: "10px",
                color: "var(--text-muted)",
                letterSpacing: "0.5px",
                marginTop: "1px",
              }}
            >
              {exp.period}
            </p>
          </div>
        </div>

        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "12px",
            fontWeight: 600,
            color: "var(--accent)",
            marginBottom: "6px",
            letterSpacing: "0.3px",
          }}
        >
          {exp.role}
        </p>
        <p
          style={{
            fontSize: "12px",
            color: "var(--text-secondary)",
            lineHeight: 1.6,
            fontWeight: 300,
            marginBottom: "12px",
          }}
        >
          {exp.desc}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
          {exp.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "9px",
                padding: "2px 8px",
                borderRadius: "2px",
                background: "rgba(201,255,71,0.06)",
                border: "1px solid rgba(201,255,71,0.12)",
                color: "rgba(201,255,71,0.65)",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Triangle pointer to timeline */}
        <div
          style={{
            position: "absolute",
            [above ? "bottom" : "top"]: "-7px",
            left: "32px",
            width: 0,
            height: 0,
            borderLeft: "6px solid transparent",
            borderRight: "6px solid transparent",
            [above ? "borderTop" : "borderBottom"]:
              `7px solid ${hovered ? "rgba(201,255,71,0.2)" : "rgba(255,255,255,0.07)"}`,
            transition: "border-color 0.25s",
          }}
        />
      </motion.div>

      {/* Center node on the timeline */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{
          duration: 0.4,
          delay: 0.3 + index * 0.15,
          type: "spring",
          stiffness: 200,
        }}
        style={{
          order: 1,
          width: "14px",
          height: "14px",
          borderRadius: "50%",
          background: hovered ? "var(--accent)" : "#0a0a0a",
          border: `2px solid ${hovered ? "var(--accent)" : "rgba(201,255,71,0.4)"}`,
          boxShadow: hovered ? "0 0 12px rgba(201,255,71,0.5)" : "none",
          transition: "background 0.25s, border-color 0.25s, box-shadow 0.25s",
          zIndex: 2,
          flexShrink: 0,
          margin: "12px 0",
        }}
      />

      {/* Spacer so above/below cards don't stack */}
      <div style={{ order: above ? 2 : 0, height: "80px" }} />
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────
export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const expRef = useRef<HTMLDivElement>(null);
  const expInView = useInView(expRef, { once: true, margin: "-60px 0px" });

  return (
    <section
      id="about"
      style={{
        padding: "clamp(72px, 10vw, 112px) clamp(40px, 6vw, 96px)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div ref={ref}>
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: "64px",
          }}
        >
          01 — About
        </motion.p>

        {/* ── Big editorial layout ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "clamp(48px, 8vw, 112px)",
            alignItems: "start",
            marginBottom: "clamp(72px, 10vw, 120px)",
          }}
        >
          {/* Left — identity headline */}
          <div>
            {/* Stacked large words */}
            <div style={{ marginBottom: "40px" }}>
              {["Engineer.", "Builder.", "Designer."].map((word, i) => (
                <motion.div
                  key={word}
                  initial={{ opacity: 0, x: -40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.65,
                    ease: [0.22, 1, 0.36, 1],
                    delay: i * 0.1,
                  }}
                  style={{ overflow: "hidden", lineHeight: 0.95 }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(40px, 6.5vw, 78px)",
                      fontWeight: 800,
                      letterSpacing: "-3px",
                      color:
                        i === 2
                          ? "var(--accent)"
                          : i === 1
                            ? "rgba(255,255,255,0.5)"
                            : "#fff",
                      display: "block",
                    }}
                  >
                    {word}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Accent line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.35,
              }}
              style={{
                width: "100%",
                height: "1px",
                background:
                  "linear-gradient(to right, var(--accent), transparent)",
                transformOrigin: "left",
                marginBottom: "40px",
              }}
            />

            {/* Bio — word by word */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <RevealText
                delay={0.4}
                highlight={["ISIMM", "Tunisia", "full-stack", "LMS"]}
              >
                I'm a software engineering graduate from ISIMM, Tunisia. I
                specialize in full-stack web development, with deep expertise in
                LMS platforms and modern web apps.
              </RevealText>
              <RevealText
                delay={0.6}
                highlight={[
                  "Skilevo",
                  "AI",
                  "chatbot",
                  "Ollama",
                  "code",
                  "playground",
                ]}
              >
                I built Skilevo — a full-featured Moodle LMS with an integrated
                AI chatbot powered by Ollama, a code playground supporting
                Python, C, and Java.
              </RevealText>
              <RevealText
                delay={0.8}
                highlight={[
                  "quality",
                  "craft",
                  "actually",
                  "architecture",
                  "pixel",
                ]}
              >
                I care about code quality, UI craft, and shipping things that
                actually work well — from architecture to the last pixel.
              </RevealText>
            </div>
          </div>

          {/* Right — stats */}
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "clamp(24px, 4vw, 48px)",
                paddingTop: "8px",
              }}
            >
              <AnimatedStat
                value={5}
                suffix="+"
                label="Years building"
                delay={0.2}
              />
              <AnimatedStat
                value={6}
                suffix="+"
                label="Projects shipped"
                delay={0.3}
              />
              <AnimatedStat
                value={4}
                suffix=""
                label="Languages spoken"
                delay={0.4}
              />
              <AnimatedStat
                value="M"
                suffix="sc"
                label="Masters degree"
                delay={0.5}
              />
            </div>

            {/* Availability pill */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.65, duration: 0.5 }}
              style={{
                marginTop: "clamp(32px, 5vw, 52px)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "10px",
                  height: "10px",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "var(--accent)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: "-4px",
                    borderRadius: "50%",
                    border: "1px solid var(--accent)",
                    animation: "ping 2s ease-out infinite",
                    opacity: 0.4,
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                  fontWeight: 300,
                }}
              >
                Open to new opportunities in{" "}
                <strong style={{ color: "#fff", fontWeight: 500 }}>2026</strong>
              </span>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.75, duration: 0.5 }}
              style={{
                marginTop: "16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span
                style={{
                  fontSize: "12px",
                  color: "var(--text-muted)",
                  letterSpacing: "0.5px",
                }}
              >
                Monastir, Tunisia · UTC+1
              </span>
            </motion.div>
          </div>
        </div>

        {/* ── Experience timeline ── */}
        <div ref={expRef}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={expInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: "48px" }}
          >
            <p
              style={{
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginBottom: "6px",
              }}
            >
              Experience
            </p>
            <p
              style={{
                fontSize: "13px",
                color: "var(--text-muted)",
                fontStyle: "italic",
              }}
            >
              Scroll to explore →
            </p>
          </motion.div>

          {/* Horizontal scroll container */}
          <div
            style={{
              position: "relative",
              overflowX: "auto",
              overflowY: "visible",
              paddingBottom: "24px",
              cursor: "grab",
            }}
            onMouseDown={(e) => {
              const el = e.currentTarget;
              el.style.cursor = "grabbing";
              const startX = e.pageX - el.offsetLeft;
              const scrollLeft = el.scrollLeft;
              const onMove = (ev: MouseEvent) => {
                el.scrollLeft =
                  scrollLeft - (ev.pageX - el.offsetLeft - startX);
              };
              const onUp = () => {
                el.style.cursor = "grab";
                window.removeEventListener("mousemove", onMove);
                window.removeEventListener("mouseup", onUp);
              };
              window.addEventListener("mousemove", onMove);
              window.addEventListener("mouseup", onUp);
            }}
          >
            {/* Timeline track */}
            <div
              style={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                minWidth: "100%",
                paddingTop: "8px",
              }}
            >
              {/* The line itself */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={expInView ? { scaleX: 1 } : {}}
                transition={{
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.1,
                }}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "0",
                  right: "0",
                  height: "1px",
                  background:
                    "linear-gradient(to right, transparent, rgba(201,255,71,0.25) 10%, rgba(201,255,71,0.25) 90%, transparent)",
                  transformOrigin: "left",
                  zIndex: 0,
                  // vertically center it in the cards layout
                  transform: "translateY(calc(-50% + 80px))",
                }}
              />

              {/* Start cap */}
              <div style={{ width: "32px", flexShrink: 0 }} />

              {/* Cards */}
              <div
                style={{
                  display: "flex",
                  gap: "32px",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {EXPERIENCE.map((exp, i) => (
                  <ExpCard
                    key={exp.role}
                    exp={exp}
                    index={i}
                    inView={expInView}
                  />
                ))}
              </div>

              {/* End cap with "More coming" */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={expInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8, duration: 0.5 }}
                style={{
                  flexShrink: 0,
                  paddingLeft: "24px",
                  paddingRight: "16px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                  paddingTop: "40px",
                }}
              >
                <div
                  style={{
                    width: "1px",
                    height: "32px",
                    background: "rgba(201,255,71,0.15)",
                  }}
                />
                <span
                  style={{
                    fontSize: "10px",
                    color: "var(--text-muted)",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}
                >
                  More ahead
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ping {
          0% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
