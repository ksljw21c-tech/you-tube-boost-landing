"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface VideoProps {
  id: number
  title: string
  views: string
}

const VideoThumbnail = ({ title, views }: VideoProps) => {
  const [showPlayButton, setShowPlayButton] = useState(false)

  return (
    <motion.div
      onHoverStart={() => setShowPlayButton(true)}
      onHoverEnd={() => setShowPlayButton(false)}
      className="relative cursor-pointer group"
    >
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-red-600 to-purple-600 aspect-video">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

        {showPlayButton && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <div className="w-0 h-0 border-l-8 border-l-white border-t-5 border-t-transparent border-b-5 border-b-transparent ml-1" />
            </div>
          </motion.div>
        )}
      </div>

      <div className="mt-3">
        <p className="font-semibold text-white line-clamp-2">{title}</p>
        <p className="text-sm text-gray-400 mt-1">{views}</p>
      </div>
    </motion.div>
  )
}

export default function PopularVideosSection() {
  const videos = [
    { id: 1, title: "채널 성장의 비결 - 1년 만에 100만 구독자 달성하기", views: "234만 조회" },
    { id: 2, title: "콘텐츠 제작 노하우 - 프로처럼 영상 편집하는 방법", views: "156만 조회" },
    { id: 3, title: "수익화 전략 공개 - 월 천만원 버는 방법", views: "89만 조회" },
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black to-slate-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-sm text-cyan-400 uppercase tracking-widest mb-4"
          >
            인기 영상
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-balance"
          >
            지금 가장 많이 본 영상
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <VideoThumbnail {...video} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-8 p-4 bg-slate-800/50 rounded-lg border border-slate-700"
        >
          <p className="text-sm text-gray-400">📺 데모 화면입니다. 실제 재생은 지원되지 않습니다.</p>
        </motion.div>
      </div>
    </section>
  )
}
