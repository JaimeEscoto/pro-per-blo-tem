import Hero from "@/components/sections/hero";
import Skills from "@/components/sections/skills";
import About from "@/components/sections/about";
import BlogPreview from "@/components/sections/blog-preview";
import Contact from "@/components/sections/contact";
import { getPosts } from "@/lib/posts";
import Trust from "@/components/sections/trust";

export default async function HomePage() {
  const posts = await getPosts();
  return (
    <>
      <Hero />
      <Skills />
      <About />
      <Trust />
      <BlogPreview posts={posts.slice(0, 3)} />
      <Contact />
    </>
  );
}
