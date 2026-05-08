import { defineConfig } from "vite";
import webfontDownload from "vite-plugin-webfont-dl";
import { ViteMinifyPlugin } from "vite-plugin-minify";
const IN_PRODUCTION = process.env.NODE_ENV === "production";
const IN_DEVELOPMENT = process.env.NODE_ENV === "development";

// Hide Preloader while in development.
const hidePreloader = () => {
  return {
    name: "hide-preloader",
    transformIndexHtml(html) {
      return html.replace(
        `<link rel="stylesheet" href="./src/css/preloader.min.css" type="text/css">`,
        `<!-- <link rel="stylesheet" href="./src/css/preloader.min.css" type="text/css"> -->`
      );
    }
  }
}

// Split CSS into critical and non-critical for async loading
const splitCss = () => ({
  name: "split-css",
  enforce: "post",
  apply: "build",
  transformIndexHtml: {
    order: "post",
    handler(html, { bundle }) {
      if (!bundle) return html;
      let inlinedCss = "";
      const cssFiles = [];

      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (fileName.endsWith(".css") && chunk.type === "asset") {
          const baseName = fileName.split("/").pop().replace(/\./g, "\\.");
          // Extract all CSS content
          inlinedCss += chunk.source;
          cssFiles.push(baseName);
          // Remove from bundle since we're inlining
          delete bundle[fileName];
        }
      }

      if (inlinedCss) {
        // Replace link tags with inlined style
        cssFiles.forEach(baseName => {
          html = html.replace(
            new RegExp(`<link[^>]*${baseName}[^>]*>`),
            ""
          );
        });
        // Inline all CSS in a single style tag
        html = html.replace(
          "</head>",
          `<style>${inlinedCss}</style></head>`
        );
      }
      return html;
    },
  },
});

export default defineConfig({
  plugins: [

    /* ## Hide Preloader while in Development
    --------------------------------------------- */
    IN_DEVELOPMENT && hidePreloader(),

    /* ## Download Google Fonts and attach them with production build for offline use
    --------------------------------------------- */
    IN_PRODUCTION && webfontDownload(
      [
        "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap",
      ]
    ),

    /* ## Minify the output HTML files in production
    --------------------------------------------- */
    IN_PRODUCTION && ViteMinifyPlugin({}),

    /* ## Split CSS for critical path optimization
    --------------------------------------------- */
    IN_PRODUCTION && splitCss(),

  ],

  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' // or "modern"
      }
    }
  },

  base: "./",
  server: {
    port: 3000,
  },

  build: {
    // outDir: "./docs",
    minify: 'terser',
    terserOptions: {
      format: {
        comments: false,
      },
    },
  },

});
