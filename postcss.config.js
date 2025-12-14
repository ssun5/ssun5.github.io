const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {
      // Configure browser support explicitly if needed
      overrideBrowserslist: [
        "> 1%",
        "last 2 versions",
        "not dead"
      ]
    },
    ...(isProduction && { 
      cssnano: { 
        preset: ["default", {
          // Ensure better cross-browser compatibility
          normalizeWhitespace: false,
          discardComments: { removeAll: true }
        }]
      } 
    }),
  }
}