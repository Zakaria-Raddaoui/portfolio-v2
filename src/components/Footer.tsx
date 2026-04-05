import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      style={{
        padding: "28px clamp(24px, 5vw, 80px)",
        borderTop: "1px solid var(--border)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "12px",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "16px",
          color: "rgba(255,255,255,0.25)",
        }}
      >
        ZR<span style={{ color: "rgba(201,255,71,0.45)" }}>.</span>
      </div>

      <p
        style={{
          fontSize: "12px",
          color: "var(--text-muted)",
          letterSpacing: "0.3px",
        }}
      >
        Copyright © 2026 Zakariya Raddaoui
      </p>

      <p
        style={{
          fontSize: "12px",
          color: "var(--text-muted)",
          letterSpacing: "0.3px",
        }}
      >
        Monastir, Tunisia
      </p>
    </motion.footer>
  );
}
