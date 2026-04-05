import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const CATEGORIES = [
  {
    id: "frontend",
    label: "Frontend",
    color: "#c9ff47",
    skills: [
      "React.js",
      "TypeScript",
      "TailwindCSS",
      "HTML5",
      "CSS3",
      "SASS",
      "Vite",
      "Framer Motion",
      "Bootstrap",
      "Figma",
    ],
  },
  {
    id: "backend",
    label: "Backend",
    color: "#47c9ff",
    skills: [
      "PHP",
      "Moodle",
      "Node.js",
      "Express",
      "Spring Boot",
      "Java",
      "Python",
      "C",
      "REST APIs",
      "MySQL",
      "PostgreSQL",
    ],
  },
  {
    id: "devops",
    label: "DevOps & Tools",
    color: "#ff9447",
    skills: [
      "Docker",
      "Git",
      "GitHub",
      "Linux",
      "Keycloak",
      "Ollama",
      "CI/CD",
      "Agile",
      "Scrum",
    ],
  },
];

// Flatten all skills with category info for the wall
const ALL_SKILLS = CATEGORIES.flatMap((cat) =>
  cat.skills.map((name) => ({
    name,
    color: cat.color,
    category: cat.id,
    label: cat.label,
  })),
);

// Deterministic pseudo-random layout seed per skill
function seededRand(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

export default function Skills() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, {
    once: true,
    margin: "-60px 0px",
  });
  const wallRef = useRef<HTMLDivElement>(null);
  const wallInView = useInView(wallRef, { once: true, margin: "-80px 0px" });

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hasMoused, setHasMoused] = useState(false);

  useEffect(() => {
    const el = wallRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setMouse({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
      setHasMoused(true);
    };
    el.addEventListener("mousemove", handler, { passive: true });
    return () => el.removeEventListener("mousemove", handler);
  }, []);

  // Size tiers — vary visually
  const sizes = [
    "clamp(28px,4vw,48px)",
    "clamp(20px,2.8vw,34px)",
    "clamp(15px,2vw,24px)",
    "clamp(13px,1.6vw,19px)",
  ];

  return (
    <section
      id="skills"
      style={{
        padding: "clamp(72px, 10vw, 112px) clamp(40px, 6vw, 96px)",
        borderTop: "1px solid var(--border)",
      }}
    >
      {/* Header */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 24 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65 }}
        style={{ marginBottom: "56px" }}
      >
        <p
          style={{
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: "14px",
          }}
        >
          02 — Skills
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "24px",
            flexWrap: "wrap",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 5vw, 58px)",
              fontWeight: 800,
              letterSpacing: "-2px",
              color: "#fff",
              lineHeight: 1,
            }}
          >
            Tech Stack
          </h2>

          {/* Category filter pills */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button
              onClick={() => setActiveCategory(null)}
              style={{
                background:
                  activeCategory === null
                    ? "rgba(255,255,255,0.08)"
                    : "transparent",
                border: `1px solid ${activeCategory === null ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)"}`,
                borderRadius: "999px",
                padding: "6px 16px",
                fontSize: "12px",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                color: activeCategory === null ? "#fff" : "var(--text-muted)",
                cursor: "pointer",
                transition: "all 0.2s",
                letterSpacing: "0.5px",
              }}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() =>
                  setActiveCategory(activeCategory === cat.id ? null : cat.id)
                }
                style={{
                  background:
                    activeCategory === cat.id
                      ? `rgba(${hexRgb(cat.color)},0.1)`
                      : "transparent",
                  border: `1px solid ${activeCategory === cat.id ? `rgba(${hexRgb(cat.color)},0.35)` : "rgba(255,255,255,0.08)"}`,
                  borderRadius: "999px",
                  padding: "6px 16px",
                  fontSize: "12px",
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  color:
                    activeCategory === cat.id ? cat.color : "var(--text-muted)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  letterSpacing: "0.5px",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* The wall — skills as large flowing text */}
      <div
        ref={wallRef}
        style={{ position: "relative", minHeight: "480px", userSelect: "none" }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(8px,1.5vw,20px)",
            alignItems: "center",
            lineHeight: 1,
          }}
        >
          {ALL_SKILLS.map((skill, i) => {
            const isActive =
              activeCategory === null || skill.category === activeCategory;
            const sizeIndex = Math.floor(seededRand(i * 7) * sizes.length);
            const fontSize = sizes[sizeIndex];

            // Parallax offset based on mouse — each skill moves at different depth
            const depth = 0.5 + seededRand(i * 3) * 1.5;
            const offsetX = hasMoused ? (mouse.x - 0.5) * depth * 14 : 0;
            void hasMoused; // offsetY intentionally unused

            return (
              <motion.span
                key={skill.name}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  wallInView
                    ? {
                        opacity: isActive ? 1 : 0.1,
                        y: 0,
                        x: offsetX,
                        // subtle float animation per skill at different phases
                        translateY: [0, seededRand(i * 11) > 0.5 ? -4 : 4, 0],
                      }
                    : { opacity: 0, y: 30 }
                }
                transition={{
                  opacity: { duration: 0.3 },
                  y: {
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                    delay: i * 0.022,
                  },
                  x: { type: "spring", stiffness: 60, damping: 20 },
                  translateY: {
                    duration: 3 + seededRand(i * 5) * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: seededRand(i * 9) * 2,
                  },
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = skill.color;
                  e.currentTarget.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "";
                  e.currentTarget.style.opacity = isActive ? "1" : "0.1";
                }}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize,
                  fontWeight:
                    sizeIndex === 0
                      ? 800
                      : sizeIndex === 1
                        ? 700
                        : sizeIndex === 2
                          ? 600
                          : 500,
                  color:
                    isActive && activeCategory === skill.category
                      ? skill.color
                      : "rgba(255,255,255,0.75)",
                  cursor: "default",
                  display: "inline-block",
                  transition: "color 0.2s, opacity 0.3s",
                  letterSpacing:
                    sizeIndex === 0
                      ? "-1.5px"
                      : sizeIndex === 1
                        ? "-0.5px"
                        : "0",
                  position: "relative",
                  willChange: "transform",
                }}
              >
                {skill.name}
                {/* Dot separator between skills */}
                <span
                  style={{
                    display: "inline-block",
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.12)",
                    marginLeft: "clamp(8px,1.5vw,20px)",
                    verticalAlign: "middle",
                    position: "relative",
                    top: "-2px",
                  }}
                />
              </motion.span>
            );
          })}
        </div>

        {/* Subtle gradient fade at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "80px",
            background: "linear-gradient(to bottom, transparent, var(--bg))",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Bottom legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={wallInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8, duration: 0.5 }}
        style={{
          marginTop: "40px",
          display: "flex",
          gap: "24px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: cat.color,
              }}
            />
            <span
              style={{
                fontSize: "11px",
                color: "var(--text-muted)",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              {cat.label}
            </span>
            <span
              style={{
                fontSize: "11px",
                color: "var(--text-muted)",
                opacity: 0.5,
              }}
            >
              {cat.skills.length} techs
            </span>
          </div>
        ))}
        <span
          style={{
            fontSize: "11px",
            color: "var(--text-muted)",
            marginLeft: "auto",
            fontStyle: "italic",
          }}
        >
          hover to highlight · filter by category above
        </span>
      </motion.div>
    </section>
  );
}

function hexRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}
