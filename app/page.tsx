"use client"

import { useState } from "react"
import HeroSection from "@/components/hero-section"
import ChannelInfoSection from "@/components/channel-info-section"
import PopularVideosSection from "@/components/popular-videos-section"
import RecommendedVideosSection from "@/components/recommended-videos-section"
import CreatorStorySection from "@/components/creator-story-section"
import WaitlistModal from "@/components/waitlist-modal"
import Footer from "@/components/footer"
import Chatbot from "@/components/chatbot"

export default function Home() {
  const [showModal, setShowModal] = useState(false)

  return (
    <main 
      className="min-h-screen text-white"
      style={{
        backgroundImage: "url('/color-bg.jpg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <HeroSection onCtaClick={() => setShowModal(true)} />
      <ChannelInfoSection />
      <PopularVideosSection />
      <RecommendedVideosSection />
      <CreatorStorySection onCtaClick={() => setShowModal(true)} />
      <Footer />
      <WaitlistModal isOpen={showModal} onClose={() => setShowModal(false)} />
      <Chatbot />
    </main>
  )
}
