import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('Hide Preloader Module', () => {
  let preloader;

  beforeEach(async () => {
    // Use fake timers
    vi.useFakeTimers();

    // Reset DOM
    document.body.innerHTML = '';

    // Create preloader element
    preloader = document.createElement('div');
    preloader.id = 'loader-wrapper';
    preloader.style.display = 'block';
    preloader.hidden = false;
    document.body.appendChild(preloader);

    // Reset window.onload
    window.onload = null;

    // Clear module cache to ensure fresh import each test
    vi.resetModules();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllTimers();
  });

  describe('Basic Functionality', () => {
    it('should set up window.onload handler', async () => {
      await import('../../js/hidepreloader.js');

      // Module should assign window.onload
      expect(window.onload).toBeTruthy();
      expect(typeof window.onload).toBe('function');
    });

    it('should hide preloader after 2 seconds when window loads', async () => {
      await import('../../js/hidepreloader.js');

      // Trigger window load
      window.onload(new Event('load'));

      // Preloader should not be hidden immediately
      expect(preloader.hidden).toBe(false);
      expect(preloader.style.display).toBe('block');

      // Fast forward 2 seconds
      vi.advanceTimersByTime(2000);

      // Now it should be hidden
      expect(preloader.hidden).toBe(true);
      expect(preloader.style.display).toBe('none');
    });

    it('should add hide-preloader class immediately on window load', async () => {
      await import('../../js/hidepreloader.js');

      // Trigger window load
      window.onload(new Event('load'));

      // Class should be added immediately
      expect(preloader.classList.contains('hide-preloader')).toBe(true);

      // But should not be hidden yet
      expect(preloader.hidden).toBe(false);
    });

    it('should add class and hide element together', async () => {
      await import('../../js/hidepreloader.js');

      window.onload(new Event('load'));

      // Class added immediately
      expect(preloader.classList.contains('hide-preloader')).toBe(true);
      expect(preloader.hidden).toBe(false);

      // After timeout, should also be hidden
      vi.advanceTimersByTime(2000);

      expect(preloader.classList.contains('hide-preloader')).toBe(true);
      expect(preloader.hidden).toBe(true);
      expect(preloader.style.display).toBe('none');
    });
  });

  describe('Timing Behavior', () => {
    it('should not hide preloader before 2 seconds', async () => {
      await import('../../js/hidepreloader.js');
      window.onload(new Event('load'));

      // Advance time by 1.5 seconds (less than 2)
      vi.advanceTimersByTime(1500);

      // Should still be visible
      expect(preloader.hidden).toBe(false);
      expect(preloader.style.display).toBe('block');
    });

    it('should hide preloader at exactly 2 seconds', async () => {
      await import('../../js/hidepreloader.js');
      window.onload(new Event('load'));

      // Advance exactly 2 seconds
      vi.advanceTimersByTime(2000);

      // Should be hidden
      expect(preloader.hidden).toBe(true);
      expect(preloader.style.display).toBe('none');
    });

    it('should work correctly with partial time advances', async () => {
      await import('../../js/hidepreloader.js');
      window.onload(new Event('load'));

      // Advance in steps
      vi.advanceTimersByTime(1000);
      expect(preloader.hidden).toBe(false);

      vi.advanceTimersByTime(500);
      expect(preloader.hidden).toBe(false);

      vi.advanceTimersByTime(500);
      expect(preloader.hidden).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing preloader element gracefully', async () => {
      // Remove preloader
      preloader.remove();

      // Should not throw error
      await import('../../js/hidepreloader.js');
      expect(() => window.onload(new Event('load'))).not.toThrow();
      expect(() => vi.advanceTimersByTime(2000)).not.toThrow();
    });

    it('should handle null preloader reference', async () => {
      // Mock getElementById to return null
      const originalGetElementById = document.getElementById;
      document.getElementById = vi.fn().mockReturnValue(null);

      await import('../../js/hidepreloader.js');
      expect(() => {
        window.onload(new Event('load'));
        vi.advanceTimersByTime(2000);
      }).not.toThrow();

      // Restore
      document.getElementById = originalGetElementById;
    });

    it('should handle preloader already hidden', async () => {
      // Set preloader as already hidden
      preloader.hidden = true;
      preloader.style.display = 'none';

      await import('../../js/hidepreloader.js');
      window.onload(new Event('load'));
      vi.advanceTimersByTime(2000);

      // Should remain hidden
      expect(preloader.hidden).toBe(true);
      expect(preloader.style.display).toBe('none');
    });

    it('should handle preloader with existing classes', async () => {
      // Add existing classes
      preloader.classList.add('existing-class', 'another-class');

      await import('../../js/hidepreloader.js');
      window.onload(new Event('load'));

      // Should preserve existing classes and add new one
      expect(preloader.classList.contains('existing-class')).toBe(true);
      expect(preloader.classList.contains('another-class')).toBe(true);
      expect(preloader.classList.contains('hide-preloader')).toBe(true);
    });

    it('should handle preloader removed before timeout completes', async () => {
      await import('../../js/hidepreloader.js');
      window.onload(new Event('load'));

      // Class should be added immediately
      expect(preloader.classList.contains('hide-preloader')).toBe(true);

      // Remove preloader before timeout
      preloader.remove();

      // Timeout should not throw error
      expect(() => vi.advanceTimersByTime(2000)).not.toThrow();
    });

    it('should override existing display styles', async () => {
      // Set complex initial styles
      preloader.style.cssText = 'display: flex; position: fixed; z-index: 9999;';

      await import('../../js/hidepreloader.js');
      window.onload(new Event('load'));
      vi.advanceTimersByTime(2000);

      // Display should be overridden to none
      expect(preloader.style.display).toBe('none');
      expect(preloader.hidden).toBe(true);
    });
  });
});
