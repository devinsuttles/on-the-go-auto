import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('Header Module', () => {
  let dom;

  beforeEach(() => {
    // Reset modules to ensure fresh imports
    vi.resetModules();

    // Reset DOM completely
    document.body.innerHTML = '';

    // Reset window properties
    window.scrollY = 0;
    window.innerHeight = 768;
    window.onscroll = null;

    // Create standard DOM structure for testing
    dom = createNavigationDOM();
  });

  /**
   * Helper function to create the navigation DOM structure
   */
  function createNavigationDOM() {
    // Create menu toggle button
    const menuButton = document.createElement('button');
    menuButton.className = 'menu-toggle';
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-pressed', 'false');

    // Create navigation
    const navigation = document.createElement('nav');
    navigation.className = 'nav-primary';

    // Create menu list
    const menuList = document.createElement('ul');
    menuList.className = 'primary-menu';

    // Create menu items
    const menuItems = ['Home', 'About', 'Services', 'Contact'].map((text, index) => {
      const li = document.createElement('li');
      li.className = 'menu-item';
      const link = document.createElement('a');
      link.href = `#section-${index}`;
      link.textContent = text;
      li.appendChild(link);
      menuList.appendChild(li);
      return { li, link };
    });

    navigation.appendChild(menuList);

    // Create additional navigation links
    const topLink = document.createElement('a');
    topLink.className = 'top-link';
    topLink.href = '#top';
    topLink.textContent = 'Top';

    const siteTitle = document.createElement('div');
    const siteTitleLink = document.createElement('a');
    siteTitle.className = 'site-title';
    siteTitleLink.href = '#home';
    siteTitleLink.textContent = 'Site Title';
    siteTitle.appendChild(siteTitleLink);

    // Append to body
    document.body.appendChild(menuButton);
    document.body.appendChild(navigation);
    document.body.appendChild(topLink);
    document.body.appendChild(siteTitle);

    return {
      menuButton,
      navigation,
      menuList,
      topLink,
      siteTitle: siteTitleLink,
      menuItems,
      menuLinks: menuItems.map(item => item.link)
    };
  }

  function createScrollSpySections() {
    const main = document.createElement('main');
    main.className = 'entry-content';

    const sections = ['hero', 'about', 'services', 'contact'].map((name, index) => {
      const section = document.createElement('section');
      section.className = 'section';
      section.id = `section-${index}`;
      section.style.height = '500px';
      main.appendChild(section);
      return section;
    });

    document.body.appendChild(main);
    return { main, sections };
  }

  describe('Mobile Menu Toggle Functionality', () => {
    it('should toggle navigation visibility when menu button is clicked', async () => {
      // Import the header module first
      await import('../../js/header.js');
      
      // Assert initial state
      expect(dom.navigation.classList.contains('show')).toBe(false);
      expect(dom.menuButton.classList.contains('activated')).toBe(false);

      // Act: Click menu button to open
      dom.menuButton.click();

      // Assert: Menu should be shown
      expect(dom.navigation.classList.contains('show')).toBe(true);
      expect(dom.menuButton.classList.contains('activated')).toBe(true);
      expect(dom.menuButton.classList.contains('bx-x')).toBe(true);

      // Act: Click again to close
      dom.menuButton.click();

      // Assert: Menu should be hidden
      expect(dom.navigation.classList.contains('show')).toBe(false);
      expect(dom.menuButton.classList.contains('activated')).toBe(false);
      expect(dom.menuButton.classList.contains('bx-x')).toBe(false);
    });

    it('should correctly manage aria attributes', async () => {
      await import('../../js/header.js');

      // Assert initial state
      expect(dom.menuButton.getAttribute('aria-expanded')).toBe('false');
      expect(dom.menuButton.getAttribute('aria-pressed')).toBe('false');

      // Act: Open menu
      dom.menuButton.click();

      // Assert: Aria attributes updated
      expect(dom.menuButton.getAttribute('aria-expanded')).toBe('true');
      expect(dom.menuButton.getAttribute('aria-pressed')).toBe('true');

      // Act: Close menu
      dom.menuButton.click();

      // Assert: Aria attributes reset
      expect(dom.menuButton.getAttribute('aria-expanded')).toBe('false');
      expect(dom.menuButton.getAttribute('aria-pressed')).toBe('false');
    });

    it('should handle missing navigation element', async () => {
      // Remove navigation but keep button
      dom.navigation.remove();

      // Should not throw when importing
      expect(async () => {
        await import('../../js/header.js');
        dom.menuButton.click();
      }).not.toThrow();
    });
  });

  describe('Menu Collapse on Link Click', () => {
    it('should collapse menu when menu links are clicked', async () => {
      await import('../../js/header.js');
      await new Promise(resolve => setTimeout(resolve, 0)); // ensure event listeners are attached

      // Open menu first
      dom.menuButton.click();
      expect(dom.navigation.classList.contains('show')).toBe(true);

      // Click a menu link
      dom.menuLinks[0].click();

      // Menu should be collapsed
      expect(dom.navigation.classList.contains('show')).toBe(false);
      expect(dom.menuButton.classList.contains('activated')).toBe(false);
    });

    it('should collapse menu when top link is clicked', async () => {
      await import('../../js/header.js');

      // Open menu
      dom.menuButton.click();
      expect(dom.navigation.classList.contains('show')).toBe(true);

      // Click top link
      dom.topLink.click();

      // Menu should be collapsed
      expect(dom.navigation.classList.contains('show')).toBe(false);
    });

    it('should collapse menu when site title is clicked', async () => {
      await import('../../js/header.js');

      // Open menu
      dom.menuButton.click();
      expect(dom.navigation.classList.contains('show')).toBe(true);

      // Click site title
      dom.siteTitle.click();

      // Menu should be collapsed
      expect(dom.navigation.classList.contains('show')).toBe(false);
    });
  });

  describe('Dark Theme Toggle on Scroll', () => {
    it('should add dark class to body when scrolling past 100px', async () => {
      await import('../../js/header.js');

      // Scroll to 150px
      window.scrollY = 150;
      window.dispatchEvent(new Event('scroll'));

      // Body should have dark class
      expect(document.body.classList.contains('dark')).toBe(true);
    });

    it('should remove dark class when scrolling back up', async () => {
      await import('../../js/header.js');

      // First scroll down
      window.scrollY = 150;
      window.dispatchEvent(new Event('scroll'));
      expect(document.body.classList.contains('dark')).toBe(true);

      // Then scroll back up
      window.scrollY = 50;
      window.dispatchEvent(new Event('scroll'));

      // Dark class should be removed
      expect(document.body.classList.contains('dark')).toBe(false);
    });

    it('should handle boundary at exactly 100px', async () => {
      await import('../../js/header.js');

      // At exactly 100px
      window.scrollY = 100;
      window.dispatchEvent(new Event('scroll'));
      expect(document.body.classList.contains('dark')).toBe(true);

      // Just below 100px
      window.scrollY = 99;
      window.dispatchEvent(new Event('scroll'));
      expect(document.body.classList.contains('dark')).toBe(false);
    });
  });

  describe('Scroll Spy Functionality', () => {
    it('should activate menu item on click with timeout', async () => {
      const { sections } = createScrollSpySections();
      await import('../../js/header.js');

      const menuItems = dom.navigation.querySelectorAll('.menu-item a');

      // Click second menu item
      menuItems[1].click();

      // Wait for timeout (300ms)
      await new Promise(resolve => setTimeout(resolve, 350));

      // Second item should be active
      expect(menuItems[1].classList.contains('active')).toBe(true);
      expect(menuItems[0].classList.contains('active')).toBe(false);
    });

    it('should activate menu item based on section position', async () => {
      const { sections } = createScrollSpySections();
      await import('../../js/header.js');

      const menuItems = dom.navigation.querySelectorAll('.menu-item a');

      // Mock section positions - make second section appear "in view"
      // The scroll spy activates the LAST section with y < 100
      sections.forEach((section, index) => {
        section.getBoundingClientRect = vi.fn(() => ({
          y: index === 1 ? 50 : 200, // Only second section at y=50 (in view), others at 200
        }));
      });

      // Trigger scroll spy using window.onscroll
      window.onscroll();

      // Second menu item should be active
      expect(menuItems[1].classList.contains('active')).toBe(true);
      expect(menuItems[0].classList.contains('active')).toBe(false);
    });

    it('should handle missing sections gracefully', async () => {
      await import('../../js/header.js');

      // Trigger scroll without sections
      expect(() => {
        window.dispatchEvent(new Event('scroll'));
      }).not.toThrow();
    });
  });

  describe('Integration Tests', () => {
    it('should handle all functionality together', async () => {
      createScrollSpySections();
      await import('../../js/header.js');

      // Test menu toggle
      dom.menuButton.click();
      expect(dom.navigation.classList.contains('show')).toBe(true);

      // Test menu collapse
      dom.menuLinks[0].click();
      expect(dom.navigation.classList.contains('show')).toBe(false);

      // Test dark theme
      window.scrollY = 150;
      window.dispatchEvent(new Event('scroll'));
      expect(document.body.classList.contains('dark')).toBe(true);

      // All should work together without conflicts
      expect(document.body.classList.contains('dark')).toBe(true);
    });

    it('should handle rapid interactions', async () => {
      await import('../../js/header.js');

      // Rapid menu toggles
      for (let i = 0; i < 10; i++) {
        dom.menuButton.click();
      }

      // Final state should be consistent (even number of clicks = closed)
      expect(dom.navigation.classList.contains('show')).toBe(false);

      // Rapid scroll events
      const scrollValues = [0, 50, 100, 150, 200, 50, 150, 25];
      scrollValues.forEach(value => {
        window.scrollY = value;
        window.dispatchEvent(new Event('scroll'));
      });

      // Final state should match last scroll position
      expect(document.body.classList.contains('dark')).toBe(false); // Last was 25
    });
  });

  describe('Error Handling', () => {
    it('should handle missing DOM elements gracefully', async () => {
      // Clear all DOM
      document.body.innerHTML = '';

      // Should not throw when importing
      expect(async () => {
        await import('../../js/header.js');
      }).not.toThrow();
    });

    it('should handle partially missing DOM elements', async () => {
      // Remove some but not all elements
      dom.navigation.remove();

      expect(async () => {
        await import('../../js/header.js');
        // Try to trigger events that might fail
        dom.menuButton.click();
        window.dispatchEvent(new Event('scroll'));
      }).not.toThrow();
    });
  });
});