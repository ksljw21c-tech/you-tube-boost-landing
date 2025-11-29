# 노션 API 서버 액션 구현 작업 문서

## 작업 일시
2025년 1월

## 작업 목적
사용자 입력 폼의 이름, 이메일, 전화번호를 노션 API를 사용하여 노션 데이터베이스에 저장하는 서버 액션 구현

## 작업 내용

### 1. `lib/notion.ts` 파일 생성

노션 API 설정 및 클라이언트 로직을 포함하는 파일입니다.

#### 주요 기능
- 환경 변수에서 `NOTION_API_KEY`와 `NOTION_DATABASE_ID` 읽기
- 노션 API 설정 객체 (`notionConfig`) 정의
- `createNotionPage` 함수: 노션 데이터베이스에 페이지 생성

#### 코드 구조
```typescript
// 환경 변수 검증
const NOTION_API_KEY = process.env.NOTION_API_KEY
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID

// 설정 객체
export const notionConfig = {
  apiKey: NOTION_API_KEY,
  databaseId: NOTION_DATABASE_ID,
  apiVersion: "2022-06-28",
  apiUrl: "https://api.notion.com/v1",
}

// 페이지 생성 함수
export async function createNotionPage(name: string, email: string)
```

#### 저장되는 데이터
- **이름**: Title 타입
- **이메일**: Email 타입
- **전화번호**: Phone Number 타입

### 2. `actions/notion.ts` 파일 생성

서버 액션을 정의하는 파일입니다. 프로젝트 규칙에 따라 노션 API와 연관된 모든 로직을 이 파일에 포함했습니다.

#### 주요 기능
- `submitWaitlistForm` 서버 액션 함수
- 입력값 검증 (이름, 이메일, 전화번호 필수 체크)
- 이메일 형식 검증
- 노션 API 호출 및 에러 처리

#### 코드 구조
```typescript
"use server"

export async function submitWaitlistForm(name: string, email: string, phone: string) {
  // 입력값 검증
  // 이메일 형식 검증
  // Notion API 호출
  // 결과 반환
}
```

#### 반환 형식
```typescript
// 성공 시
{
  success: true,
  message: "등록이 완료되었습니다."
}

// 실패 시
{
  success: false,
  error: "에러 메시지"
}
```

### 3. `components/waitlist-modal.tsx` 수정

기존 API 라우트 호출을 서버 액션 호출로 변경했습니다.

#### 변경 사항

**변경 전:**
```typescript
const response = await fetch("/api/waitlist", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
})
```

**변경 후:**
```typescript
import { submitWaitlistForm } from "@/actions/notion"

const result = await submitWaitlistForm(formData.name, formData.email)
```

#### 주요 변경점
- `fetch` API 대신 서버 액션 사용
- 이름, 이메일, 전화번호 모두 전송
- 서버 액션의 반환값에 따라 성공/실패 처리

## 파일 구조

```
you-tube-boost-landing/
├── lib/
│   └── notion.ts          # 노션 API 설정 및 클라이언트
├── actions/
│   └── notion.ts          # 서버 액션 (노션 API 로직)
└── components/
    └── waitlist-modal.tsx # 폼 컴포넌트 (서버 액션 사용)
```

## 환경 변수 설정

`.env` 파일에 다음 환경 변수가 설정되어 있어야 합니다:

```env
NOTION_API_KEY=your_notion_api_key
NOTION_DATABASE_ID=your_notion_database_id
```

## 노션 데이터베이스 구조

노션 데이터베이스에 다음 속성(필드)이 필요합니다:

1. **이름** (Title 타입)
   - 필수 필드
   - 데이터베이스의 제목 속성

2. **이메일** (Email 타입)
   - 필수 필드
   - 이메일 형식의 데이터

3. **전화번호** (Phone Number 타입)
   - 필수 필드
   - 전화번호 형식의 데이터

## 사용 방법

1. 사용자가 폼에 이름, 이메일, 전화번호 입력
2. "무료 요약하기" 버튼 클릭
3. `submitWaitlistForm` 서버 액션 호출
4. 입력값 검증 수행 (이름, 이메일, 전화번호 필수 체크 및 이메일 형식 검증)
5. 노션 API를 통해 데이터베이스에 저장
6. 성공/실패 메시지 표시

## 에러 처리

### 클라이언트 측 에러
- 이름, 이메일, 전화번호 중 하나 이상 미입력
- 이메일 형식 오류

### 서버 측 에러
- 환경 변수 미설정
- 노션 API 인증 실패
- 노션 데이터베이스 접근 권한 없음
- 네트워크 오류

모든 에러는 사용자에게 친화적인 메시지로 표시됩니다.

## 프로젝트 규칙 준수

✅ **노션 API 설정은 오직 `lib/notion.ts`, `actions/notion.ts` 두 파일에 모든 설정과 로직을 포함**
- `lib/notion.ts`: API 설정 및 클라이언트 함수
- `actions/notion.ts`: 서버 액션 로직

✅ **모든 API 호출은 Next.js의 서버 액션을 활용**
- `submitWaitlistForm` 서버 액션 사용

✅ **노션 API와 연관된 로직도 서버 액션 한 개로만 제한**
- `actions/notion.ts`에 단일 서버 액션 함수만 정의

## 장점

1. **타입 안정성**: TypeScript로 타입 안정성 보장
2. **서버 사이드 실행**: 서버에서 실행되어 API 키 보안 유지
3. **간단한 사용**: 클라이언트에서 함수 호출만 하면 됨
4. **에러 처리**: 통합된 에러 처리 로직
5. **검증**: 입력값 검증이 서버에서 수행됨

## 업데이트 내역

### 2025년 1월 - 전화번호 필드 추가 및 오류 수정
- `lib/notion.ts`: `createNotionPage` 함수에 전화번호 파라미터 추가
- `actions/notion.ts`: `submitWaitlistForm` 함수에 전화번호 파라미터 추가 및 검증 로직 업데이트
- `components/waitlist-modal.tsx`: 서버 액션 호출 시 전화번호도 함께 전송
- **오류 수정**: 전화번호 필드를 Rich Text에서 Phone Number 타입으로 변경
- **오류 수정**: 존재하지 않는 등록일시 필드 제거

## 다음 단계 (선택사항)

1. 전화번호 형식 검증 추가 (예: 010-1234-5678 형식)
2. 추가 필드 검증 로직 강화
3. 중복 이메일 체크 기능 추가
4. 성공/실패 알림 개선 (Toast 등)
5. 로딩 상태 UI 개선
6. 노션 데이터베이스에 추가 필드가 필요한 경우 확장

