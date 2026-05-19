import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('Deals Module', () => {
  beforeEach(() => {
    document.body.innerHTML = '';

    const container = document.createElement('ul');
    container.id = 'deals-slides';
    container.className = 'glide__slides list-unstyled';
    document.body.appendChild(container);
  });

  afterEach(() => {
    vi.resetModules();
  });

  it('should populate deals slides on module import', async () => {
    const dealsSlidesElement = document.getElementById('deals-slides');
    expect(dealsSlidesElement?.children.length).toBe(0);

    await import('../../js/deals.js');

    // Wait a tick for DOMContentLoaded if needed
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(dealsSlidesElement?.children.length).toBeGreaterThan(0);
  });

  it('should create slide elements with correct classes', async () => {
    await import('../../js/deals.js');
    await new Promise(resolve => setTimeout(resolve, 0));

    const slides = document.querySelectorAll('.glide__slide');
    expect(slides.length).toBeGreaterThan(0);
  });
});
