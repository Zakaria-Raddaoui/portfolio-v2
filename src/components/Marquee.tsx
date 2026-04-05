const ITEMS = [
  'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion',
  'Node.js', 'PHP', 'Moodle', 'Docker', 'Python', 'Java', "C", "C++",
  'Spring Boot', 'MySQL', 'PostgreSQL', 'Git', 'Figma', 'Vite',
]

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <div className="marquee-track">
      <div className="marquee-inner">
        {doubled.map((item, i) => (
          <span key={i} className="marquee-item">
            {item}
            <span className="marquee-dot" />
          </span>
        ))}
      </div>
    </div>
  )
}
