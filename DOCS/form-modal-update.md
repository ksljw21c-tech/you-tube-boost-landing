# 폼 모달 업데이트 작업 문서

## 작업 일시
2025년 1월

## 작업 목적
이름, 이메일, 전화번호를 입력받는 폼을 만들고, "무료 요약하기" CTA 버튼 클릭 시 모달 팝업으로 표시되도록 구현

## 작업 내용

### 1. WaitlistModal 컴포넌트 업데이트

#### 전화번호 필드 추가
**변경 전:**
```typescript
const [formData, setFormData] = useState({ name: "", email: "" })
```

**변경 후:**
```typescript
const [formData, setFormData] = useState({ name: "", email: "", phone: "" })
```

#### 전화번호 입력 필드 추가
```tsx
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
```

#### 모달 제목 및 설명 변경
**변경 전:**
- 제목: "구독 웨이팅 리스트"
- 설명: "출시되면 가장 먼저 알려드리겠습니다."
- 버튼: "등록하기"

**변경 후:**
- 제목: "무료 요약하기"
- 설명: "정보를 입력하시면 빠르게 연락드리겠습니다."
- 버튼: "무료 요약하기"

#### 성공 메시지 변경
**변경 전:**
- "웨이팅 리스트 등록 완료! 출시되면 가장 먼저 알려드리겠습니다."

**변경 후:**
- "입력해주신 정보로 빠르게 연락드리겠습니다."

### 2. API 라우트 업데이트 (`app/api/waitlist/route.ts`)

#### 전화번호 필드 처리 추가
**변경 전:**
```typescript
const { name, email } = body

if (!name || !email) {
  return NextResponse.json({ error: "이름과 이메일을 입력해주세요." }, { status: 400 })
}
```

**변경 후:**
```typescript
const { name, email, phone } = body

if (!name || !email || !phone) {
  return NextResponse.json({ error: "이름, 이메일, 전화번호를 모두 입력해주세요." }, { status: 400 })
}
```

#### Notion API에 전화번호 필드 추가
```typescript
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
}
```

### 3. CTA 버튼 텍스트 변경

#### HeroSection 컴포넌트
**변경 전:**
```tsx
지금 구독하고 부스트 받기
```

**변경 후:**
```tsx
무료 요약하기
```

#### CreatorStorySection 컴포넌트
**변경 전:**
```tsx
구독 웨이팅 리스트 등록하기
```

**변경 후:**
```tsx
무료 요약하기
```

## 수정된 파일

1. **`components/waitlist-modal.tsx`**
   - 전화번호 필드 추가
   - 모달 제목 및 설명 변경
   - 버튼 텍스트 변경
   - 성공 메시지 변경

2. **`app/api/waitlist/route.ts`**
   - 전화번호 필드 검증 추가
   - Notion API에 전화번호 필드 추가

3. **`components/hero-section.tsx`**
   - CTA 버튼 텍스트를 "무료 요약하기"로 변경

4. **`components/creator-story-section.tsx`**
   - CTA 버튼 텍스트를 "무료 요약하기"로 변경

## 기능 설명

### 폼 필드
1. **이름** (필수)
   - 텍스트 입력 필드
   - 필수 입력 항목

2. **이메일** (필수)
   - 이메일 형식 입력 필드
   - 필수 입력 항목

3. **전화번호** (필수)
   - 전화번호 입력 필드 (`type="tel"`)
   - 예시 플레이스홀더: "010-1234-5678"
   - 필수 입력 항목

### 모달 동작
1. **열기**: CTA 버튼("무료 요약하기") 클릭 시 모달 표시
2. **제출**: 폼 제출 시 API를 통해 Notion 데이터베이스에 저장
3. **성공**: 제출 성공 시 성공 메시지 표시 후 2초 뒤 자동으로 모달 닫기
4. **에러**: 에러 발생 시 에러 메시지 표시 및 재시도 버튼 제공
5. **닫기**: 배경 클릭 또는 X 버튼으로 모달 닫기

### CTA 버튼 위치
1. **HeroSection**: 메인 히어로 섹션의 CTA 버튼
2. **CreatorStorySection**: 크리에이터 스토리 섹션의 CTA 버튼

## Notion 데이터베이스 설정

Notion 데이터베이스에 다음 필드가 필요합니다:

1. **이름** (Title 타입)
2. **이메일** (Email 타입)
3. **전화번호** (Rich Text 타입) - 새로 추가 필요
4. **등록일시** (Date 타입)

## 사용자 경험 개선 사항

1. **명확한 목적**: "무료 요약하기"라는 명확한 CTA로 사용자 행동 유도
2. **필수 정보 수집**: 이름, 이메일, 전화번호로 연락 가능한 정보 확보
3. **즉각적인 피드백**: 제출 성공/실패에 대한 명확한 피드백 제공
4. **사용자 친화적**: 플레이스홀더와 예시로 입력 가이드 제공

## 다음 단계 (선택사항)

1. 전화번호 형식 검증 추가 (예: 010-1234-5678 형식)
2. 이메일 중복 체크 기능 추가
3. 제출 전 입력값 유효성 검사 강화
4. 로딩 상태 개선 (스피너 등)
5. Notion 데이터베이스에 전화번호 필드 추가 확인

