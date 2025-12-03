// Test setup file - runs before each test
import { vi } from 'vitest';

// Mock DOM methods and properties that are commonly used
Object.defineProperty(window, 'scrollY', {
  value: 0,
  writable: true,
});

Object.defineProperty(window, 'innerHeight', {
  value: 768,
  writable: true,
});

Object.defineProperty(window, 'onload', {
  value: null,
  writable: true,
});

Object.defineProperty(window, 'onscroll', {
  value: null,
  writable: true,
});

// Mock getBoundingClientRect
Element.prototype.getBoundingClientRect = vi.fn(() => ({
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: 0,
  height: 0,
  x: 0,
  y: 0,
}));

// Mock scrollIntoView
Element.prototype.scrollIntoView = vi.fn();

// Mock performance.now for consistent timing tests
Object.defineProperty(window, 'performance', {
  value: {
    now: vi.fn(() => 0),
  },
  writable: true,
});

// Reset DOM before each test
beforeEach(() => {
  document.body.innerHTML = '';
  document.head.innerHTML = '';
  
  // Reset window properties
  window.scrollY = 0;
  window.innerHeight = 768;
  window.onload = null;
  window.onscroll = null;
  
  // Clear all mocks
  vi.clearAllMocks();
  
  // Reset module cache to allow fresh imports
  vi.resetModules();
});