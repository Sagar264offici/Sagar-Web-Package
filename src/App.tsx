import Nav from './components/Nav'
import Hero from './components/Hero'
import { Packages, Foundation, Growth, Infra, Compare, Terms, Contact } from './components/Sections'

export default function App() {
  return (
    <div className="min-h-screen bg-ink text-white font-body">
      <a
        href="#packages"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-gold focus:text-black focus:px-4 focus:py-2 focus:rounded-full"
      >
        Skip to packages
      </a>
      <Nav />
      <Hero />
      <main aria-label="Web development packages brochure">
        <Packages />
        <Foundation />
        <Growth />
        <Infra />
        <Compare />
        <Terms />
        <Contact />
      </main>
    </div>
  )
}
