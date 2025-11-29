"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, type FormEvent } from "react"
import { submitWaitlistForm } from "@/actions/notion"

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", channelName: "", channelDescription: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // 서버 액션 호출 (이름, 이메일, 전화번호, 채널이름, 채널소개 전송)
      const result = await submitWaitlistForm(formData.name, formData.email, formData.phone, formData.channelName, formData.channelDescription)

      if (result.success) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", phone: "", channelName: "", channelDescription: "" })
        setTimeout(() => {
          onClose()
          setSubmitStatus("idle")
        }, 2000)
      } else {
        setSubmitStatus("error")
        setErrorMessage(result.error || "오류가 발생했습니다. 잠시 후 다시 시도해주세요.")
      }
    } catch (error) {
      setSubmitStatus("error")
      setErrorMessage("네트워크 오류가 발생했습니다. 다시 시도해주세요.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-gradient-to-br from-slate-900 to-black border border-slate-700 rounded-2xl p-8 max-w-md w-full shadow-2xl">
              {submitStatus === "idle" && (
                <>
                  <h2 className="text-2xl font-bold mb-2">무료 요약하기</h2>
                  <p className="text-gray-400 mb-6">정보를 입력하시면 빠르게 연락드리겠습니다.</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">이름</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="이름을 입력하세요"
                        className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">이메일</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="이메일을 입력하세요"
                        className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">전화번호</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="전화번호를 입력하세요 (예: 010-1234-5678)"
                        className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">채널이름</label>
                      <input
                        type="text"
                        value={formData.channelName}
                        onChange={(e) => setFormData({ ...formData, channelName: e.target.value })}
                        placeholder="채널 이름을 입력하세요"
                        className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">채널소개</label>
                      <textarea
                        value={formData.channelDescription}
                        onChange={(e) => setFormData({ ...formData, channelDescription: e.target.value })}
                        placeholder="채널에 대해 간단히 소개해주세요"
                        rows={4}
                        className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 resize-none"
                        required
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white py-2 rounded-lg font-semibold transition-colors"
                    >
                      {isSubmitting ? "제출 중..." : "무료 요약하기"}
                    </motion.button>
                  </form>
                </>
              )}

              {submitStatus === "success" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                  <div className="text-5xl mb-4">✨</div>
                  <h3 className="text-xl font-bold mb-2">제출 완료!</h3>
                  <p className="text-gray-400">입력해주신 정보로 빠르게 연락드리겠습니다.</p>
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                  <div className="text-5xl mb-4">⚠️</div>
                  <h3 className="text-xl font-bold mb-2">오류 발생</h3>
                  <p className="text-gray-400 mb-4">{errorMessage}</p>
                  <button
                    onClick={() => {
                      setSubmitStatus("idle")
                      setErrorMessage("")
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold"
                  >
                    다시 시도
                  </button>
                </motion.div>
              )}

              {submitStatus === "idle" && (
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
