import type React from "react"
// <CHANGE> Updated metadata and added Framer Motion for animations
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: {
    default: "YouTube Boost - 채널 성장 프로젝트",
    template: "%s | YouTube Boost",
  },
  description: "당신의 구독이 이 채널을 바꿉니다. YouTube Boost와 함께 채널 성장의 여정을 시작하세요. 실전적인 콘텐츠와 독특한 관점으로 가치를 전달하는 크리에이터와 함께 성장하세요.",
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
  ],
  authors: [{ name: "YouTube Boost" }],
  creator: "YouTube Boost",
  publisher: "YouTube Boost",
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
  },
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
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Boost - 채널 성장 프로젝트",
    description: "당신의 구독이 이 채널을 바꿉니다. YouTube Boost와 함께 채널 성장의 여정을 시작하세요. 실전적인 콘텐츠와 독특한 관점으로 가치를 전달하는 크리에이터와 함께 성장하세요.",
    images: ["/og_img.png"],
    creator: "@youtubeboost",
  },
  generator: "Next.js",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  metadataBase: new URL("https://youtube-boost.vercel.app"),
  alternates: {
    canonical: "/",
  },
}

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
