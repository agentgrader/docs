# Choosing a sandbox

Every run provisions an isolated environment, copies the fixture to `/app`, and executes agent tool calls there.

## Docker (default)

Local Docker is the default provider. No extra flag required:

```bash
agr run hello-world --config agent.yaml
agr bench --suite tasks/ --config agent.yaml
```

Requirements:

- Docker daemon running locally and on CI runners
- Sufficient CPU for `--concurrency` parallel containers
- Base images pulled ahead of large benches (cold starts can hit `timeout_seconds`)

Use [`agr cleanup`](/reference/cli#agr-cleanup) to remove leftover containers from interrupted runs. Set `step_timeout_ms` in [agent.yaml](/reference/agent-config-yaml) to reduce hung-run leftovers.

## E2B (cloud)

Use the built-in E2B provider when you do not want local Docker:

```bash
export E2B_API_KEY=...
agr run hello-world --config agent.yaml --sandbox e2b
agr bench --suite tasks/ --config agent.yaml --sandbox e2b
agr validate my-case --sandbox e2b
```

E2B supports the same fixture setup, toolkit injection, and `spawnStdio` for sandboxed MCP servers as Docker.

## Custom providers

Implement `SandboxProvider` from `@agentgrader/core` and pass your provider to `runSingle` / `runBenchmark` in custom tooling. See [Custom Sandbox Provider](/advanced/custom-sandbox).

## Built-in agent tools (all providers)

| Tool | What it does |
|---|---|
| `executeCommand(command)` | Runs a bash command in `/app` |
| `readFile(path)` | Reads a file |
| `writeFile(path, content)` | Writes a file |
| `submit({ summary })` | Signals the agent believes the task is complete |

ACP agents map filesystem and terminal operations to the same sandbox handle. See [ACP Agent Adapter](/advanced/acp-agent#tool-routing).

When the agent calls `submit()` or hits the timeout, scorers verify the result. See [Scoring & quality](/guide/scoring).
