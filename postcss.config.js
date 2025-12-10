const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
    ...(isProduction && { cssnano: { preset: "default" } }),
  }
}