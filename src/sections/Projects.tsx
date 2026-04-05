import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PROJECTS } from "../data";

const FALLBACK_GRADIENTS: Record<string, string> = {
  Skilevo: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
  DevTrack: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
  Rayacomint: "linear-gradient(135deg, #1b2838, #2a475e, #1b4f72)",
  Pexelicons: "linear-gradient(135deg, #1a0533, #2d0a5e, #1a0533)",
  Labyrinthe: "linear-gradient(135deg, #0d1117, #0d4a2f)",
  "QR Generator": "linear-gradient(135deg, #111, #2a2a1a)",
};

type Project = (typeof PROJECTS)[0] & { collab?: boolean };

function TreeCard({
  project,
  side,
}: {
  project: Project;
  side: "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const fallback =
    FALLBACK_GRADIENTS[project.title] || "linear-gradient(135deg,#111,#222)";
  const imgSrc = `/projects/${project.title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")}.png`;

  const cardSide = side;
  const descSide = side === "left" ? "right" : "left";

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 56px 1fr",
        marginBottom: "80px",
        alignItems: "center",
      }}
    >
      {/* Left column: card or description */}
      <div
        style={{
          gridColumn: 1,
          display: "flex",
          justifyContent: "flex-end",
          paddingRight: "28px",
        }}
      >
        {cardSide === "left" ? (
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: "100%" }}
          >
            <CardImage project={project} fallback={fallback} imgSrc={imgSrc} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.1,
            }}
            style={{ width: "100%", textAlign: "right" }}
          >
            <CardDesc project={project} align="right" />
          </motion.div>
        )}
      </div>

      {/* Center column: spine dot + arms */}
      <div
        style={{
          gridColumn: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          height: "100%",
        }}
      >
        {/* Dot */}
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: "var(--accent)",
            flexShrink: 0,
            zIndex: 2,
            position: "relative",
          }}
        />
        {/* Left arm */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            width: "50%",
            height: "1px",
            background: "rgba(201,255,71,0.25)",
            transform: "translateY(-50%)",
          }}
        />
        {/* Right arm */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: 0,
            width: "50%",
            height: "1px",
            background: "rgba(201,255,71,0.25)",
            transform: "translateY(-50%)",
          }}
        />
      </div>

      {/* Right column: card or description */}
      <div
        style={{
          gridColumn: 3,
          display: "flex",
          justifyContent: "flex-start",
          paddingLeft: "28px",
        }}
      >
        {descSide === "right" ? (
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.1,
            }}
            style={{ width: "100%" }}
          >
            <CardDesc project={project} align="left" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: "100%" }}
          >
            <CardImage project={project} fallback={fallback} imgSrc={imgSrc} />
          </motion.div>
        )}
      </div>
    </div>
  );
}

function CardImage({
  project,
  fallback,
  imgSrc,
}: {
  project: Project;
  fallback: string;
  imgSrc: string;
}) {
  return (
    <a
      href={project.live || project.github || "#"}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "block",
        textDecoration: "none",
        borderRadius: "10px",
        overflow: "hidden",
        position: "relative",
        aspectRatio: "4/3",
        background: fallback,
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        const overlay = e.currentTarget.querySelector(".po") as HTMLElement;
        const info = e.currentTarget.querySelector(".pi") as HTMLElement;
        const img = e.currentTarget.querySelector(".pimg") as HTMLElement;
        if (overlay) overlay.style.opacity = "1";
        if (info) {
          info.style.opacity = "1";
          info.style.transform = "translateY(0)";
        }
        if (img) img.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        const overlay = e.currentTarget.querySelector(".po") as HTMLElement;
        const info = e.currentTarget.querySelector(".pi") as HTMLElement;
        const img = e.currentTarget.querySelector(".pimg") as HTMLElement;
        if (overlay) overlay.style.opacity = "0";
        if (info) {
          info.style.opacity = "0";
          info.style.transform = "translateY(16px)";
        }
        if (img) img.style.transform = "scale(1)";
      }}
    >
      {/* Image — will-change only on the image div, not the overlay */}
      <div
        className="pimg"
        style={{
          position: "absolute",
          inset: 0,
          background: fallback,
          transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
          willChange: "transform",
        }}
      >
        <img
          src={imgSrc}
          alt={project.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top",
            display: "block",
          }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      </div>

      {/* Static vignette — no hover change, no repaint */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 45%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Badges */}
      <div
        style={{
          position: "absolute",
          top: "12px",
          left: "14px",
          display: "flex",
          gap: "6px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "2px",
            color: "rgba(255,255,255,0.28)",
          }}
        >
          {project.num}
        </span>
        {project.featured && (
          <span
            style={{
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              background: "var(--accent)",
              color: "#0a0a0a",
              padding: "2px 8px",
              borderRadius: "2px",
            }}
          >
            Featured
          </span>
        )}
        {project.collab && (
          <span
            style={{
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              background: "rgba(120,100,255,0.18)",
              border: "1px solid rgba(140,120,255,0.3)",
              color: "#c0b0ff",
              padding: "2px 8px",
              borderRadius: "2px",
            }}
          >
            Collab
          </span>
        )}
      </div>

      {/* Title — always at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: "12px",
          left: "14px",
          right: "14px",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "14px",
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "-0.3px",
          }}
        >
          {project.title}
        </p>
      </div>

      {/* Hover overlay — NO backdropFilter */}
      <div
        className="po"
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(6,6,6,0.82)",
          opacity: 0,
          transition: "opacity 0.25s ease",
        }}
      />

      {/* Hover info panel */}
      <div
        className="pi"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "20px 16px",
          opacity: 0,
          transform: "translateY(16px)",
          transition:
            "opacity 0.25s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "8px",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "16px",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.4px",
            }}
          >
            {project.title}
          </h3>
          <span
            style={{
              color: "var(--accent)",
              fontSize: "16px",
              flexShrink: 0,
              marginLeft: "8px",
            }}
          >
            ↗
          </span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
          {project.tags.slice(0, 4).map((t) => (
            <span
              key={t}
              style={{
                fontSize: "10px",
                padding: "2px 8px",
                borderRadius: "2px",
                background: "rgba(201,255,71,0.1)",
                border: "1px solid rgba(201,255,71,0.18)",
                color: "var(--accent)",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}

function CardDesc({
  project,
  align,
}: {
  project: Project;
  align: "left" | "right";
}) {
  return (
    <div style={{ textAlign: align }}>
      {/* Number */}
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "3px",
          color: "var(--accent)",
          marginBottom: "10px",
          opacity: 0.7,
        }}
      >
        {project.num}
      </p>

      {/* Title */}
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(16px, 2vw, 22px)",
          fontWeight: 800,
          color: "#fff",
          letterSpacing: "-0.5px",
          marginBottom: "12px",
          lineHeight: 1.1,
        }}
      >
        {project.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: "13px",
          color: "var(--text-secondary)",
          lineHeight: 1.75,
          fontWeight: 300,
          marginBottom: "16px",
          maxWidth: "260px",
          ...(align === "right" ? { marginLeft: "auto" } : {}),
        }}
      >
        {project.desc}
      </p>

      {/* Tags */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "5px",
          justifyContent: align === "right" ? "flex-end" : "flex-start",
        }}
      >
        {project.tags.map((t) => (
          <span
            key={t}
            style={{
              fontSize: "10px",
              padding: "3px 9px",
              borderRadius: "2px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.4)",
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              letterSpacing: "0.3px",
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Links */}
      <div
        style={{
          display: "flex",
          gap: "14px",
          marginTop: "16px",
          justifyContent: align === "right" ? "flex-end" : "flex-start",
        }}
      >
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "11px",
              color: "var(--text-muted)",
              letterSpacing: "1px",
              textTransform: "uppercase",
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-muted)")
            }
          >
            GitHub ↗
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "11px",
              color: "var(--text-muted)",
              letterSpacing: "1px",
              textTransform: "uppercase",
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--accent)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-muted)")
            }
          >
            Live ↗
          </a>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px 0px" });

  return (
    <section
      id="projects"
      style={{
        padding: "clamp(72px, 10vw, 112px) clamp(40px, 6vw, 96px)",
        borderTop: "1px solid var(--border)",
      }}
    >
      {/* Header */}
      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 24 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65 }}
        style={{ marginBottom: "72px" }}
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
          03 — Work
        </p>
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
          Selected Work
        </h2>
      </motion.div>

      {/* Tree */}
      <div
        style={{ position: "relative", maxWidth: "920px", margin: "0 auto" }}
      >
        {/* Spine */}
        <div
          style={{
            position: "absolute",
            left: "calc(50% - 0.5px)",
            top: 0,
            bottom: 0,
            width: "1px",
            background:
              "linear-gradient(to bottom, transparent, rgba(201,255,71,0.18) 8%, rgba(201,255,71,0.18) 92%, transparent)",
          }}
        />

        <div style={{ position: "relative" }}>
          {PROJECTS.map((p, i) => (
            <TreeCard
              key={p.num}
              project={p as Project}
              side={i % 2 === 0 ? "left" : "right"}
            />
          ))}
        </div>
      </div>

      {/* View all */}
      <div style={{ marginTop: "32px", textAlign: "center" }}>
        <a
          href="https://github.com/Zakaria-Raddaoui"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "13px",
            color: "var(--text-secondary)",
            border: "1px solid var(--border)",
            borderRadius: "4px",
            padding: "12px 28px",
            transition: "color 0.2s, border-color 0.2s",
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            letterSpacing: "0.5px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--accent)";
            e.currentTarget.style.borderColor = "rgba(201,255,71,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--text-secondary)";
            e.currentTarget.style.borderColor = "var(--border)";
          }}
        >
          View all on GitHub →
        </a>
      </div>
    </section>
  );
}
