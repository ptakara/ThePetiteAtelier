import { HeroSection } from "@/components/hero-section"
import { ShopSection } from "@/components/shop-section"
import { AlterationsSection } from "@/components/alterations-section"
import { StorySection } from "@/components/story-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <main>
        <HeroSection />
        <ShopSection />
        <AlterationsSection />
        <StorySection />
      </main>
      <Footer />
    </div>
  )
}
