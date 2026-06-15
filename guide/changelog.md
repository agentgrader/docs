# Changelog & migration

Release notes and breaking changes are published on GitHub:

- [agentgrader/agr releases](https://github.com/agentgrader/agr/releases)
- [npm `agentgrader` versions](https://www.npmjs.com/package/agentgrader?activeTab=versions)

## Recent CLI additions

If you are upgrading an older install, these flags and commands may be new:

| Feature | CLI surface |
|---|---|
| CI exit gates | `--fail-on-failure`, `--min-solve-rate`, `--min-solve-rate-scope` |
| Bench reports | `--report`, `--output`, `--report-include-traces` |
| Baselines | `agr bench --save-baseline`, `agr compare-baseline` |
| Cloud sandboxes | `--sandbox e2b` (requires `E2B_API_KEY`) |
| Toolkit audit | `agr validate-toolkit`, `--audit-toolkits`, `--strict-toolkits` |
| Export | `agr export runs\|traces`, `AGR_EXPORT_ON_BENCH` |
| LLM judge | `--llm-judge`, `--judge-gate`, `--judge-min-score`, `rubrics:` in agr.yaml |

Full reference: [CLI](/reference/cli).

## Migration notes

**CI pipelines**: Add `--fail-on-failure` if your workflow assumed non-zero exit codes on agent failure. Previously `agr run`/`agr bench` exited `0` after a completed run regardless of pass/fail.

**ACP sandboxed MCP**: Stdio servers with `sandboxed: true` are rewritten to `agr-mcp-proxy` when the sandbox exposes `sandboxBridgeId`. See [ACP Agent Adapter](/advanced/acp-agent#sandboxed-true-for-acp-agents-via-agr-mcp-proxy).

**Docs submodule**: This site lives in [agentgrader/agr-docs](https://github.com/agentgrader/agr-docs). Report doc issues there or via edit links on each page.
