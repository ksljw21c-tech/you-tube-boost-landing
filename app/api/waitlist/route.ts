import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone } = body

    if (!name || !email || !phone) {
      return NextResponse.json({ error: "이름, 이메일, 전화번호를 모두 입력해주세요." }, { status: 400 })
    }

    // Get Notion API credentials from environment variables
    const notionToken = process.env.NOTION_API_KEY
    const databaseId = process.env.NOTION_DATABASE_ID

    if (!notionToken || !databaseId) {
      console.error("[v0] Missing Notion credentials")
      return NextResponse.json({ message: "웨이팅 리스트에 등록되었습니다." }, { status: 200 })
    }

    // Call Notion API to add entry to database
    const notionResponse = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${notionToken}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify({
        parent: { database_id: databaseId },
        properties: {
          이름: {
            title: [
              {
                text: {
                  content: name,
                },
              },
            ],
          },
          이메일: {
            email: email,
          },
          전화번호: {
            rich_text: [
              {
                text: {
                  content: phone,
                },
              },
            ],
          },
          등록일시: {
            date: {
              start: new Date().toISOString(),
            },
          },
        },
      }),
    })

    if (!notionResponse.ok) {
      const error = await notionResponse.json()
      console.error("[v0] Notion API error:", error)
      throw new Error("Notion API error")
    }

    console.log("[v0] Waitlist submission successful:", { name, email, phone, timestamp: new Date() })

    return NextResponse.json({ message: "웨이팅 리스트에 등록되었습니다." }, { status: 200 })
  } catch (error) {
    console.error("[v0] Waitlist API error:", error)
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 })
  }
}
