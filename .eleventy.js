// .eleventy.js
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const dayjs = require("dayjs");
const Prism = require("prismjs");
// Load languages you need (add more as needed)
require("prismjs/components/prism-javascript");
require("prismjs/components/prism-css");
require("prismjs/components/prism-markup");
require("prismjs/components/prism-bash");
require("prismjs/components/prism-python");
require("prismjs/components/prism-json");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/assets");

  // Add Syntax Highlighting plugin
  eleventyConfig.addPlugin(syntaxHighlight);

  // Add dayjs date filter
  eleventyConfig.addFilter("date", function(date, format) {
    return dayjs(date).format(format);
  });

  // Add PrismJS syntax highlighting filter
  eleventyConfig.addFilter("prism", function(code, language) {
    if (!language) language = "markup";
    if (Prism.languages[language]) {
      return Prism.highlight(code, Prism.languages[language], language);
    }
    return code; // Return unhighlighted if language not found
  });

  return {
	dir: {
	  input: "src",
	  output: "public"
	},
	markdownTemplateEngine: "njk"
  };
};