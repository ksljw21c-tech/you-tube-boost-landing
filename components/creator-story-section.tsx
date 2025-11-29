"use client"

import { motion } from "framer-motion"

interface CreatorStorySectionProps {
  onCtaClick: () => void
}

export default function CreatorStorySection({ onCtaClick }: CreatorStorySectionProps) {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black to-slate-950">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image/Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="w-64 h-64 rounded-2xl bg-gradient-to-br from-red-600 via-purple-600 to-cyan-600 p-1">
              <div className="w-full h-full bg-black rounded-2xl flex items-center justify-center">
                <span className="text-6xl">🎬</span>
              </div>
            </div>
          </motion.div>

          {/* Story Content */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl font-bold mb-6 text-balance">이 채널은 이렇게 시작됐어요</h2>

            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              처음엔 그저 취미였던 영상 제작. 하지만 매 영상마다 받는 따뜻한 댓글들이 우리를 계속 나아가게 했습니다.
              지금 우리는 함께 성장하고 있으며, 여러분의 피드백이 가장 큰 자산입니다. 앞으로도 최고의 콘텐츠로
              보답하겠습니다.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCtaClick}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all"
            >
              무료 요약하기
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
