"use client"

import { ReactElement, useEffect, useState, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"

interface AnimatedListProps {
  className?: string
  children: ReactElement[]
  delay?: number
}

export const AnimatedList = ({ className, children, delay = 1000 }: AnimatedListProps) => {
  const [messages, setMessages] = useState<ReactElement[]>([])

  useEffect(() => {
    const showMessages = () => {
      setMessages([])
      children.forEach((item, index) => {
        setTimeout(() => {
          setMessages((prev) => [...prev, item])
        }, index * delay)
      })
    }

    showMessages()
  }, [children, delay])

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <AnimatePresence>
        {messages.map((item) => (
          <motion.div
            key={item.key}
            layout
            initial={{ opacity: 0, scale: 0.8, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.8, y: -20, filter: "blur(10px)" }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
          >
            {item}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

interface AnimatedFAQProps {
  className?: string
  children: ReactElement[]
  delay?: number
}

export const AnimatedFAQ = ({ className, children, delay = 200 }: AnimatedFAQProps) => {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const [hasAnimated, setHasAnimated] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            // 逐个显示 FAQ 项目
            children.forEach((_, index) => {
              setTimeout(() => {
                setVisibleItems((prev) => [...prev, index])
              }, index * delay)
            })
          }
        })
      },
      {
        threshold: 0.1
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [children, delay, hasAnimated])

  return (
    <div ref={containerRef} className={className}>
      {children.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={
            visibleItems.includes(index)
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 30, scale: 0.95 }
          }
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: 0,
          }}
        >
          {item}
        </motion.div>
      ))}
    </div>
  )
} 