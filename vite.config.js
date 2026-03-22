import { defineConfig } from "vite";
import webfontDownload from "vite-plugin-webfont-dl";
import { ViteMinifyPlugin } from "vite-plugin-minify";
import obfuscator from "vite-plugin-javascript-obfuscator";
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

    /* ## Obfuscate JavaScript in production using javascript-obfuscator (open source)
    --------------------------------------------- */
    IN_PRODUCTION && obfuscator({
      options: {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.5,
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 0.2,
        debugProtection: false,
        disableConsoleOutput: false,
        identifierNamesGenerator: "hexadecimal",
        log: false,
        numbersToExpressions: true,
        renameGlobals: false,
        selfDefending: true,
        simplify: true,
        splitStrings: true,
        splitStringsChunkLength: 10,
        stringArray: true,
        stringArrayCallsTransform: true,
        stringArrayEncoding: ["base64"],
        stringArrayIndexShift: true,
        stringArrayRotate: true,
        stringArrayShuffle: true,
        stringArrayWrappersCount: 2,
        stringArrayWrappersType: "function",
        transformObjectKeys: true,
        unicodeEscapeSequence: false,
      },
    }),
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
