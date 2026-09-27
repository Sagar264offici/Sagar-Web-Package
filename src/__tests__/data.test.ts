import { describe, it, expect } from 'vitest'
import { PACKAGES, FOUNDATION, INFRA, COMPARISON_ROWS, TERMS } from '../data'

describe('brochure data integrity (mirrors PDF)', () => {
  it('has four fixed packages with exact PDF pricing', () => {
    expect(PACKAGES.map((p) => p.price)).toEqual(['₹10,000', '₹15,000', '₹22,000', '₹35,000'])
    expect(PACKAGES.map((p) => p.name)).toEqual(['STARTER', 'BUSINESS', 'PROFESSIONAL', 'BUSINESS PRO'])
  })

  it('has correct page counts per package', () => {
    expect(PACKAGES.map((p) => p.pages)).toEqual([
      'Up to 4 pages',
      'Up to 6 pages',
      'Up to 10 pages',
      'Up to 15 pages',
    ])
  })

  it('foundation has 6 baseline items', () => {
    expect(FOUNDATION).toHaveLength(6)
  })

  it('infrastructure lists 4 client-paid categories', () => {
    expect(INFRA.map((i) => i.title)).toEqual([
      'DOMAIN',
      'HOSTING',
      'DATABASE / CLOUD',
      'THIRD-PARTY SERVICES',
    ])
  })

  it('comparison table has 15 rows', () => {
    expect(COMPARISON_ROWS).toHaveLength(15)
  })

  it('commercial terms has 5 entries', () => {
    expect(TERMS).toHaveLength(5)
  })
})
