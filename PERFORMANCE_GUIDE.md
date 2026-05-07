# Performance Optimization Guide

## Completed Optimizations ✅

### Code-Level Improvements
- **Deferred module script**: Module scripts don't block HTML parsing (module scripts are deferred by default)
- **Removed unused JavaScript**: Eliminated `whyus.js` which referenced non-existent DOM elements (~2KB savings)
- **Reduced forced reflow**: Only update DOM when values actually change, avoiding unnecessary layout recalculations
- **CSS inlining**: Production build inlines CSS to eliminate render-blocking stylesheets (295KB → 53KB CSS with PurgeCSS)

### Build Configuration
- **PurgeCSS**: Removes unused Bootstrap CSS classes in production (82% CSS reduction)
- **Minification**: HTML, CSS, and JavaScript are minified
- **Web fonts optimization**: Fonts downloaded and served offline in production

## Remaining Lighthouse Issues & Solutions

### 1. Cache Lifetimes (13 KiB potential savings)

**Issue**: Static assets don't have proper browser cache headers, causing the browser to re-download them unnecessarily.

**Solution**: Add cache-control headers for static assets. Choose based on your deployment platform:

#### For Apache (`.htaccess`):
```apache
<IfModule mod_expires.c>
  ExpiresActive On
  
  # Images
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  
  # Fonts
  ExpiresByType font/ttf "access plus 1 year"
  ExpiresByType font/otf "access plus 1 year"
  ExpiresByType application/font-woff "access plus 1 year"
  
  # Versioned assets (these should have long cache)
  ExpiresByType text/javascript "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType text/css "access plus 1 year"
  
  # HTML (short cache to ensure updates)
  ExpiresByType text/html "access plus 0 seconds"
  ExpiresDefault "access plus 0 seconds"
</IfModule>
```

#### For Netlify (`_headers` file):
```
/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*.webp
  Cache-Control: public, max-age=31536000, immutable

/*.svg
  Cache-Control: public, max-age=31536000, immutable

/*.woff2
  Cache-Control: public, max-age=31536000, immutable

/index.html
  Cache-Control: public, max-age=0, must-revalidate

/*.js
  Cache-Control: public, max-age=31536000
```

#### For Node.js/Express:
```javascript
app.use(express.static('dist', {
  maxAge: '1y',
  etag: false
}));

app.get('/index.html', (req, res) => {
  res.set('Cache-Control', 'public, max-age=0, must-revalidate');
  res.sendFile('./dist/index.html');
});
```

### 2. Network Dependency Tree (Request Order Optimization)

**Issue**: Resources are being requested in a non-optimal order, creating dependencies that block rendering.

**Solutions**:

#### Add Resource Hints (in `index.html` head):
```html
<!-- Preconnect to critical domains -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="https://www.googletagmanager.com">

<!-- Preload critical fonts -->
<link rel="preload" href="/assets/fonts/montserrat.woff2" as="font" type="font/woff2" crossorigin>

<!-- Prefetch secondary resources -->
<link rel="prefetch" href="/assets/images/header-bg.webp">
```

#### Optimize Script Loading (already done):
- ✅ Module scripts are at the end of body (deferred by default)
- ✅ Google Analytics is async
- ✅ Calendly widget is lazy-loaded

#### Content Delivery:
- Consider using a CDN to serve static assets closer to users
- Use HTTP/2 push for critical resources if available
- Compress responses with gzip/brotli (usually handled by server)

### 3. Other Considerations

#### Image Optimization:
The site already uses WebP images which is good. Consider:
- Using `<picture>` tags with JPEG fallbacks for better browser support
- Implementing lazy loading for below-the-fold images

#### Third-Party Scripts:
- Google Analytics is already async (good)
- Consider moving analytics script to `<head>` with async attribute (currently at end of body)

## Performance Metrics Impact

Based on Lighthouse report, these optimizations address:
- **Render-blocking requests**: Reduced by 880ms (via CSS inlining and script deferring)
- **Unused JavaScript**: Reduced by removing whyus.js
- **Unused CSS**: Reduced by 82% (295KB → 53KB via PurgeCSS)
- **Forced reflow**: Reduced by minimizing unnecessary DOM updates
- **Cache lifetimes**: Can add 13KiB savings with proper cache headers
- **Network dependency tree**: Can be optimized with resource hints

## Monitoring Performance

After implementing these changes:
1. Run Lighthouse audit again to measure improvements
2. Use Chrome DevTools Performance tab to profile scroll performance
3. Monitor Core Web Vitals (LCP, FID, CLS)
4. Test on real devices and slow connections

## Build Commands

```bash
# Development with hot reload
npm run dev

# Production build with all optimizations
npm run build

# Preview production build
npm preview

# Run tests
npm test
```

All optimizations are applied automatically during `npm run build` and are configured in:
- `vite.config.js` - Build configuration and plugins
- `postcss.config.cjs` - PurgeCSS and CSS minification
- `index.html` - Resource hints and critical resources
