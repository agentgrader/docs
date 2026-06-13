import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-mermaid-viewer'

export default withMermaid(defineConfig({
  base: '/agr-docs/',
  title: 'Agentgrader',
  description: 'Open-source framework for benchmarking AI coding agents on real tasks.',
  head: [
    ['link', { rel: 'icon', href: '/LGO.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'theme-color', content: '#111111' }],
  ],
  lastUpdated: true,
  cleanUrls: true,
  mermaid: {
    theme: 'neutral',
    themeVariables: {
      fontFamily: 'var(--vp-font-family-base)',
      fontSize: '14px',
    },
  },
  mermaidPlugin: {
    class: 'mermaid',
    download: true,
    downloadPng: true,
  },
  markdown: {
    lineNumbers: true,
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
  },
  themeConfig: {
    logo: '/LGO.svg',
    siteTitle: 'Agentgrader',
    nav: [
      { text: 'Guide', link: '/guide/what-is-agentgrader', activeMatch: '/guide/' },
      { text: 'Reference', link: '/reference/cli', activeMatch: '/reference/' },
      { text: 'Advanced', link: '/advanced/programmatic-api', activeMatch: '/advanced/' },
      {
        text: 'GitHub',
        link: 'https://github.com/agentgrader/agr',
      },
    ],
    sidebar: [
      {
        text: 'Getting started',
        collapsed: false,
        items: [
          { text: 'What is Agentgrader?', link: '/guide/what-is-agentgrader' },
          { text: 'Quickstart', link: '/guide/quickstart' },
          { text: 'Core Concepts', link: '/guide/concepts' },
          { text: 'Best Practices', link: '/guide/best-practices' },
        ],
      },
      {
        text: 'Reference',
        collapsed: false,
        items: [
          { text: 'CLI Reference', link: '/reference/cli' },
          { text: 'Test Case (agr.yaml)', link: '/reference/test-case-yaml' },
          { text: 'Agent Config (agent.yaml)', link: '/reference/agent-config-yaml' },
          { text: 'Bench Manifest (bench.yaml)', link: '/reference/bench-manifest-yaml' },
          { text: 'Packages', link: '/reference/packages' },
        ],
      },
      {
        text: 'Developer API',
        collapsed: false,
        items: [
          { text: 'Programmatic API', link: '/advanced/programmatic-api' },
          { text: 'ACP Agent Adapter', link: '/advanced/acp-agent' },
          { text: 'Custom Agent Adapter', link: '/advanced/custom-adapter' },
          { text: 'Custom Sandbox Provider', link: '/advanced/custom-sandbox' },
          { text: 'CI Integration', link: '/advanced/ci-integration' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/agentgrader/agr' },
    ],
    search: {
      provider: 'local',
      options: {
        detailedView: true,
      },
    },
    outline: {
      level: [2, 3],
      label: 'On this page',
    },
    docFooter: {
      prev: 'Previous',
      next: 'Next',
    },
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short',
      },
    },
    editLink: {
      pattern: 'https://github.com/agentgrader/agr-docs/edit/main/:path',
      text: 'Edit this page on GitHub',
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © Agentgrader contributors',
    },
  },
}))
