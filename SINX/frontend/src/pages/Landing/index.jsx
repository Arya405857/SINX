import Navbar from "../../components/layout/Navbar"
import Footer from "../../components/layout/Footer"
import Hero from "./Hero"
import WhySignix from "./WhySignix"
import Features from "./Features"
import HowItWorks from "./HowItWorks"
import LearningPreview from "./LearningPreview"
import Technology from "./Technology"
import Statistics from "./Statistics"
import CTA from "./CTA"

export default function Landing() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main id="main" className="flex-1">
        <Hero />
        <WhySignix />
        <Features />
        <HowItWorks />
        <LearningPreview />
        <Technology />
        <Statistics />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
