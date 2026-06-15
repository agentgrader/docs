import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress'
import { withMermaid } from 'vitepress-mermaid-viewer'

const guideSidebar: DefaultTheme.SidebarItem[] = [
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
    text: 'Workflows',
    collapsed: false,
    items: [
      { text: 'Choosing a sandbox', link: '/guide/sandboxes' },
      { text: 'Scoring & quality', link: '/guide/scoring' },
      { text: 'Optimizer matrices', link: '/guide/optimizer-matrices' },
      { text: 'Run history & export', link: '/guide/persistence' },
      { text: 'CI workflows', link: '/guide/ci-workflows' },
      { text: 'Debugging failed runs', link: '/guide/debugging' },
    ],
  },
  {
    text: 'Toolkits',
    collapsed: false,
    items: [{ text: 'Toolkits guide', link: '/guide/toolkits' }],
  },
  {
    text: 'Cookbook',
    collapsed: false,
    items: [
      { text: 'Recipes', link: '/guide/recipes' },
      { text: 'Troubleshooting', link: '/guide/troubleshooting' },
      { text: 'Changelog', link: '/guide/changelog' },
    ],
  },
]

const referenceSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: 'CLI',
    collapsed: false,
    items: [
      { text: 'Overview', link: '/reference/cli' },
      {
        text: 'Run & debug',
        collapsed: false,
        items: [
          { text: 'agr init', link: '/reference/cli#agr-init' },
          { text: 'agr run', link: '/reference/cli#agr-run' },
          { text: 'agr trace', link: '/reference/cli#agr-trace' },
          { text: 'agr list', link: '/reference/cli#agr-list' },
          { text: 'agr compare', link: '/reference/cli#agr-compare' },
        ],
      },
      {
        text: 'Benchmark & CI',
        collapsed: false,
        items: [
          { text: 'agr bench', link: '/reference/cli#agr-bench' },
          { text: 'agr compare-baseline', link: '/reference/cli#agr-compare-baseline' },
          { text: 'agr export', link: '/reference/cli#agr-export' },
        ],
      },
      {
        text: 'Test cases & toolkits',
        collapsed: false,
        items: [
          { text: 'agr validate', link: '/reference/cli#agr-validate' },
          { text: 'agr validate-toolkit', link: '/reference/cli#agr-validate-toolkit' },
          { text: 'agr import-pr', link: '/reference/cli#agr-import-pr' },
        ],
      },
      {
        text: 'Maintenance',
        collapsed: true,
        items: [{ text: 'agr cleanup', link: '/reference/cli#agr-cleanup' }],
      },
    ],
  },
  {
    text: 'Schemas',
    collapsed: false,
    items: [
      { text: 'Test Case (agr.yaml)', link: '/reference/test-case-yaml' },
      { text: 'Agent Config (agent.yaml)', link: '/reference/agent-config-yaml' },
      { text: 'Bench Manifest (bench.yaml)', link: '/reference/bench-manifest-yaml' },
      { text: 'Optimizer Matrix (matrix.yaml)', link: '/reference/matrix-yaml' },
      { text: 'Packages', link: '/reference/packages' },
    ],
  },
]

const advancedSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: 'Programmatic API',
    collapsed: false,
    items: [{ text: 'Programmatic API', link: '/advanced/programmatic-api' }],
  },
  {
    text: 'Integrations',
    collapsed: false,
    items: [
      { text: 'ACP Agent Adapter', link: '/advanced/acp-agent' },
      { text: 'Custom Agent Adapter', link: '/advanced/custom-adapter' },
    ],
  },
  {
    text: 'Infrastructure',
    collapsed: true,
    items: [{ text: 'Custom Sandbox Provider', link: '/advanced/custom-sandbox' }],
  },
  {
    text: 'Operations',
    collapsed: false,
    items: [
      { text: 'CI Integration', link: '/advanced/ci-integration' },
      { text: 'Changelog', link: '/guide/changelog' },
    ],
  },
]

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
    sidebar: {
      '/guide/': guideSidebar,
      '/reference/': referenceSidebar,
      '/advanced/': advancedSidebar,
    },
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
