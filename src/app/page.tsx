import CTASection from "@/components/landing/CTASection"
import FeaturesSections from "@/components/landing/FeaturesSection"
import Footer from "@/components/landing/Footer"
import Header from "@/components/landing/Header"
import HeroSection from "@/components/landing/HeroSection"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Header />
      <HeroSection />
      <FeaturesSections />
      <CTASection/>
      <Footer />
    </div>
  )
}
