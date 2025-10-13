import About from "@/components/sections/about";
import Skills from "@/components/sections/skills";

export const metadata = {
  title: "Sobre mí | Ana Rodríguez"
};

export default function AboutPage() {
  return (
    <div className="space-y-10">
      <About />
      <Skills />
    </div>
  );
}
