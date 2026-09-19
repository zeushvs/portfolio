import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import ChapterTransition from "@/components/ChapterTransition";
import BrandCommercials from "@/components/sections/BrandCommercials";
import Instagram from "@/components/sections/Instagram";
import MotionGraphics from "@/components/sections/MotionGraphics";
import Cinematography from "@/components/sections/Cinematography";
import Corporate from "@/components/sections/Corporate";
import Events from "@/components/sections/Events";
import Travel from "@/components/sections/Travel";
import Photography from "@/components/sections/Photography";
import AdditionalSkills from "@/components/sections/AdditionalSkills";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Tools from "@/components/Tools";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main id="work" className="relative">
      <Hero />
      <Intro />

      <BrandCommercials />
      <ChapterTransition from="BRAND COMMERCIALS" to="INSTAGRAM & SOCIAL EDITS" />

      <Instagram />
      <ChapterTransition from="INSTAGRAM & SOCIAL EDITS" to="MOTION GRAPHICS EDITS" />

      <MotionGraphics />
      <ChapterTransition from="MOTION GRAPHICS EDITS" to="FREELANCE WORK" />

      <Cinematography />
      <ChapterTransition from="FREELANCE WORK" to="CORPORATE EDITING" />

      <Corporate />
      <ChapterTransition from="CORPORATE EDITING" to="EVENT WORK" />

      <Events />
      <ChapterTransition from="EVENT WORK" to="TRAVEL FILMS" />

      <Travel />
      <ChapterTransition from="TRAVEL FILMS" to="PHOTOGRAPHY" />

      <Photography />

      <AdditionalSkills />

      <About />
      <Experience />
      <Tools />
      <Contact />
    </main>
  );
}
