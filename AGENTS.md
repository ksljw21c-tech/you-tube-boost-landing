# YouTube Boost Landing - 프로젝트 분석 문서

## 📁 프로젝트 구조

### 전체 폴더 구조
```
you-tube-boost-landing/
├── app/                    # Next.js App Router 디렉토리
│   ├── api/               # API 라우트
│   │   └── waitlist/      # 웨이팅 리스트 API 엔드포인트
│   ├── globals.css        # 전역 스타일
│   ├── layout.tsx         # 루트 레이아웃 컴포넌트
│   └── page.tsx           # 메인 페이지 컴포넌트
├── components/            # React 컴포넌트
│   ├── ui/               # 재사용 가능한 UI 컴포넌트 (shadcn/ui)
│   ├── channel-info-section.tsx
│   ├── creator-story-section.tsx
│   ├── footer.tsx
│   ├── hero-section.tsx
│   ├── popular-videos-section.tsx
│   ├── recommended-videos-section.tsx
│   ├── theme-provider.tsx
│   └── waitlist-modal.tsx
├── hooks/                # 커스텀 React 훅
│   ├── use-mobile.ts
│   └── use-toast.ts
├── lib/                  # 유틸리티 함수
│   └── utils.ts          # 클래스명 병합 유틸리티
├── public/               # 정적 파일
├── styles/               # 추가 스타일 파일
├── package.json          # 프로젝트 의존성 및 스크립트
├── tsconfig.json         # TypeScript 설정
├── next.config.mjs       # Next.js 설정
└── components.json       # shadcn/ui 설정
```

## 🚀 애플리케이션 시작

### 진입점 (Entry Point)

애플리케이션은 Next.js의 App Router 구조를 따릅니다:

1. **루트 레이아웃** (`app/layout.tsx`)
   - 모든 페이지의 최상위 레이아웃
   - 메타데이터 설정 (제목, 설명, 아이콘)
   - Geist 폰트 적용
   - Vercel Analytics 통합
   - 전역 CSS 파일 임포트

2. **메인 페이지** (`app/page.tsx`)
   - 클라이언트 컴포넌트 (`"use client"`)
   - 모달 상태 관리 (`useState`)
   - 다음 섹션들로 구성:
     - HeroSection (히어로 섹션)
     - ChannelInfoSection (채널 정보)
     - PopularVideosSection (인기 영상)
     - RecommendedVideosSection (추천 영상)
     - CreatorStorySection (크리에이터 스토리)
     - Footer (푸터)
     - WaitlistModal (웨이팅 리스트 모달)

### 실행 방법

```bash
# 개발 서버 실행
pnpm dev

# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start

# 린트 검사
pnpm lint
```

## 🔄 상태 관리

### 상태 관리 전략

이 프로젝트는 **복잡한 상태 관리 라이브러리 없이** React의 기본 훅만 사용합니다:

#### 1. 로컬 상태 관리 (useState)

**메인 페이지** (`app/page.tsx`):
```typescript
const [showModal, setShowModal] = useState(false)
```
- 모달 표시/숨김 상태를 관리
- 부모 컴포넌트에서 자식 컴포넌트로 콜백 함수 전달

**웨이팅 리스트 모달** (`components/waitlist-modal.tsx`):
```typescript
const [formData, setFormData] = useState({ name: "", email: "" })
const [isSubmitting, setIsSubmitting] = useState(false)
const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
const [errorMessage, setErrorMessage] = useState("")
```
- 폼 데이터 관리
- 제출 상태 관리
- 에러 메시지 관리

**히어로 섹션** (`components/hero-section.tsx`):
```typescript
const [scale, setScale] = useState(1)
```
- 마우스 호버 효과를 위한 스케일 상태

#### 2. 상태 관리 특징

- ✅ **단순성**: 복잡한 상태 관리 라이브러리(Redux, Zustand 등) 미사용
- ✅ **로컬 상태**: 각 컴포넌트가 필요한 상태를 자체적으로 관리
- ✅ **Props 전달**: 부모-자식 간 상태 공유는 props와 콜백 함수로 처리
- ✅ **최소화**: 프로젝트 규칙에 따라 상태 관리 최소화

### 상태 흐름

```
app/page.tsx (부모)
  ├── showModal 상태 관리
  ├── setShowModal 콜백 전달
  │
  ├── HeroSection
  │   └── onCtaClick() → setShowModal(true)
  │
  ├── CreatorStorySection
  │   └── onCtaClick() → setShowModal(true)
  │
  └── WaitlistModal
      ├── isOpen={showModal}
      └── onClose() → setShowModal(false)
```

## 🎨 스타일링

### Tailwind CSS

- **프레임워크**: Tailwind CSS v4.1.9
- **설정**: `app/globals.css`에서 커스텀 테마 변수 정의
- **컴포넌트 스타일**: 모든 UI 컴포넌트는 Tailwind 클래스로 스타일링
- **다크 테마**: YouTube 브랜드 컬러(빨간색)를 활용한 다크 테마

### 애니메이션

- **라이브러리**: Framer Motion
- **사용 위치**:
  - 히어로 섹션: 페이드인 애니메이션
  - 웨이팅 리스트 모달: 모달 등장/퇴장 애니메이션
  - 버튼: 호버/클릭 효과

## 🔌 API 구조

### API 라우트

**웨이팅 리스트 API** (`app/api/waitlist/route.ts`):
- **메서드**: POST
- **기능**: 사용자 정보를 Notion 데이터베이스에 저장
- **요청 본문**: `{ name: string, email: string }`
- **환경 변수**:
  - `NOTION_API_KEY`: Notion API 토큰
  - `NOTION_DATABASE_ID`: Notion 데이터베이스 ID

## 📦 주요 의존성

### 프레임워크 및 코어
- **Next.js**: 16.0.3 (App Router)
- **React**: 19.2.0
- **TypeScript**: 5.x

### UI 및 스타일링
- **Tailwind CSS**: 4.1.9
- **Framer Motion**: 애니메이션
- **Radix UI**: 접근성 있는 UI 컴포넌트 기반
- **next-themes**: 테마 관리

### 유틸리티
- **clsx**: 조건부 클래스명
- **tailwind-merge**: Tailwind 클래스 병합
- **zod**: 타입 검증 (설치되어 있으나 현재 미사용)

### 분석 및 모니터링
- **@vercel/analytics**: 웹사이트 분석

## 🎯 프로젝트 특징

1. **단순한 구조**: 복잡한 상태 관리나 폴더 구조 없이 간단하게 유지
2. **컴포넌트 중심**: 각 섹션이 독립적인 컴포넌트로 구성
3. **클라이언트 사이드 렌더링**: 메인 페이지는 클라이언트 컴포넌트로 구성
4. **반응형 디자인**: Tailwind의 반응형 유틸리티 활용
5. **다크 테마**: YouTube 브랜드 컬러를 활용한 다크 테마

## 📝 개발 규칙

프로젝트의 `.cursor/rules/myrule.mdc`에 정의된 규칙:
- Next.js 페이지는 단일 파일로 작성 (불필요한 분리 최소화)
- Tailwind CSS로만 스타일링
- 변수 선언 및 상태 관리 최소화
- 복잡한 상태 관리(useReducer 등) 사용 자제
- 간단한 타입 또는 단순 인터페이스만 사용
- 패키지 매니저: pnpm 사용

## 🔍 주요 컴포넌트 설명

### HeroSection
- YouTube 임베디드 비디오 배경
- 마우스 호버 시 비디오 확대 효과
- CTA 버튼으로 모달 열기

### WaitlistModal
- 웨이팅 리스트 등록 폼
- Notion API를 통한 데이터 저장
- 성공/에러 상태 표시
- Framer Motion 애니메이션

### ChannelInfoSection, PopularVideosSection 등
- 채널 정보 및 영상 목록을 표시하는 섹션 컴포넌트들

## 🛠️ 개발 환경 설정

### 필수 환경 변수
```env
NOTION_API_KEY=your_notion_api_key
NOTION_DATABASE_ID=your_notion_database_id
```

### TypeScript 설정
- **타겟**: ES6
- **모듈**: ESNext
- **경로 별칭**: `@/*` → 프로젝트 루트

### Next.js 설정
- TypeScript 빌드 에러 무시 (개발 편의성)
- 이미지 최적화 비활성화

---

**마지막 업데이트**: 2024년
**프로젝트 타입**: Next.js 랜딩 페이지
**주요 목적**: YouTube 채널 구독 유도 및 웨이팅 리스트 수집

