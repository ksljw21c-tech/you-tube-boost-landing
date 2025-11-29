"use server"

import { createNotionPage } from "@/lib/notion"

export async function submitWaitlistForm(name: string, email: string, phone: string, channelName: string, channelDescription: string) {
  try {
    // 입력값 검증
    if (!name || !email || !phone || !channelName || !channelDescription) {
      return {
        success: false,
        error: "모든 항목을 입력해주세요.",
      }
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: "올바른 이메일 형식을 입력해주세요.",
      }
    }

    // Notion API를 통해 데이터 저장
    await createNotionPage(name, email, phone, channelName, channelDescription)

    return {
      success: true,
      message: "등록이 완료되었습니다.",
    }
  } catch (error) {
    console.error("Waitlist 제출 오류:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    }
  }
}

