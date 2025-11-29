# 메타데이터 업데이트 작업 문서

## 작업 일시
2025년 1월

## 작업 목적
Next.js 공식 문서를 참고하여 웹사이트의 메타데이터를 완전하게 구성하여 SEO(검색 엔진 최적화)와 소셜 미디어 공유 최적화를 개선

## 참고 문서
- [Next.js Metadata 문서](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Next.js Metadata and OG images 문서](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)

## 작업 내용

### 1. Title 메타데이터 개선
**변경 전:**
```typescript
title: "YouTube Boost - 채널 성장 프로젝트"
```

**변경 후:**
```typescript
title: {
  default: "YouTube Boost - 채널 성장 프로젝트",
  template: "%s | YouTube Boost",
}
```

**설명:**
- `default`: 기본 제목 설정
- `template`: 하위 페이지에서 제목을 동적으로 설정할 수 있는 템플릿 제공
- 예: "인기 영상 | YouTube Boost" 형태로 표시 가능

### 2. Description 메타데이터 개선
**변경 전:**
```typescript
description: "당신의 구독이 이 채널을 바꿉니다. YouTube Boost와 함께 채널 성장의 여정을 시작하세요."
```

**변경 후:**
```typescript
description: "당신의 구독이 이 채널을 바꿉니다. YouTube Boost와 함께 채널 성장의 여정을 시작하세요. 실전적인 콘텐츠와 독특한 관점으로 가치를 전달하는 크리에이터와 함께 성장하세요."
```

**설명:**
- 더 상세하고 구체적인 설명 추가
- 검색 엔진과 사용자에게 더 많은 정보 제공

### 3. Keywords 추가
```typescript
keywords: [
  "YouTube",
  "채널 성장",
  "구독",
  "크리에이터",
  "영상 콘텐츠",
  "YouTube Boost",
  "채널 성장 프로젝트",
  "인기 영상",
  "추천 영상",
]
```

**설명:**
- 검색 엔진 최적화를 위한 키워드 배열 추가
- 웹사이트의 주요 주제와 관련 키워드 포함

### 4. Authors, Creator, Publisher 추가
```typescript
authors: [{ name: "YouTube Boost" }],
creator: "YouTube Boost",
publisher: "YouTube Boost",
```

**설명:**
- 콘텐츠 제작자 및 발행자 정보 명시
- 검색 엔진과 소셜 미디어 플랫폼에서 신뢰도 향상

### 5. Robots 메타데이터 설정
```typescript
robots: {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
}
```

**설명:**
- 검색 엔진 크롤러가 페이지를 인덱싱하고 링크를 따라가도록 설정
- Google 봇에 대한 상세 설정 추가
  - `max-video-preview: -1`: 비디오 미리보기 제한 없음
  - `max-image-preview: "large"`: 큰 이미지 미리보기 허용
  - `max-snippet: -1`: 스니펫 길이 제한 없음

### 6. Open Graph (OG) 메타데이터 추가
```typescript
openGraph: {
  type: "website",
  locale: "ko_KR",
  url: "https://youtube-boost.vercel.app",
  siteName: "YouTube Boost",
  title: "YouTube Boost - 채널 성장 프로젝트",
  description: "당신의 구독이 이 채널을 바꿉니다. YouTube Boost와 함께 채널 성장의 여정을 시작하세요. 실전적인 콘텐츠와 독특한 관점으로 가치를 전달하는 크리에이터와 함께 성장하세요.",
  images: [
    {
      url: "/og_img.png",
      width: 1200,
      height: 630,
      alt: "YouTube Boost - 채널 성장 프로젝트",
    },
  ],
}
```

**설명:**
- Facebook, LinkedIn 등 소셜 미디어에서 링크 공유 시 표시되는 정보 설정
- `type: "website"`: 웹사이트 타입 지정
- `locale: "ko_KR"`: 한국어 로케일 설정
- `images`: 공유 시 표시될 이미지 설정 (`/og_img.png` 파일 사용, 1200x630 권장 크기)

### 7. Twitter 카드 메타데이터 추가
```typescript
twitter: {
  card: "summary_large_image",
  title: "YouTube Boost - 채널 성장 프로젝트",
  description: "당신의 구독이 이 채널을 바꿉니다. YouTube Boost와 함께 채널 성장의 여정을 시작하세요. 실전적인 콘텐츠와 독특한 관점으로 가치를 전달하는 크리에이터와 함께 성장하세요.",
  images: ["/og_img.png"],
  creator: "@youtubeboost",
}
```

**설명:**
- Twitter/X에서 링크 공유 시 표시되는 정보 설정
- `card: "summary_large_image"`: 큰 이미지가 포함된 카드 형식
- `images`: Open Graph와 동일한 이미지 사용 (`/og_img.png`)
- `creator`: 트위터 계정 정보

### 8. MetadataBase 및 Canonical URL 추가
```typescript
metadataBase: new URL("https://youtube-boost.vercel.app"),
alternates: {
  canonical: "/",
}
```

**설명:**
- `metadataBase`: 상대 경로 이미지 URL의 기본 URL 설정
- `canonical`: 중복 콘텐츠 방지를 위한 표준 URL 지정

### 9. Generator 업데이트
**변경 전:**
```typescript
generator: "v0.app"
```

**변경 후:**
```typescript
generator: "Next.js"
```

**설명:**
- 실제 사용 중인 프레임워크로 업데이트

## 수정된 파일
- `app/layout.tsx`: 메타데이터 객체 전체 업데이트

## 기대 효과

### SEO 개선
1. **검색 엔진 최적화**: 키워드, robots 설정으로 검색 엔진 크롤링 최적화
2. **검색 결과 개선**: 더 상세한 title과 description으로 검색 결과에서 더 매력적으로 표시
3. **중복 콘텐츠 방지**: canonical URL 설정으로 SEO 점수 향상

### 소셜 미디어 공유 개선
1. **Facebook/LinkedIn**: Open Graph 메타데이터로 링크 공유 시 이미지와 설명이 표시
2. **Twitter/X**: Twitter 카드로 링크 공유 시 큰 이미지와 함께 표시
3. **일관된 브랜딩**: 모든 소셜 미디어에서 일관된 정보 표시

### 사용자 경험 개선
1. **명확한 정보 전달**: 상세한 description으로 사용자가 페이지 내용을 빠르게 파악
2. **신뢰도 향상**: authors, creator, publisher 정보로 신뢰도 향상

## 참고 사항

### 이미지 파일 사용
Open Graph 및 Twitter 카드 이미지로 `public/og_img.png` 파일을 사용합니다.
- Open Graph: `/og_img.png`
- Twitter 카드: `/og_img.png` (동일한 이미지 사용)

이미지 파일이 `public` 폴더에 존재하므로 소셜 미디어 공유 시 정상적으로 표시됩니다.

### URL 설정
현재 `metadataBase`와 `openGraph.url`에 `https://youtube-boost.vercel.app`로 설정되어 있습니다.
실제 배포 URL이 다르다면 해당 값들을 업데이트해야 합니다.

## 최종 업데이트 (2025년 1월)

### Open Graph 이미지 경로 변경
- **변경 전**: `/opengraph-image.jpg`, `/twitter-image.jpg` (존재하지 않는 파일)
- **변경 후**: `/og_img.png` (실제 존재하는 파일 사용)

이제 소셜 미디어 공유 시 `public/og_img.png` 이미지가 정상적으로 표시됩니다.

## 다음 단계 (선택사항)
1. 실제 배포 URL로 메타데이터 URL 업데이트
2. Google Search Console에 사이트 등록하여 SEO 모니터링
3. 소셜 미디어 공유 테스트 (Facebook, Twitter, LinkedIn 등)

