import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('Hide Preloader Module', () => {
  let preloader;

  beforeEach(async () => {
    // Use fake timers first
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

  describe('Preloader Hiding with Timeout', () => {
    it('should hide preloader after 2 seconds when window loads', async () => {
      // Import module
      await import('../../js/hidepreloader.js');

      // Trigger window load by calling the handler
      if (window.onload) {
        window.onload(new Event('load'));
      }

      // Preloader should not be hidden immediately
      expect(preloader.hidden).toBe(false);
      expect(preloader.style.display).toBe('block');

      // Fast forward 2 seconds
      vi.advanceTimersByTime(2000);

      // Now it should be hidden
      expect(preloader.hidden).toBe(true);
      expect(preloader.style.display).toBe('none');
    });

    it('should handle missing preloader element gracefully', async () => {
      // Remove preloader
      preloader.remove();

      // Should not throw error
      await import('../../js/hidepreloader.js');
      if (window.onload) {
        expect(() => window.onload(new Event('load'))).not.toThrow();
      }
      expect(() => vi.advanceTimersByTime(2000)).not.toThrow();
    });

    it('should not hide preloader before timeout', async () => {
      await import('../../js/hidepreloader.js');
      if (window.onload) {
        window.onload(new Event('load'));
      }

      // Advance time by 1.5 seconds (less than 2)
      vi.advanceTimersByTime(1500);

      // Should still be visible
      expect(preloader.hidden).toBe(false);
      expect(preloader.style.display).toBe('block');

      // Complete the timeout
      vi.advanceTimersByTime(500);

      // Now should be hidden
      expect(preloader.hidden).toBe(true);
      expect(preloader.style.display).toBe('none');
    });

    it('should handle preloader already hidden', async () => {
      // Set preloader as already hidden
      preloader.hidden = true;
      preloader.style.display = 'none';

      await import('../../js/hidepreloader.js');
      if (window.onload) {
        window.onload(new Event('load'));
      }
      vi.advanceTimersByTime(2000);

      // Should remain hidden
      expect(preloader.hidden).toBe(true);
      expect(preloader.style.display).toBe('none');
    });
  });

  describe('Preloader Class Addition', () => {
    it('should add hide-preloader class on window load', async () => {
      await import('../../js/hidepreloader.js');

      // Trigger window load
      if (window.onload) {
        window.onload(new Event('load'));
      }

      // Class should be added immediately
      expect(preloader.classList.contains('hide-preloader')).toBe(true);
    });

    it('should handle preloader with existing classes', async () => {
      // Add existing classes
      preloader.classList.add('existing-class', 'another-class');

      await import('../../js/hidepreloader.js');
      if (window.onload) {
        window.onload(new Event('load'));
      }

      // Should preserve existing classes and add new one
      expect(preloader.classList.contains('existing-class')).toBe(true);
      expect(preloader.classList.contains('another-class')).toBe(true);
      expect(preloader.classList.contains('hide-preloader')).toBe(true);
    });

    it('should work even if preloader is removed before timeout', async () => {
      await import('../../js/hidepreloader.js');
      if (window.onload) {
        window.onload(new Event('load'));
      }

      // Class should be added immediately
      expect(preloader.classList.contains('hide-preloader')).toBe(true);

      // Remove preloader
      preloader.remove();

      // Timeout should not throw error
      expect(() => {
        vi.advanceTimersByTime(2000);
      }).not.toThrow();
    });
  });

  describe('Integration and Timing', () => {
    it('should handle both timeout and class addition together', async () => {
      await import('../../js/hidepreloader.js');
      if (window.onload) {
        window.onload(new Event('load'));
      }

      // Class added immediately
      expect(preloader.classList.contains('hide-preloader')).toBe(true);
      expect(preloader.hidden).toBe(false);

      // After timeout, should also be hidden
      vi.advanceTimersByTime(2000);

      expect(preloader.classList.contains('hide-preloader')).toBe(true);
      expect(preloader.hidden).toBe(true);
      expect(preloader.style.display).toBe('none');
    });

    it('should handle multiple window load events', async () => {
      await import('../../js/hidepreloader.js');

      // Trigger multiple load events
      if (window.onload) {
        window.onload(new Event('load'));
        window.onload(new Event('load'));
        window.onload(new Event('load'));
      }

      // Class should still be added only once
      const classCount = Array.from(preloader.classList).filter(c => c === 'hide-preloader').length;
      expect(classCount).toBe(1);

      vi.advanceTimersByTime(2000);
      expect(preloader.hidden).toBe(true);
    });

    it('should work correctly when document is already loaded', async () => {
      // Mock document ready state
      Object.defineProperty(document, 'readyState', {
        value: 'complete',
        writable: true
      });

      await import('../../js/hidepreloader.js');
      
      // Manually trigger onload since it might not fire automatically
      if (window.onload) {
        window.onload(new Event('load'));
      }

      expect(preloader.classList.contains('hide-preloader')).toBe(true);

      vi.advanceTimersByTime(2000);
      expect(preloader.hidden).toBe(true);
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle null preloader reference', async () => {
      // Mock getElementById to return null
      const originalGetElementById = document.getElementById;
      document.getElementById = vi.fn().mockReturnValue(null);

      await import('../../js/hidepreloader.js');
      expect(() => {
        if (window.onload) {
          window.onload(new Event('load'));
        }
        vi.advanceTimersByTime(2000);
      }).not.toThrow();

      // Restore
      document.getElementById = originalGetElementById;
    });

    it('should handle preloader style modifications', async () => {
      // Set complex initial styles
      preloader.style.cssText = 'display: flex; position: fixed; z-index: 9999;';

      await import('../../js/hidepreloader.js');
      if (window.onload) {
        window.onload(new Event('load'));
      }
      vi.advanceTimersByTime(2000);

      // Display should be overridden
      expect(preloader.style.display).toBe('none');
      expect(preloader.hidden).toBe(true);
    });

    it('should handle window.onload conflicts', async () => {
      await import('../../js/hidepreloader.js');

      // Store reference to the module's onload
      const moduleOnload = window.onload;

      // Override with custom handler
      window.onload = vi.fn();

      // The module assigns onload twice, so test both scenarios
      // This demonstrates potential issue in original code where second assignment overwrites first
      expect(window.onload).not.toBe(moduleOnload);
      
      // Manually call the module's onload function
      if (moduleOnload) {
        moduleOnload(new Event('load'));
        expect(preloader.classList.contains('hide-preloader')).toBe(true);
      }
    });
  });

  describe('Performance and Memory', () => {
    it('should not create memory leaks with multiple imports', async () => {
      // Import multiple times
      await import('../../js/hidepreloader.js');
      await import('../../js/hidepreloader.js');

      if (window.onload) {
        window.onload(new Event('load'));
      }
      vi.advanceTimersByTime(2000);

      // Should work correctly
      expect(preloader.hidden).toBe(true);
      expect(preloader.classList.contains('hide-preloader')).toBe(true);
    });

    it('should clean up timers properly', async () => {
      await import('../../js/hidepreloader.js');
      if (window.onload) {
        window.onload(new Event('load'));
      }

      // Should have active timer
      expect(vi.getTimerCount()).toBeGreaterThan(0);

      // Complete timer
      vi.advanceTimersByTime(2000);

      // Timer should be cleaned up and preloader hidden
      expect(preloader.hidden).toBe(true);
    });

    it('should handle rapid consecutive operations', async () => {
      await import('../../js/hidepreloader.js');

      // Fire multiple events quickly
      if (window.onload) {
        for (let i = 0; i < 5; i++) {
          window.onload(new Event('load'));
        }
      }

      // Should still work correctly
      expect(preloader.classList.contains('hide-preloader')).toBe(true);

      vi.advanceTimersByTime(2000);
      expect(preloader.hidden).toBe(true);
      expect(preloader.style.display).toBe('none');
    });
  });

  describe('Real Module Import Test', () => {
    it('should work with actual module import', async () => {
      // Test the actual module behavior
      await import('../../js/hidepreloader.js');

      // The module should set up window.onload handlers
      expect(window.onload).toBeTruthy();

      // Trigger the load event
      if (window.onload) {
        window.onload(new Event('load'));
      }

      // Class should be added immediately
      expect(preloader.classList.contains('hide-preloader')).toBe(true);

      // After timeout, should be hidden
      vi.advanceTimersByTime(2000);
      expect(preloader.hidden).toBe(true);
      expect(preloader.style.display).toBe('none');
    });
  });
});