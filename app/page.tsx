import Hero from "@/components/sections/hero";
import Skills from "@/components/sections/skills";
import About from "@/components/sections/about";
import PortfolioShowcase from "@/components/sections/portfolio-showcase";
import BlogPreview from "@/components/sections/blog-preview";
import Contact from "@/components/sections/contact";
import { getProjects } from "@/lib/projects";
import { getPosts } from "@/lib/posts";

export default async function HomePage() {
  const [projects, posts] = await Promise.all([getProjects(), getPosts()]);
  return (
    <>
      <Hero />
      <Skills />
      <About />
      <PortfolioShowcase projects={projects.slice(0, 3)} />
      <BlogPreview posts={posts.slice(0, 3)} />
      <Contact />
    </>
  );
}
