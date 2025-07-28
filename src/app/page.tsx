import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main className="pt-16">
      <Hero />
      <Experience />
      <Projects />
      <Contact />
    </main>
  );
}
