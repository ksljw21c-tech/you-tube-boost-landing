"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useRef, useEffect, type FormEvent } from "react"
import { MessageCircle, X, Send, Loader2 } from "lucide-react"
import { sendChatMessage } from "@/actions/gemini"

interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "안녕하세요! YouTube Boost 채널에 대해 궁금한 점이 있으시면 언제든지 물어보세요. 😊",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!inputMessage.trim() || isLoading) return

    const userMessage = inputMessage.trim()
    setInputMessage("")
    setIsLoading(true)

    const newUserMessage: ChatMessage = {
      role: "user",
      content: userMessage,
    }

    setMessages((prev) => [...prev, newUserMessage])

    try {
      const result = await sendChatMessage(messages, userMessage)

      if (result.success && result.message) {
        const assistantMessage: ChatMessage = {
          role: "assistant",
          content: result.message,
        }
        setMessages((prev) => [...prev, assistantMessage])
      } else {
        const errorMessage: ChatMessage = {
          role: "assistant",
          content: result.error || "죄송합니다. 응답을 생성하는 중 오류가 발생했습니다.",
        }
        setMessages((prev) => [...prev, errorMessage])
      }
    } catch (error) {
      const errorMessage: ChatMessage = {
        role: "assistant",
        content: "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
        aria-label="챗봇 열기"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-40 w-96 h-[600px] bg-gradient-to-br from-slate-900 to-black border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="bg-slate-800 border-b border-slate-700 px-4 py-3 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">YouTube Boost 챗봇</h3>
                <p className="text-xs text-gray-400">Gemini AI로 답변드립니다</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="챗봇 닫기"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.role === "user"
                        ? "bg-red-600 text-white"
                        : "bg-slate-800 text-gray-100 border border-slate-700"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-slate-800 text-gray-100 border border-slate-700 rounded-2xl px-4 py-2">
                    <Loader2 size={16} className="animate-spin" />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="border-t border-slate-700 p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="메시지를 입력하세요..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 disabled:opacity-50"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isLoading || !inputMessage.trim()}
                  className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white p-2 rounded-lg transition-colors"
                  aria-label="메시지 전송"
                >
                  {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

