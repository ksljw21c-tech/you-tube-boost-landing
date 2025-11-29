"use client"

import { motion } from "framer-motion"

export default function Footer() {
  const socialIcons = [
    { icon: "▶️", label: "YouTube" },
    { icon: "📷", label: "Instagram" },
    { icon: "𝕏", label: "Twitter" },
    { icon: "💬", label: "Threads" },
  ]

  return (
    <footer className="py-16 px-4 bg-gradient-to-t from-slate-950 to-black border-t border-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <h3 className="text-2xl font-bold mb-2">YouTube Boost</h3>
            <p className="text-gray-400">#YouTubeBoost #채널성장프로젝트</p>
          </motion.div>

          <div className="flex gap-6">
            {socialIcons.map((item, index) => (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.2 }}
                className="w-12 h-12 rounded-full border border-slate-700 hover:border-red-600 flex items-center justify-center text-xl transition-colors hover:text-red-600"
                title={item.label}
              >
                {item.icon}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8">
          <p className="text-center text-sm text-gray-500">© 2025 YouTube Boost. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
