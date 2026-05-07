const autoprefixer = require("autoprefixer");
const cssnano = require('cssnano');
const purgeCSSPlugin = require("@fullhuman/postcss-purgecss");
const IN_PRODUCTION = process.env.NODE_ENV === "production";
const bootstrap = "node_modules/bootstrap"


module.exports = {
  plugins: [
    IN_PRODUCTION &&
    purgeCSSPlugin({
      content: [
        "index.html",
        "./src/**/*.js",
      ],
      defaultExtractor(content) {
        const contentWithoutStyleBlocks = content.replace(
          /<style[^]+?<\/style>/gi,
          ""
        );
        return (
          contentWithoutStyleBlocks.match(
            /[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g
          ) || []
        );
      },
      keyframes: true,
      variables: true,
      safelist: [
        /^(bx|bxs|bxl)-/,
        /^(carousel|glide)/,
      ],
    }),

    IN_PRODUCTION && autoprefixer,

    IN_PRODUCTION &&
      cssnano({
        preset: ["default", { discardComments: { removeAll: true } }],
      }),
  ],
};
