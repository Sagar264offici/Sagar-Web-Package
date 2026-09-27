import Nav from './components/Nav'
import Hero from './components/Hero'
import { Packages, Foundation, Growth, Infra, Compare, Terms, Contact } from './components/Sections'

export default function App() {
  return (
    <div className="min-h-screen bg-ink text-white font-body">
      <Nav />
      <Hero />
      <main>
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
