import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('Footer Module', () => {
  beforeEach(() => {
    // Reset modules to ensure fresh imports
    vi.resetModules();

    // Reset DOM
    document.body.innerHTML = '';
  });

  describe('Year Display Functionality', () => {
    it('should set the current year when element exists', async () => {
      // Arrange: Create year element BEFORE importing module
      const yearElement = document.createElement('div');
      yearElement.id = 'year';
      document.body.appendChild(yearElement);

      // Act: Import the module (executes immediately)
      await import('../../js/footer.js');

      // Assert: Year should be set to current year
      const currentYear = new Date().getFullYear().toString();
      expect(yearElement.innerHTML).toBe(currentYear);
    });

    it('should work with different HTML element types', async () => {
      // Test with span element
      const spanElement = document.createElement('span');
      spanElement.id = 'year';
      document.body.appendChild(spanElement);

      await import('../../js/footer.js');

      const currentYear = new Date().getFullYear().toString();
      expect(spanElement.innerHTML).toBe(currentYear);
    });

    it('should work with element in nested DOM structure', async () => {
      // Create nested structure: footer > div > span#year
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
      // Create multiple elements
      const otherElement = document.createElement('div');
      otherElement.id = 'other';
      otherElement.innerHTML = 'original content';

      const yearElement = document.createElement('div');
      yearElement.id = 'year';
      yearElement.innerHTML = 'placeholder';

      document.body.appendChild(otherElement);
      document.body.appendChild(yearElement);

      await import('../../js/footer.js');

      // Year element should be updated
      const currentYear = new Date().getFullYear().toString();
      expect(yearElement.innerHTML).toBe(currentYear);

      // Other elements should remain unchanged
      expect(otherElement.innerHTML).toBe('original content');
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should throw error when year element does not exist', async () => {
      // Don't create the year element

      // The module will throw because getElementById returns null
      await expect(async () => {
        await import('../../js/footer.js');
      }).rejects.toThrow();
    });

    it('should throw error when year element is removed before import', async () => {
      // Create element then remove it
      const yearElement = document.createElement('div');
      yearElement.id = 'year';
      document.body.appendChild(yearElement);
      yearElement.remove();

      // Should throw because element no longer exists
      await expect(async () => {
        await import('../../js/footer.js');
      }).rejects.toThrow();
    });

    it('should handle year element with existing content', async () => {
      const yearElement = document.createElement('div');
      yearElement.id = 'year';
      yearElement.innerHTML = 'Old content 2020';
      document.body.appendChild(yearElement);

      await import('../../js/footer.js');

      // Should overwrite existing content
      const currentYear = new Date().getFullYear().toString();
      expect(yearElement.innerHTML).toBe(currentYear);
      expect(yearElement.innerHTML).not.toContain('Old content');
    });

    it('should handle year element with child nodes', async () => {
      const yearElement = document.createElement('div');
      yearElement.id = 'year';

      // Add child elements
      const span = document.createElement('span');
      span.textContent = 'Copyright ';
      yearElement.appendChild(span);

      document.body.appendChild(yearElement);

      await import('../../js/footer.js');

      // innerHTML assignment replaces all children
      const currentYear = new Date().getFullYear().toString();
      expect(yearElement.innerHTML).toBe(currentYear);
      expect(yearElement.querySelector('span')).toBeNull();
    });
  });

  describe('DOM Timing', () => {
    it('should work when element exists at import time', async () => {
      // This is the expected usage pattern
      const yearElement = document.createElement('div');
      yearElement.id = 'year';
      document.body.appendChild(yearElement);

      // Module import executes immediately
      await import('../../js/footer.js');

      const currentYear = new Date().getFullYear().toString();
      expect(yearElement.innerHTML).toBe(currentYear);
    });

    it('should document the timing requirement', async () => {
      // This test documents that the element must exist BEFORE import
      // The module executes immediately on import, so there's no way to
      // create the element after import starts - it will have already run

      // This is the correct order: element first, then import
      const yearElement = document.createElement('div');
      yearElement.id = 'year';
      document.body.appendChild(yearElement);

      await import('../../js/footer.js');

      const currentYear = new Date().getFullYear().toString();
      expect(yearElement.innerHTML).toBe(currentYear);

      // Note: If you import before creating the element, the module
      // will throw an error because getElementById returns null
    });
  });

  describe('Integration', () => {
    it('should integrate with typical footer HTML structure', async () => {
      // Simulate typical footer markup
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

      // Set up other global state
      window.testValue = 'original';
      document.body.dataset.test = 'unchanged';

      await import('../../js/footer.js');

      // Other state should be unaffected
      expect(window.testValue).toBe('original');
      expect(document.body.dataset.test).toBe('unchanged');

      // But year should be set
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

      // Should be 4 digits
      expect(yearElement.innerHTML).toMatch(/^\d{4}$/);
    });

    it('should set a reasonable year value', async () => {
      const yearElement = document.createElement('div');
      yearElement.id = 'year';
      document.body.appendChild(yearElement);

      await import('../../js/footer.js');

      const year = parseInt(yearElement.innerHTML, 10);

      // Should be a reasonable year (2020-2100)
      expect(year).toBeGreaterThanOrEqual(2020);
      expect(year).toBeLessThan(2100);
    });

    it('should match JavaScript Date object year', async () => {
      const yearElement = document.createElement('div');
      yearElement.id = 'year';
      document.body.appendChild(yearElement);

      // Capture year before import
      const expectedYear = new Date().getFullYear();

      await import('../../js/footer.js');

      // Should match the year we captured
      expect(parseInt(yearElement.innerHTML, 10)).toBe(expectedYear);
    });
  });
});
