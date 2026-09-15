import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/ui/Marquee";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { WorkBento } from "@/components/sections/WorkBento";
import { ExperienceRail } from "@/components/sections/ExperienceRail";
import { SkillConstellation } from "@/components/sections/SkillConstellation";
import { Education } from "@/components/sections/Education";
import { LabsTeaser } from "@/components/sections/LabsTeaser";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { skills } from "@/data/content";
import { usePageTitle } from "@/hooks/usePageTitle";

export function HomePage() {
  usePageTitle("Ali Farid | Software, IT, Systems");
  const tickers = [
    ...skills.languages,
    ...skills.frameworks,
    ...skills.tools,
    ...skills.concepts,
  ];
  return (
    <>
      <Hero />
      <Marquee items={tickers} />
      <StatsStrip />
      <WorkBento />
      <ExperienceRail />
      <SkillConstellation />
      <Education />
      <LabsTeaser />
      <Marquee
        items={[
          "Software engineering",
          "IT",
          "Systems analysis",
          "Open to relocation",
          "Purdue CIT",
          "June 2028",
        ]}
        reverse
      />
      <ContactCTA />
    </>
  );
}
