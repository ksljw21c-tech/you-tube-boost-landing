"use client"

import { motion } from "framer-motion"

const RecommendedVideoCard = ({ title, percentage, index }: { title: string; percentage: number; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className="flex-shrink-0 w-48"
    >
      <div className="rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 aspect-video relative overflow-hidden mb-3">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs font-semibold text-white">
          추천도 {percentage}%
        </div>
      </div>
      <p className="font-semibold text-white text-sm line-clamp-2">{title}</p>
    </motion.div>
  )
}

export default function RecommendedVideosSection() {
  const videos = [
    { title: "유튜브 알고리즘 이해하기 - 10분 안에 배우기", percentage: 89 },
    { title: "구독자 3만명까지의 여정, 내가 했던 실수들", percentage: 76 },
    { title: "댓글로 배우는 시청자 심리 분석법", percentage: 85 },
    { title: "한 달에 10만 신규 구독자 확보 전략", percentage: 92 },
    { title: "콘텐츠 기획 - 매달 20개 아이디어 얻는 법", percentage: 78 },
    { title: "영상 썸네일이 조회수를 50% 좌우한다", percentage: 81 },
  ]

  return (
    <section className="py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-sm text-purple-400 uppercase tracking-widest mb-4"
          >
            추천 영상
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-balance"
          >
            당신을 위한 영상 추천
          </motion.h2>
        </div>

        <div className="overflow-x-auto pb-4 -mx-4 px-4">
          <div className="flex gap-6 min-w-min">
            {videos.map((video, index) => (
              <RecommendedVideoCard key={index} title={video.title} percentage={video.percentage} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
