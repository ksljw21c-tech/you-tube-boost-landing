// Notion API 설정 및 클라이언트

const NOTION_API_KEY = process.env.NOTION_API_KEY
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID

if (!NOTION_API_KEY) {
  throw new Error("NOTION_API_KEY 환경 변수가 설정되지 않았습니다.")
}

if (!NOTION_DATABASE_ID) {
  throw new Error("NOTION_DATABASE_ID 환경 변수가 설정되지 않았습니다.")
}

export const notionConfig = {
  apiKey: NOTION_API_KEY,
  databaseId: NOTION_DATABASE_ID,
  apiVersion: "2022-06-28",
  apiUrl: "https://api.notion.com/v1",
}

export async function createNotionPage(name: string, email: string, phone: string, channelName: string, channelDescription: string) {
  const response = await fetch(`${notionConfig.apiUrl}/pages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${notionConfig.apiKey}`,
      "Content-Type": "application/json",
      "Notion-Version": notionConfig.apiVersion,
    },
    body: JSON.stringify({
      parent: { database_id: notionConfig.databaseId },
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
          phone_number: phone,
        },
        채널이름: {
          rich_text: [
            {
              text: {
                content: channelName,
              },
            },
          ],
        },
        채널소개: {
          rich_text: [
            {
              text: {
                content: channelDescription,
              },
            },
          ],
        },
      },
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Notion API 오류: ${JSON.stringify(error)}`)
  }

  return await response.json()
}

