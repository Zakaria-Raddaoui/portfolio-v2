import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Use transform instead of left/top — avoids layout, only triggers composite
    const move = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x - 3}px, ${y - 3}px)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${x - 200}px, ${y - 200}px)`;
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      {/* Large soft glow — no transitions, no blend modes, pure composite */}
      <div
        ref={glowRef}
        style={{
          pointerEvents: "none",
          position: "fixed",
          top: 0,
          left: 0,
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,255,71,0.05) 0%, transparent 70%)",
          willChange: "transform",
          zIndex: 1,
          transform: "translate(-999px,-999px)",
        }}
      />

      {/* Sharp dot — no blend mode */}
      <div
        ref={dotRef}
        style={{
          pointerEvents: "none",
          position: "fixed",
          top: 0,
          left: 0,
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "var(--accent)",
          willChange: "transform",
          zIndex: 9998,
          transform: "translate(-999px,-999px)",
          opacity: 0.8,
        }}
      />
    </>
  );
}
