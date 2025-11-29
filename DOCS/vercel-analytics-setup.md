# Vercel Analytics 설정 작업 문서

## 작업 일시
2025년 1월

## 작업 목적
Vercel Analytics를 프로젝트에 연결하여 웹사이트 분석 데이터 수집

## 참고 문서
- [Vercel Analytics 문서](https://vercel.com/docs/analytics/package)

## 현재 상태 확인

### 이미 설정된 내용
1. **패키지 설치**: `@vercel/analytics` 패키지가 `package.json`에 설치되어 있음
2. **컴포넌트 추가**: `app/layout.tsx`에 `Analytics` 컴포넌트가 추가되어 있음

## 설정 내용

### 1. 패키지 설치 확인

`package.json`에 다음 패키지가 포함되어 있습니다:
```json
"@vercel/analytics": "latest"
```

### 2. Analytics 컴포넌트 설정

`app/layout.tsx`에 다음 코드가 포함되어 있습니다:

```typescript
import { Analytics } from "@vercel/analytics/next"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

## 작동 방식

### 자동 환경 감지
- `mode` 옵션을 지정하지 않으면 자동으로 환경을 감지합니다
- `NODE_ENV` 환경 변수를 기반으로 `development` 또는 `production` 모드를 자동 설정
- 개발 환경에서는 자동으로 디버그 모드가 활성화됩니다

### 기본 동작
1. **프로덕션 환경**: Vercel에 배포된 프로덕션 환경에서만 분석 데이터 수집
2. **개발 환경**: 로컬 개발 환경에서는 디버그 모드로 작동하여 콘솔에 이벤트 표시
3. **데이터 수집**: 페이지뷰, 클릭, 커스텀 이벤트 등 자동 수집

## Vercel Analytics 기능

### 수집되는 데이터
- 페이지뷰 (Page Views)
- 사용자 세션 (User Sessions)
- 방문자 수 (Visitors)
- 페이지별 성능 지표
- 지리적 위치 데이터
- 디바이스 및 브라우저 정보

### 추가 설정 옵션 (선택사항)

문서에 따르면 다음과 같은 추가 옵션을 설정할 수 있습니다:

#### 1. mode 옵션
환경을 수동으로 지정할 수 있습니다:
```typescript
<Analytics mode="production" />
```

#### 2. debug 옵션
디버그 모드를 수동으로 활성화/비활성화:
```typescript
<Analytics debug />
```

#### 3. beforeSend 옵션
이벤트를 필터링하거나 수정:
```typescript
<Analytics
  beforeSend={(event) => {
    if (event.url.includes('/private')) {
      return null; // 이벤트 무시
    }
    return event;
  }}
/>
```

#### 4. endpoint 옵션
커스텀 엔드포인트 지정:
```typescript
<Analytics endpoint="https://custom-domain.com/_vercel/insights" />
```

## 확인 방법

### 개발 환경에서 확인
1. 개발 서버 실행: `pnpm dev`
2. 브라우저 콘솔 열기 (F12)
3. 개발 환경에서는 디버그 모드가 자동 활성화되어 이벤트가 콘솔에 표시됨

### 프로덕션 환경에서 확인
1. Vercel에 프로젝트 배포
2. Vercel 대시보드에서 Analytics 탭 확인
3. 실시간 및 과거 데이터 확인 가능

## 주의사항

1. **프라이버시**: Vercel Analytics는 GDPR 준수를 위해 개인 식별 정보를 수집하지 않습니다
2. **성능**: Analytics는 비동기로 로드되어 페이지 성능에 영향을 최소화합니다
3. **환경 변수**: 특별한 환경 변수 설정이 필요하지 않습니다 (Vercel 배포 시 자동 인식)

## 다음 단계

1. Vercel에 프로젝트 배포
2. Vercel 대시보드에서 Analytics 데이터 확인
3. 필요시 추가 옵션 설정 (beforeSend 등)

## 참고

- Vercel Analytics는 Vercel에 배포된 프로젝트에서만 작동합니다
- 로컬 개발 환경에서는 디버그 모드로만 작동하며 실제 데이터는 수집되지 않습니다
- 프로덕션 환경에서만 실제 분석 데이터가 수집됩니다

