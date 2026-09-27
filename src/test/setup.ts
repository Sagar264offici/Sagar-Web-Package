import '@testing-library/jest-dom'

class RO {
  observe() {}
  unobserve() {}
  disconnect() {}
}
// @ts-ignore polyfill for jsdom
global.ResizeObserver = global.ResizeObserver || RO

// jsdom has no WebGL — stub canvas getContext
HTMLCanvasElement.prototype.getContext = (() => () => null) as any

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
})

class IO {
  observe() {}
  unobserve() {}
  disconnect() {}
}
// @ts-ignore polyfill for jsdom
global.IntersectionObserver = global.IntersectionObserver || IO
