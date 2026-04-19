import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('Hide Preloader Module', () => {
  let preloader;

  beforeEach(async () => {
    vi.useFakeTimers();

    document.body.innerHTML = '';

    preloader = document.createElement('div');
    preloader.id = 'loader-wrapper';
    preloader.style.display = 'block';
    preloader.hidden = false;
    document.body.appendChild(preloader);

    vi.resetModules();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllTimers();
  });

  function triggerDOMContentLoaded() {
    document.dispatchEvent(new Event('DOMContentLoaded'));
  }

  describe('Basic Functionality', () => {
    it('should add hide-preloader class on DOMContentLoaded', async () => {
      await import('../../js/hidepreloader.js');
      triggerDOMContentLoaded();
      expect(preloader.classList.contains('hide-preloader')).toBe(true);
    });

    it('should hide preloader after 600ms', async () => {
      await import('../../js/hidepreloader.js');
      triggerDOMContentLoaded();

      expect(preloader.hidden).toBe(false);
      expect(preloader.style.display).toBe('block');

      vi.advanceTimersByTime(600);

      expect(preloader.hidden).toBe(true);
      expect(preloader.style.display).toBe('none');
    });

    it('should add hide-preloader class immediately on DOMContentLoaded', async () => {
      await import('../../js/hidepreloader.js');
      triggerDOMContentLoaded();

      expect(preloader.classList.contains('hide-preloader')).toBe(true);
      expect(preloader.hidden).toBe(false);
    });

    it('should add class and hide element together', async () => {
      await import('../../js/hidepreloader.js');
      triggerDOMContentLoaded();

      expect(preloader.classList.contains('hide-preloader')).toBe(true);
      expect(preloader.hidden).toBe(false);

      vi.advanceTimersByTime(600);

      expect(preloader.classList.contains('hide-preloader')).toBe(true);
      expect(preloader.hidden).toBe(true);
      expect(preloader.style.display).toBe('none');
    });
  });

  describe('Timing Behavior', () => {
    it('should not hide preloader before 600ms', async () => {
      await import('../../js/hidepreloader.js');
      triggerDOMContentLoaded();

      vi.advanceTimersByTime(500);

      expect(preloader.hidden).toBe(false);
      expect(preloader.style.display).toBe('block');
    });

    it('should hide preloader at exactly 600ms', async () => {
      await import('../../js/hidepreloader.js');
      triggerDOMContentLoaded();

      vi.advanceTimersByTime(600);

      expect(preloader.hidden).toBe(true);
      expect(preloader.style.display).toBe('none');
    });

    it('should work correctly with partial time advances', async () => {
      await import('../../js/hidepreloader.js');
      triggerDOMContentLoaded();

      vi.advanceTimersByTime(300);
      expect(preloader.hidden).toBe(false);

      vi.advanceTimersByTime(200);
      expect(preloader.hidden).toBe(false);

      vi.advanceTimersByTime(100);
      expect(preloader.hidden).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing preloader element gracefully', async () => {
      preloader.remove();

      await import('../../js/hidepreloader.js');
      expect(() => triggerDOMContentLoaded()).not.toThrow();
      expect(() => vi.advanceTimersByTime(600)).not.toThrow();
    });

    it('should handle null preloader reference', async () => {
      const originalGetElementById = document.getElementById;
      document.getElementById = vi.fn().mockReturnValue(null);

      await import('../../js/hidepreloader.js');
      expect(() => {
        triggerDOMContentLoaded();
        vi.advanceTimersByTime(600);
      }).not.toThrow();

      document.getElementById = originalGetElementById;
    });

    it('should handle preloader already hidden', async () => {
      preloader.hidden = true;
      preloader.style.display = 'none';

      await import('../../js/hidepreloader.js');
      triggerDOMContentLoaded();
      vi.advanceTimersByTime(600);

      expect(preloader.hidden).toBe(true);
      expect(preloader.style.display).toBe('none');
    });

    it('should handle preloader with existing classes', async () => {
      preloader.classList.add('existing-class', 'another-class');

      await import('../../js/hidepreloader.js');
      triggerDOMContentLoaded();

      expect(preloader.classList.contains('existing-class')).toBe(true);
      expect(preloader.classList.contains('another-class')).toBe(true);
      expect(preloader.classList.contains('hide-preloader')).toBe(true);
    });

    it('should handle preloader removed before timeout completes', async () => {
      await import('../../js/hidepreloader.js');
      triggerDOMContentLoaded();

      expect(preloader.classList.contains('hide-preloader')).toBe(true);

      preloader.remove();

      expect(() => vi.advanceTimersByTime(600)).not.toThrow();
    });

    it('should override existing display styles', async () => {
      preloader.style.cssText = 'display: flex; position: fixed; z-index: 9999;';

      await import('../../js/hidepreloader.js');
      triggerDOMContentLoaded();
      vi.advanceTimersByTime(600);

      expect(preloader.style.display).toBe('none');
      expect(preloader.hidden).toBe(true);
    });
  });
});
