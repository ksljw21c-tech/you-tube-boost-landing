"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface HeroSectionProps {
  onCtaClick: () => void
}

export default function HeroSection({ onCtaClick }: HeroSectionProps) {
  const [scale, setScale] = useState(1)

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Video background */}
      <div
        className="absolute inset-0 w-full h-full"
        onMouseMove={(e) => {
          const y = e.clientY / window.innerHeight
          setScale(1 + y * 0.1)
        }}
        onMouseLeave={() => setScale(1)}
      >
        <div
          className="w-full h-full bg-gradient-to-b from-red-600 to-black transition-transform duration-300"
          style={{ transform: `scale(${scale})` }}
        >
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&mute=1"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Overlay - 화려한 그라데이션 효과 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      <motion.div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at center, rgba(220, 38, 38, 0.2) 0%, transparent 50%, rgba(0, 0, 0, 0.5) 100%)",
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      {/* 빛나는 효과 레이어 */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 30%, rgba(220, 38, 38, 0.15) 0%, transparent 60%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-2xl flex flex-col items-center justify-center h-full">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight"
        >
          당신의 구독이 이 채널을 바꿉니다.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-300 mb-8 text-balance"
        >
          더 나은 콘텐츠, 더 빠른 성장. 함께 시작해보세요.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCtaClick}
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors mt-24"
        >
          무료 요약하기
        </motion.button>
      </div>
    </section>
  )
}
