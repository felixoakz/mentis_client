import TechStackSection from "@/components/tech-stack-section"
import FeaturesSection from "@/components/features-section"
import ChallengesSection from "@/components/challenges-section"
import CallToAction from "@/components/call-to-action"

export default function AboutScreen() {
  return (
    <main className="min-h-screen">

      <FeaturesSection />

      <TechStackSection />

      <ChallengesSection />

      <CallToAction />

    </main>
  )
}

