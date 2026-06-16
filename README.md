# Agentgrader Documentation

Documentation site for [Agentgrader](https://github.com/agentgrader/agr), the open-source coding agent optimizer. Built with [VitePress](https://vitepress.dev/).

## Local development

::: code-group

```bash [bun]
bun install
bun run docs:dev
```

```bash [npm]
npm install
npm run docs:dev
```

:::

Open `http://localhost:5173/agr-docs/` (base path is configured for GitHub Pages).

## Build and preview

```bash
bun run docs:build
bun run docs:preview
```

## Deploy

Pushes to `main` deploy automatically via GitHub Actions (`.github/workflows/deploy.yml`) to GitHub Pages at `/agr-docs/`.

## Features

- Interactive Mermaid diagrams with zoom, pan, and fullscreen (`vitepress-mermaid-viewer`)
- Code blocks with line numbers and copy button (VitePress built-in)
- npm / Bun install tabs via code groups
- Local search, edit links, and last-updated timestamps
