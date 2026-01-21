// .eleventy.js
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const dayjs = require("dayjs");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/assets");

  // Add Syntax Highlighting plugin
  eleventyConfig.addPlugin(syntaxHighlight, {

    // Line separator for line breaks
    lineSeparator: "\n",

    // Change which Eleventy template formats use syntax highlighters
    templateFormats: ["*"], // default

    // Use only a subset of template types (11ty.js added in v4.0.0)
    // templateFormats: ["liquid", "njk", "md", "11ty.js"],

    // init callback lets you customize Prism
    init: function({ Prism }) {
      Prism.languages.myCustomLanguage = { /* … */ };
    },

    // Added in 3.1.1, add HTML attributes to the <pre> or <code> tags
    preAttributes: {
      tabindex: 0,

      // Added in 4.1.0 you can use callback functions too
      "data-language": function({ language, content, options }) {
        return language;
      }
    },
    codeAttributes: {},
  });

  // Added in 5.0.0, throw errors on invalid language names
  errorOnInvalidLanguage: false,

  // Add dayjs date filter
  eleventyConfig.addFilter("date", function(date, format) {
    return dayjs(date).format(format);
  });

  return {
	dir: {
	  input: "src",
	  output: "public"
	},
	markdownTemplateEngine: "njk"
  };
};