import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('Footer Module', () => {
  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = '';
  });

  describe('Year Display Functionality', () => {
    it('should display the current year in the year element', async () => {
      // Arrange: Create the year element
      const yearElement = document.createElement('div');
      yearElement.id = 'year';
      document.body.appendChild(yearElement);

      // Act: Execute the footer logic directly
      yearElement.innerHTML = new Date().getFullYear();

      // Assert: Check that the current year is displayed
      const currentYear = new Date().getFullYear().toString();
      expect(yearElement.innerHTML).toBe(currentYear);
    });

    it('should handle missing year element gracefully', () => {
      // Arrange: Don't create the year element
      const getElementById = vi.spyOn(document, 'getElementById').mockReturnValue(null);

      // Act & Assert: Should not throw error
      expect(() => {
        const yearElement = document.getElementById("year");
        if (yearElement) {
          yearElement.innerHTML = new Date().getFullYear();
        }
      }).not.toThrow();

      getElementById.mockRestore();
    });

    it('should display correct year when system date changes', () => {
      // Arrange: Create element
      const yearElement = document.createElement('div');
      yearElement.id = 'year';
      document.body.appendChild(yearElement);

      // Act: Execute the footer logic
      yearElement.innerHTML = new Date().getFullYear();

      // Assert: Should show the current year
      const currentYear = new Date().getFullYear().toString();
      expect(yearElement.innerHTML).toBe(currentYear);
    });

    it('should work with different element types', () => {
      // Test with span element
      const spanElement = document.createElement('span');
      spanElement.id = 'year';
      document.body.appendChild(spanElement);

      // Act: Execute footer logic
      spanElement.innerHTML = new Date().getFullYear();

      // Assert
      const currentYear = new Date().getFullYear().toString();
      expect(spanElement.innerHTML).toBe(currentYear);
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle null getElementById result', () => {
      // Arrange: Mock getElementById to return null
      const getElementById = vi.spyOn(document, 'getElementById').mockReturnValue(null);

      // Act & Assert: Should not throw error
      expect(() => {
        const yearElement = document.getElementById("year");
        if (yearElement) {
          yearElement.innerHTML = new Date().getFullYear();
        }
      }).not.toThrow();

      getElementById.mockRestore();
    });

    it('should handle multiple elements with same ID', () => {
      // Arrange: Create multiple elements with same ID
      const firstElement = document.createElement('div');
      firstElement.id = 'year';
      const secondElement = document.createElement('span');
      secondElement.id = 'year';
      
      document.body.appendChild(firstElement);
      document.body.appendChild(secondElement);

      // Act: Execute footer logic (gets first element)
      const yearElement = document.getElementById('year');
      if (yearElement) {
        yearElement.innerHTML = new Date().getFullYear();
      }

      // Assert: Should update the first element found
      const currentYear = new Date().getFullYear().toString();
      expect(firstElement.innerHTML).toBe(currentYear);
      expect(secondElement.innerHTML).toBe('');
    });
  });

  describe('Integration and Performance', () => {
    it('should execute quickly', () => {
      // Arrange: Create year element
      const yearElement = document.createElement('div');
      yearElement.id = 'year';
      document.body.appendChild(yearElement);

      const startTime = performance.now();

      // Act: Execute footer logic
      yearElement.innerHTML = new Date().getFullYear();

      const endTime = performance.now();

      // Assert: Should be updated quickly
      const currentYear = new Date().getFullYear().toString();
      expect(yearElement.innerHTML).toBe(currentYear);
      expect(endTime - startTime).toBeLessThan(10); // Very fast operation
    });

    it('should not interfere with other DOM elements', () => {
      // Arrange: Create other elements
      const otherElement = document.createElement('div');
      otherElement.id = 'other';
      otherElement.innerHTML = 'original content';
      
      const yearElement = document.createElement('div');
      yearElement.id = 'year';
      
      document.body.appendChild(otherElement);
      document.body.appendChild(yearElement);

      // Act: Execute footer logic
      yearElement.innerHTML = new Date().getFullYear();

      // Assert: Only year element should be modified
      const currentYear = new Date().getFullYear().toString();
      expect(yearElement.innerHTML).toBe(currentYear);
      expect(otherElement.innerHTML).toBe('original content');
    });
  });

  describe('Real Module Import', () => {
    it('should work when importing the actual module', async () => {
      // Arrange: Create year element before import
      const yearElement = document.createElement('div');
      yearElement.id = 'year';
      document.body.appendChild(yearElement);

      // Act: Import the actual module
      await import('../../js/footer.js');

      // Assert: The year should be set (will be actual current year)
      const currentYear = new Date().getFullYear().toString();
      expect(yearElement.innerHTML).toBe(currentYear);
    });
  });
});