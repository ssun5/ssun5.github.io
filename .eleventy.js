// .eleventy.js
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const mathjaxPlugin = require("eleventy-plugin-mathjax");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/assets");

  // Add Syntax Highlighting plugin
  eleventyConfig.addPlugin(syntaxHighlight);

  // Add MathJax plugin with custom configuration
  eleventyConfig.addPlugin(mathjaxPlugin, {
    packages: ['base', 'ams'],              // extensions to use (include ams for equation numbering)
    tex: {
        packages: ['base', 'ams'],
        inlineMath: [                    // start/end delimiter pairs for in-line math
        ['\\(', '\\)']
        ],
        displayMath: [                   // start/end delimiter pairs for display math
          ['$$', '$$'],
          ['\\[', '\\]']
        ],
        processEscapes: true,            // use \$ to produce a literal dollar sign
        processEnvironments: true,       // process \begin{xxx}...\end{xxx} outside math mode
        tags: 'ams',                      // use AMS-style automatic equation numbering; change to 'all' to number every display math
    },
    options: {
        ignoreHtmlClass: {'[+]': ['mathjax_ignore']},    //  class that marks tags not to search
    }

  });

  return {
	dir: {
	  input: "src",
	  output: "public"
	},
	markdownTemplateEngine: "njk"
  };
};