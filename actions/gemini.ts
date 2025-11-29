"use server"

import { GoogleGenerativeAI } from "@google/generative-ai"

const GEMINI_API_KEY = process.env.GEMINI_API_KEY

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY 환경 변수가 설정되지 않았습니다.")
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)

interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

export async function sendChatMessage(messages: ChatMessage[], userMessage: string) {
  try {
    if (!userMessage.trim()) {
      return {
        success: false,
        error: "메시지를 입력해주세요.",
      }
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

    // 초기 assistant 메시지를 제외하고 실제 대화 메시지만 필터링
    // 첫 번째 메시지가 assistant인 경우 제외 (초기 인사말)
    const actualMessages = messages.filter((msg, index) => {
      if (index === 0 && msg.role === "assistant") {
        return false
      }
      return true
    })

    const chatHistory = actualMessages.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }))

    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    })

    const result = await chat.sendMessage(userMessage)
    const response = await result.response
    const text = response.text()

    return {
      success: true,
      message: text,
    }
  } catch (error) {
    console.error("Gemini API 오류:", error)
    
    // 할당량 초과 에러 처리
    if (error instanceof Error) {
      const errorMessage = error.message
      if (errorMessage.includes("429") || errorMessage.includes("quota") || errorMessage.includes("Quota exceeded")) {
        return {
          success: false,
          error: "현재 API 사용량이 초과되었습니다. 잠시 후 다시 시도해주세요. (약 1분 후)",
        }
      }
      if (errorMessage.includes("rate-limit") || errorMessage.includes("rate limit")) {
        return {
          success: false,
          error: "요청이 너무 빠릅니다. 잠시 후 다시 시도해주세요.",
        }
      }
      return {
        success: false,
        error: error.message || "챗봇 응답 생성 중 오류가 발생했습니다.",
      }
    }
    
    return {
      success: false,
      error: "챗봇 응답 생성 중 오류가 발생했습니다.",
    }
  }
}

