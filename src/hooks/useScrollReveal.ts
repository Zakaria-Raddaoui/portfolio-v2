import { useEffect, useRef } from 'react'
import { useInView, useAnimation } from 'framer-motion'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useScrollReveal(): [React.RefObject<HTMLDivElement | null>, any] {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) controls.start('visible')
  }, [isInView, controls])

  return [ref, controls]
}
