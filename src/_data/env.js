/**
 * Set GOOGLE_ANALYTICS_ID (e.g. G-XXXXXXXXXX) in your host’s environment for production.
 * The snippet is only included when NODE_ENV=production and the ID is set.
 */
module.exports = {
	isProduction: process.env.NODE_ENV === "production",
	googleAnalyticsId: (process.env.GOOGLE_ANALYTICS_ID || "").trim(),
};
