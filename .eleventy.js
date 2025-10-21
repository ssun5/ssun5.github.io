// .eleventy.js
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/assets");

  // Add Syntax Highlighting plugin
  eleventyConfig.addPlugin(syntaxHighlight);

  return {
	dir: {
	  input: "src",
	  output: "public"
	},
	markdownTemplateEngine: "njk"
  };
};