import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import App from '../App'

describe('brochure app renders every PDF word-group', () => {
  it('renders the spinning atom canvas hero', () => {
    render(<App />)
    expect(screen.getByTestId('atom-canvas')).toBeInTheDocument()
  })

  it('renders hero headline and price range', () => {
    render(<App />)
    expect(screen.getAllByText(/WEB DEVELOPMENT/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText('₹10,000').length).toBeGreaterThan(0)
    expect(screen.getAllByText('₹35,000').length).toBeGreaterThan(0)
    expect(screen.getByText(/QUOTED SEPARATELY/i)).toBeInTheDocument()
  })

  it('renders all four package cards', () => {
    render(<App />)
    expect(screen.getByTestId('package-card-starter')).toBeInTheDocument()
    expect(screen.getByTestId('package-card-business')).toBeInTheDocument()
    expect(screen.getByTestId('package-card-professional')).toBeInTheDocument()
    expect(screen.getByTestId('package-card-business-pro')).toBeInTheDocument()
  })

  it('renders comparison table and infrastructure note', () => {
    render(<App />)
    expect(screen.getByTestId('comparison-table')).toBeInTheDocument()
    expect(screen.getAllByText(/provider charges are paid separately/i).length).toBeGreaterThan(0)
  })

  it('exposes downloadable PDF link', () => {
    render(<App />)
    const links = screen.getAllByTestId('download-pdf')
    expect(links.length).toBeGreaterThan(0)
    expect(links[0].getAttribute('href')).toContain('.pdf')
  })

  it('renders brand-logo social cards (portfolio, github, linkedin, instagram)', () => {
    render(<App />)
    for (const name of ['portfolio', 'github', 'linkedin', 'instagram']) {
      const link = screen.getByTestId(`social-${name}`)
      expect(link).toBeInTheDocument()
      expect(link.querySelector('svg')).not.toBeNull()
    }
  })

  it('renders socials, portfolio link and thank-you footer', () => {
    render(<App />)
    expect(screen.getByText(/github.com\/Sagar264Offici/i)).toBeInTheDocument()
    expect(screen.getByTestId('portfolio-link').getAttribute('href')).toContain('sagar-horizon.vercel.app')
    expect(screen.getByText(/THANK YOU/i)).toBeInTheDocument()
  })
})
