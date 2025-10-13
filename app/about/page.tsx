import About from "@/components/sections/about";
import Skills from "@/components/sections/skills";

export const metadata = {
  title: "Sobre mí | Paola Madrid"
};

export default function AboutPage() {
  return (
    <div className="space-y-10">
      <About />
      <Skills />
    </div>
  );
}
