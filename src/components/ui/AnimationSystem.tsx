import { ReactNode, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useAnimation, useInView } from 'framer-motion'

// Animation variants for different components
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

export const fadeInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 }
}

export const fadeInRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 }
}

export const slideInFromTop = {
  initial: { opacity: 0, y: -50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 }
}

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Hover animations
export const hoverScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 }
}

export const hoverLift = {
  whileHover: { y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" },
  whileTap: { y: 0 }
}

export const hoverGlow = {
  whileHover: { 
    boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
    borderColor: "rgba(59, 130, 246, 0.5)"
  }
}

// Loading animations
export const pulse = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

export const spin = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  }
}

// Page transition animations
export const pageTransition = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.3, ease: "easeInOut" }
}

// Component for animated cards
interface AnimatedCardProps {
  children: ReactNode
  delay?: number
  className?: string
  hover?: boolean
  onClick?: () => void
}

export const AnimatedCard = ({ 
  children, 
  delay = 0, 
  className = "", 
  hover = true,
  onClick 
}: AnimatedCardProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("animate")
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={controls}
      variants={fadeInUp}
      transition={{ delay, duration: 0.5 }}
      whileHover={hover ? hoverLift : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}

// Component for animated buttons
interface AnimatedButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
}

export const AnimatedButton = ({ 
  children, 
  variant = 'primary',
  size = 'md',
  className = "",
  onClick,
  disabled = false,
  loading = false
}: AnimatedButtonProps) => {
  const [isPressed, setIsPressed] = useState(false)

  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
    success: 'bg-green-600 hover:bg-green-700 text-white',
    warning: 'bg-orange-600 hover:bg-orange-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white'
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }

  return (
    <motion.button
      className={`${variants[variant]} ${sizes[size]} ${className} rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onTapStart={() => setIsPressed(true)}
    >
      <motion.div
        animate={loading ? { rotate: 360 } : {}}
        className="flex items-center justify-center space-x-2"
      >
        {loading && (
          <motion.div
            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" as any }}
          />
        )}
        <span>{children}</span>
      </motion.div>
    </motion.button>
  )
}

// Component for animated lists
interface AnimatedListProps {
  children: ReactNode[]
  className?: string
}

export const AnimatedList = ({ children, className = "" }: AnimatedListProps) => {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          variants={fadeInUp}
          transition={{ delay: index * 0.1 }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

// Component for animated modals
interface AnimatedModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  className?: string
}

export const AnimatedModal = ({ 
  isOpen, 
  onClose, 
  children, 
  className = "" 
}: AnimatedModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Component for animated progress bars
interface AnimatedProgressProps {
  value: number
  max?: number
  className?: string
  showPercentage?: boolean
  color?: 'blue' | 'green' | 'orange' | 'red'
}

export const AnimatedProgress = ({ 
  value, 
  max = 100, 
  className = "",
  showPercentage = true,
  color = 'blue'
}: AnimatedProgressProps) => {
  const percentage = (value / max) * 100

  const colors = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    orange: 'bg-orange-600',
    red: 'bg-red-600'
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">Progress</span>
        {showPercentage && (
          <span className="text-sm text-gray-500">{Math.round(percentage)}%</span>
        )}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <motion.div
          className={`h-2 rounded-full ${colors[color]}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}

// Component for animated notifications
interface AnimatedNotificationProps {
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  onClose?: () => void
}

export const AnimatedNotification = ({ 
  message, 
  type = 'info',
  duration = 5000,
  onClose 
}: AnimatedNotificationProps) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onClose?.()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const colors = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-orange-50 border-orange-200 text-orange-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed top-4 right-4 p-4 rounded-lg border-2 ${colors[type]} shadow-lg z-50`}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          <div className="flex items-center space-x-3">
            <span className="font-medium">{message}</span>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Hook for scroll-triggered animations
export const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("animate")
    }
  }, [isInView, controls])

  return { ref, controls, isInView }
}

// Hook for hover animations
export const useHoverAnimation = () => {
  const [isHovered, setIsHovered] = useState(false)
  const controls = useAnimation()

  const handleMouseEnter = () => {
    setIsHovered(true)
    controls.start("hover")
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    controls.start("initial")
  }

  return {
    isHovered,
    controls,
    handleMouseEnter,
    handleMouseLeave
  }
}

export default {
  AnimatedCard,
  AnimatedButton,
  AnimatedList,
  AnimatedModal,
  AnimatedProgress,
  AnimatedNotification,
  useScrollAnimation,
  useHoverAnimation,
  variants: {
    fadeInUp,
    fadeInLeft,
    fadeInRight,
    scaleIn,
    slideInFromTop,
    staggerContainer,
    hoverScale,
    hoverLift,
    hoverGlow,
    pulse,
    spin,
    pageTransition
  }
}
