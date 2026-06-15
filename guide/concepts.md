# Core Concepts

Agentgrader evaluates coding agents against **test cases** in isolated sandboxes. This page explains the main building blocks and how they fit together.

## Test case vs. agent config vs. run

| Concept | File | Purpose |
|---|---|---|
| **Test case** | `agr.yaml` + `fixture/` | Defines the problem: starting codebase, prompt, and success criteria |
| **Agent config** | `agent.yaml` (any path) | Defines the agent: model, temperature, system prompt, toolkits |
| **Run** | `agr run <agr.yaml>` | One agent attempting one test case |
| **Benchmark** | `agr bench --suite … --configs …` | Every test case in a suite × every agent config |
| **Matrix benchmark** | `agr bench --suite … --matrix …` | Agent configs generated from an optimizer matrix YAML |
| **Manifest benchmark** | `agr bench --manifest bench.yaml` | Suite + agent paths/glob in one manifest YAML |

A **test case** is self-contained: an `agr.yaml` manifest and a `fixture/` directory with the starting code. You can version-control a folder per test case.

An **agent config** is reusable across many test cases. Pass it to `agr run` with `--config`, embed it in `agr.yaml` via `agent_config`, to `agr bench` with `--configs` / `--configs-dir`, or list paths/globs in a [bench manifest](/reference/bench-manifest-yaml).

A **run** executes exactly one test case with one agent config. Results are written to the local database. See [Run history & export](/guide/persistence).

A **benchmark** runs the Cartesian product of all test cases in a `--suite` directory against all listed agent configs. An interactive terminal dashboard shows progress.

A **matrix benchmark** expands a [matrix YAML](/reference/matrix-yaml), tags every resulting run with a shared `matrixId`, and prints a Pareto summary. Details: [Optimizer matrices](/guide/optimizer-matrices).

## The test case (`agr.yaml`)

A test case is the specific challenge you give an agent. It lives in a folder with an `agr.yaml` file and a `fixture/` directory containing the starting codebase.

```yaml
name: fix-greeting
description: greet() is missing the exclamation mark
fixture: ./fixture
prompt: |
  The greet() function in src/greet.js should return "Hello, World!" but
  currently returns "Hello, World". Fix the function so all tests pass.
success:
  - run: npm test
    expect: { exit_code: 0 }
  - assert: steps <= 10
  - assert: cost_usd <= 0.05
timeout_seconds: 300
```

### Success criteria

- **`run` + `expect.exit_code`**: runs a shell command in the sandbox and checks the exit code.
- **`assert: steps <= N`**: limits how many tool calls the agent may use.
- **`assert: cost_usd <= N`**: limits total model cost for the run.

See [Test Case YAML](/reference/test-case-yaml) for SWE-bench fields (`test_command`, `fail_to_pass`, `pass_to_pass`, `rubrics`, etc.).

## Agent config (`agent.yaml`)

The agent config selects the model and behavior:

```yaml
name: Baseline Agent
model: openai/gpt-4o-mini
max_steps: 15
temperature: 0.2
system_prompt: |
  You are a professional software developer. Solve the coding task in the sandbox.
  Use executeCommand to run tests. Use readFile and writeFile to edit code.
  Call submit when all tests pass.
```

By default, requests route through OpenRouter. Set `provider: openai` or `provider: anthropic` for direct API access with native model names.

Custom tools and MCP integrations are configured in YAML. See [Agent Config YAML](/reference/agent-config-yaml) for `toolkits`, `mcp_servers`, `tools`, and adoption-tracking fields.

## The sandbox

For every run, Agentgrader provisions a fresh isolated environment. The fixture is copied to `/app`. Docker is the default provider; E2B and custom providers are supported.

See [Choosing a sandbox](/guide/sandboxes) for provider comparison and built-in agent tools.

## Scoring

Pass/fail scorers verify command output, assertions, regressions, and optional gold patches. Quality scorers annotate diff size, lint, and optional LLM judge scores without blocking unless `--judge-gate` is set.

See [Scoring & quality](/guide/scoring) for the full scorer list and CLI flags.

## Persistence & export

Runs, traces, and configs accumulate in `.agr/db.sqlite`. Export rows or OTLP traces, save baseline snapshots, and compare PR results.

See [Run history & export](/guide/persistence).

## Deep dives

| Topic | Guide |
|---|---|
| Hyperparameter sweeps | [Optimizer matrices](/guide/optimizer-matrices) |
| Custom CLI tools | [Toolkits guide](/guide/toolkits) |
| CI gates & baselines | [CI workflows](/guide/ci-workflows) |
| Failed run diagnosis | [Debugging failed runs](/guide/debugging) |
| Copy-paste patterns | [Recipes](/guide/recipes) |
