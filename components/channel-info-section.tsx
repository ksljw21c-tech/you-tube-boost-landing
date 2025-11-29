"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface CardProps {
  title: string
  description: string
  icon: string
}

const InfoCard = ({ title, description, icon }: CardProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div onHoverStart={() => setIsHovered(true)} onHoverEnd={() => setIsHovered(false)} className="relative">
      <div
        className="p-8 rounded-lg bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 cursor-pointer transition-all duration-300"
        style={{
          transform: isHovered ? "scale(1.05)" : "scale(1)",
        }}
      >
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
        <p className="text-sm text-gray-400 line-clamp-3">{description}</p>
      </div>

      {/* Blur background effect on hover */}
      {isHovered && (
        <motion.div
          layoutId="hoverBackground"
          className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg blur-xl -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </motion.div>
  )
}

export default function ChannelInfoSection() {
  return (
    <section className="py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-sm text-cyan-400 uppercase tracking-widest mb-4"
          >
            채널 핵심 소개
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-balance"
          >
            왜 이 채널을 구독해야 할까?
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon="🎯"
            title="핵심 주제 및 차별점"
            description="우리는 실전적인 콘텐츠로 당신의 성장을 돕고, 다른 채널과는 다른 독특한 관점으로 가치를 전달합니다."
          />
          <InfoCard
            icon="🔥"
            title="인기 콘텐츠 카테고리"
            description="매주 새로운 트렌드와 실용적인 팁을 공유하며, 시청자분들의 의견을 반영한 콘텐츠를 제작합니다."
          />
          <InfoCard
            icon="📈"
            title="채널 성장 스토리"
            description="작은 시작에서 시작했지만, 지금은 수십만 명의 구독자와 함께 성장하고 있는 우리의 여정을 함께 하세요."
          />
        </div>
      </div>
    </section>
  )
}
