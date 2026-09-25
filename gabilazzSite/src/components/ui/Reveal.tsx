import { motion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'

const variants: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
  }),
}

type Props = {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'li' | 'span' | 'p' | 'h2' | 'h3'
  once?: boolean
}

export function Reveal({ children, delay = 0, className, as = 'div', once = true }: Props) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.2, margin: '0px 0px -10% 0px' }}
      custom={delay}
    >
      {children}
    </Tag>
  )
}
