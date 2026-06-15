# Optimizer Matrix (`matrix.yaml`)

An optimizer matrix describes a **cartesian product** of agent hyperparameters. Pass it to `agr bench --matrix` instead of listing agent YAML files.

Paths in the matrix file are resolved relative to the matrix file location (for `toolkits` dimension values).

## Minimal example

```yaml
name: model-comparison
base:
  max_steps: 15
  temperature: 0.2
dimensions:
  model:
    - anthropic/claude-sonnet-4
    - openai/gpt-4o-mini
  temperature:
    - 0.2
    - 0.7
```

```bash
agr bench --matrix matrix.yaml --suite ./test-cases
```

Produces four expanded configs. Every run shares one `matrixId`.

## Schema reference

### `name`

**Type:** `string` (required)

Prefix for generated agent config `id` and `name` fields (slugified with dimension values).

Example ids: `model-comparison-claude-sonnet-4-0-2`, `toolkits-none`, `toolkits-toolkits-jetbrains-tools`.

### `base`

**Type:** `object` (optional, default `{}`)

Shared agent config fields applied to every combination before per-dimension overrides:

| Field | Type | Description |
|---|---|---|
| `model` | `string` | Default model slug |
| `provider` | `string` | API gateway: `openrouter`, `openai`, `anthropic` |
| `max_steps` | `number` | Max agent steps (default 30 when omitted) |
| `step_timeout_ms` | `number` | Per-step timeout (default 120000) |
| `temperature` | `number` | Sampling temperature |
| `system_prompt` | `string` | System prompt shared across combos |
| `tools` | `string[]` | Tool allowlist |
| `toolkits` | `string[]` | Default toolkit paths |
| `require_tools_before_submit` | `string[]` | Required tools before submit |
| `track_tools` | `string[]` | Optional tools to track in metrics |

Set `provider` in `base` when every combo uses the same gateway. Vary `model` and `provider` together only when the cartesian product is intentional.

### `dimensions`

**Type:** `object` (required)

Each **non-empty array** becomes one axis of the cartesian product. Axes omitted or empty are not varied; values fall back to `base`.

| Field | Type | Description |
|---|---|---|
| `model` | `string[]` | Models to sweep |
| `provider` | `string[]` | Providers to sweep |
| `temperature` | `number[]` | Temperature values |
| `system_prompt` | `string[]` | Prompt variants |
| `max_steps` | `number[]` | Step limits |
| `step_timeout_ms` | `number[]` | Step timeouts |
| `toolkits` | `string[][]` | Toolkit path lists (each element is a `toolkits:` value) |

At least one dimension array must be non-empty.

### Toolkit dimension example

```yaml
name: toolkits
base:
  model: claude-haiku-4-5-20251001
  provider: anthropic
  track_tools: ["run-tests"]
dimensions:
  toolkits:
    - []
    - ["./toolkits/jetbrains-tools"]
```

## Relationship to bench manifest

| File | Purpose |
|---|---|
| `bench.yaml` | Suite path + explicit agent config paths/globs |
| `matrix.yaml` | Generate agent configs from hyperparameter product |

You cannot combine `--matrix` with `--configs` or `--manifest` in one invocation.

## See also

- [Optimizer matrices](/guide/optimizer-matrices): when to use matrices vs agent directories
- [Agent Config YAML](/reference/agent-config-yaml): full agent field reference
- [CLI: agr bench](/reference/cli#agr-bench)
