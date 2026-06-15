# Optimizer matrices

An **optimizer matrix** expands a YAML file into many agent configs via a cartesian product, then runs the full test suite against each combination. Every run shares a `matrixId` for filtering and export.

## When to use a matrix vs agent files

| Approach | Use when |
|---|---|
| **`--matrix matrix.yaml`** | Hyperparameter sweeps: model × temperature × toolkit path |
| **`--configs-dir` / `--manifest`** | Each agent is a fully defined architecture in its own YAML |
| **Single `--config`** | Quick iteration on one agent |

See [Bench Manifest YAML](/reference/bench-manifest-yaml) for manifest-based benches. Schema details: [Optimizer Matrix YAML](/reference/matrix-yaml).

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
agr bench --matrix matrix.yaml --suite tasks/
```

This produces four configs (`2 models × 2 temperatures`), runs every test case against each, tags runs with one `matrixId`, and prints a Pareto-marked summary table.

## Organizing many agent configs without a matrix

When each agent is a distinct architecture (different prompts, toolkits, adapters), prefer one YAML per agent:

```
my-benchmark/
  bench.yaml
  agents-configs/
    claude-debugger.yaml
    gpt-fast.yaml
  tasks/
    ...
```

Load them three ways:

```bash
agr bench --manifest bench.yaml
agr bench --suite tasks/ --configs-dir agents-configs/
agr bench --suite tasks/ --configs agents-configs/a.yaml,agents-configs/b.yaml
```

## Toolkit A/B with `--matrix`

Vary `dimensions.toolkits` to compare runs with and without a toolkit directory:

```yaml
name: toolkits
base:
  model: claude-haiku-4-5-20251001
  provider: anthropic
dimensions:
  toolkits:
    - []
    - ["./toolkits/jetbrains-tools"]
```

If `base.system_prompt` lists tools that only exist in the toolkit arm, add a fallback note for the no-toolkit arm so agents do not waste steps on `command not found`. See [Toolkits guide](/guide/toolkits#a-b-testing-a-toolkits-dimension-with-matrix).

## Compare adapters in one bench

```bash
agr bench \
  --suite tasks/ \
  --configs agent.yaml,agents-configs/agent-acp-claude.yaml \
  --adapters ai-sdk,acp
```

See [ACP Agent Adapter](/advanced/acp-agent) for ACP-specific config fields.
