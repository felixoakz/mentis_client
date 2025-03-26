import TechStackSection from "@/components/tech-stack-section"
import FeaturesSection from "@/components/features-section"
import ChallengesSection from "@/components/challenges-section"
import CallToAction from "@/components/call-to-action"
import ImagesSection from "../components/images-section"
import { useEffect } from "react"

export default function AboutScreen() {
  useEffect(() => {
    const applyTheme = () => {
      const theme = localStorage.getItem("theme") || "synthwave";
      document.documentElement.setAttribute("data-theme", theme);
    };

    applyTheme();
    window.addEventListener("storage", applyTheme);

    return () => {
      window.removeEventListener("storage", applyTheme);
    };
  }, []);

  return (
    <main className="min-h-screen">

      <ImagesSection />

      <FeaturesSection />

      <TechStackSection />

      <ChallengesSection />

      <CallToAction />

    </main>
  )
}

