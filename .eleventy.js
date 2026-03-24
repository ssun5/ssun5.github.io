// .eleventy.js
const fs = require("fs");
const path = require("path");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const dayjs = require("dayjs");

function normalizePathPrefix() {
	const raw = process.env.BASE_PATH;
	if (raw === undefined || raw === "" || raw === "/") {
		return "/";
	}
	const withLeading = raw.startsWith("/") ? raw : `/${raw}`;
	return withLeading.endsWith("/") ? withLeading : `${withLeading}/`;
}

function escapeRegex(s) {
	return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

module.exports = function (eleventyConfig) {
	const pathPrefix = normalizePathPrefix();
	const baseNoTrail = pathPrefix.replace(/\/$/, "") || "";
	const pathSegment = baseNoTrail.replace(/^\//, "");

	eleventyConfig.addPassthroughCopy("./src/assets");

	eleventyConfig.addPlugin(syntaxHighlight, {
		lineSeparator: "\n",
		templateFormats: ["*"],
		init: function ({ Prism }) {
			Prism.languages.myCustomLanguage = {
				/* … */
			};
		},
		preAttributes: {
			tabindex: 0,
			"data-language": function ({ language }) {
				return language;
			},
		},
		codeAttributes: {},
		errorOnInvalidLanguage: false,
	});

	eleventyConfig.addFilter("date", function (date, format) {
		return dayjs(date).format(format);
	});

	// Prefix root-relative href/src from markdown/HTML bodies; skips URLs already rewritten by | url
	if (pathSegment) {
		const re = new RegExp(
			`(href|src)="/(?!${escapeRegex(pathSegment)}/)([^"]*)"`,
			"g",
		);
		eleventyConfig.addTransform("prefix-root-urls", function (content) {
			if (!this.outputPath?.endsWith(".html")) {
				return content;
			}
			return content.replace(re, `$1="${baseNoTrail}/$2"`);
		});
	}

	eleventyConfig.on("eleventy.after", () => {
		fs.writeFileSync(path.join("public", ".nojekyll"), "");
	});

	return {
		dir: {
			input: "src",
			output: "public",
		},
		markdownTemplateEngine: "njk",
		pathPrefix,
	};
};
