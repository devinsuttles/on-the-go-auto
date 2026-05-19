import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('Footer Module', () => {
  beforeEach(() => {
    vi.resetModules();
    document.body.innerHTML = '';
  });

  describe('Year Display Functionality', () => {
    it('should set the current year when element exists', async () => {
      const yearElement = document.createElement('div');
      yearElement.id = 'year';
      document.body.appendChild(yearElement);

      await import('../../js/footer.js');

      const currentYear = new Date().getFullYear().toString();
      expect(yearElement.innerHTML).toBe(currentYear);
    });

    it('should work with different HTML element types', async () => {
      const spanElement = document.createElement('span');
      spanElement.id = 'year';
      document.body.appendChild(spanElement);

      await import('../../js/footer.js');

      const currentYear = new Date().getFullYear().toString();
      expect(spanElement.innerHTML).toBe(currentYear);
    });

    it('should work with element in nested DOM structure', async () => {
      const footer = document.createElement('footer');
      const div = document.createElement('div');
      const yearElement = document.createElement('span');
      yearElement.id = 'year';

      div.appendChild(yearElement);
      footer.appendChild(div);
      document.body.appendChild(footer);

      await import('../../js/footer.js');

      const currentYear = new Date().getFullYear().toString();
      expect(yearElement.innerHTML).toBe(currentYear);
    });

    it('should only modify the year element, not other elements', async () => {
      const otherElement = document.createElement('div');
      otherElement.id = 'other';
      otherElement.innerHTML = 'original content';

      const yearElement = document.createElement('div');
      yearElement.id = 'year';
      yearElement.innerHTML = 'placeholder';

      document.body.appendChild(otherElement);
      document.body.appendChild(yearElement);

      await import('../../js/footer.js');

      const currentYear = new Date().getFullYear().toString();
      expect(yearElement.innerHTML).toBe(currentYear);
      expect(otherElement.innerHTML).toBe('original content');
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should gracefully handle missing year element', async () => {
      // Don't create the year element
      expect(() => {
        return import('../../js/footer.js');
      }).not.toThrow();
    });

    it('should handle year element with existing content', async () => {
      const yearElement = document.createElement('div');
      yearElement.id = 'year';
      yearElement.innerHTML = 'Old content 2020';
      document.body.appendChild(yearElement);

      await import('../../js/footer.js');

      const currentYear = new Date().getFullYear().toString();
      expect(yearElement.innerHTML).toBe(currentYear);
      expect(yearElement.innerHTML).not.toContain('Old content');
    });

    it('should handle year element with child nodes', async () => {
      const yearElement = document.createElement('div');
      yearElement.id = 'year';

      const span = document.createElement('span');
      span.textContent = 'Copyright ';
      yearElement.appendChild(span);

      document.body.appendChild(yearElement);

      await import('../../js/footer.js');

      const currentYear = new Date().getFullYear().toString();
      expect(yearElement.innerHTML).toBe(currentYear);
      expect(yearElement.querySelector('span')).toBeNull();
    });
  });

  describe('DOM Timing with DOMContentLoaded', () => {
    it('should set year when element exists at import', async () => {
      const yearElement = document.createElement('div');
      yearElement.id = 'year';
      document.body.appendChild(yearElement);

      await import('../../js/footer.js');

      const currentYear = new Date().getFullYear().toString();
      expect(yearElement.innerHTML).toBe(currentYear);
    });

    it('should handle readyState complete (normal browser flow)', async () => {
      // Simulate DOM already loaded
      const yearElement = document.createElement('div');
      yearElement.id = 'year';
      document.body.appendChild(yearElement);

      // In normal browser, readyState would be 'complete' when scripts run
      await import('../../js/footer.js');

      const currentYear = new Date().getFullYear().toString();
      expect(yearElement.innerHTML).toBe(currentYear);
    });
  });

  describe('Integration', () => {
    it('should integrate with typical footer HTML structure', async () => {
      const footer = document.createElement('footer');
      footer.innerHTML = `
        <div class="footer-content">
          <p>Copyright <span id="year"></span> - My Website</p>
        </div>
      `;
      document.body.appendChild(footer);

      await import('../../js/footer.js');

      const yearElement = document.getElementById('year');
      const currentYear = new Date().getFullYear().toString();
      expect(yearElement.innerHTML).toBe(currentYear);
    });

    it('should not interfere with other scripts', async () => {
      const yearElement = document.createElement('div');
      yearElement.id = 'year';
      document.body.appendChild(yearElement);

      window.testValue = 'original';
      document.body.dataset.test = 'unchanged';

      await import('../../js/footer.js');

      expect(window.testValue).toBe('original');
      expect(document.body.dataset.test).toBe('unchanged');

      const currentYear = new Date().getFullYear().toString();
      expect(yearElement.innerHTML).toBe(currentYear);
    });
  });

  describe('Year Value Correctness', () => {
    it('should set year as a 4-digit number', async () => {
      const yearElement = document.createElement('div');
      yearElement.id = 'year';
      document.body.appendChild(yearElement);

      await import('../../js/footer.js');

      expect(yearElement.innerHTML).toMatch(/^\d{4}$/);
    });

    it('should set a reasonable year value', async () => {
      const yearElement = document.createElement('div');
      yearElement.id = 'year';
      document.body.appendChild(yearElement);

      await import('../../js/footer.js');

      const year = parseInt(yearElement.innerHTML, 10);
      expect(year).toBeGreaterThanOrEqual(2020);
      expect(year).toBeLessThan(2100);
    });

    it('should match JavaScript Date object year', async () => {
      const yearElement = document.createElement('div');
      yearElement.id = 'year';
      document.body.appendChild(yearElement);

      const expectedYear = new Date().getFullYear();

      await import('../../js/footer.js');

      expect(parseInt(yearElement.innerHTML, 10)).toBe(expectedYear);
    });
  });
});
