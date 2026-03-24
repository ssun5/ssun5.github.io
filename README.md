# Portfolio site

Static portfolio built with [Eleventy](https://www.11ty.dev/), PostCSS, and Tailwind CSS.

## Requirements

- Node.js 20+ (matches CI)

## Local development

```bash
npm ci
npm run dev
```

This runs PostCSS in watch mode and Eleventy’s dev server. The site assumes it is served from the domain root (`BASE_PATH` unset).

## Production build

```bash
npm run build
```

Output is written to `public/` (ignored by git). An empty `.nojekyll` file is added there so GitHub Pages does not process the site with Jekyll.

### Testing a GitHub Pages project URL locally

Project sites are served under `https://<user>.github.io/<repository>/`. To match that layout:

```bash
BASE_PATH=/<your-repo-name>/ npm run build
```

Serve `public/` with any static file server and open the equivalent path (for example `/your-repo/index.html` or the server’s mapped URL).

## Deploying on GitHub Pages

1. Push this repository to GitHub (default branch `main`, or change the branch in [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml)).
2. In the repo **Settings → Pages**, set **Build and deployment** source to **GitHub Actions**.
3. The **Deploy to GitHub Pages** workflow builds with `BASE_PATH` set to `/<repository-name>/` and publishes the `public/` folder.

If you later use a `username.github.io` repository served from the site root, set `BASE_PATH=/` in the workflow build step instead.

## Font Awesome

The layout loads a Font Awesome kit from their CDN. In your [Font Awesome kit settings](https://fontawesome.com/kits), add your GitHub Pages hostname (for example `*.github.io`) so icons load in production.

## License

See [LICENSE](LICENSE).
