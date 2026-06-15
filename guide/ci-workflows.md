# CI workflows

Patterns for running Agentgrader in pull-request and nightly pipelines.

## Validate before you benchmark

Agent runs are slow and cost money. Gate incomplete definitions first:

```bash
agr validate tasks/fix-greeting/agr.yaml --strict
agr validate tasks/fix-greeting/agr.yaml --audit-toolkits
```

`--strict` fails when SWE-bench fields (`test_command`, `fail_to_pass`, `pass_to_pass`) are missing. `--audit-toolkits` runs the security audit on referenced toolkit directories.

## Exit codes for CI gates

By default `agr run` and `agr bench` exit `0` even when the agent fails scoring. Use explicit gates:

```bash
agr run tasks/foo/agr.yaml --config agent.yaml --fail-on-failure
agr bench --suite tasks/ --config agent.yaml \
  --fail-on-failure \
  --min-solve-rate 0.8 \
  --strict-toolkits
```

| Flag | Effect |
|---|---|
| `--fail-on-failure` | Exit 1 if any run does not pass |
| `--min-solve-rate` | Exit 1 if solve rate is below threshold |
| `--min-solve-rate-scope per-config` | Apply solve-rate gate per agent config |
| `--strict-toolkits` | Exit 1 if a referenced toolkit fails security audit |

## Report artifacts

```bash
agr bench --suite tasks/ --config agent.yaml \
  --fail-on-failure \
  --report json \
  --output reports/bench.json
```

Formats: `json`, `jsonl`, `html`, `md`. Add `--report-include-traces` for full step traces (large files).

## Baseline comparison on pull requests

On `main`:

```bash
agr bench --suite tasks/ --config agent.yaml --save-baseline baselines/main.json
```

On a PR branch (after bench):

```bash
agr compare-baseline --current baselines/main.json \
  --format md \
  --output comment.md \
  --fail-on-regression
```

Post `comment.md` as a PR comment. See [Run history & export](/guide/persistence#baseline-snapshots).

## Runner checklist

- Install with `npm install -g agentgrader` or `bun add -g agentgrader`
- Store API keys in encrypted CI secrets, not in the repo
- Cap parallelism with `--concurrency` to match runner CPU and Docker limits
- Gate expensive suites behind labels or scheduled workflows
- Pull Docker base images before large benches

Full GitHub Actions example: [CI Integration](/advanced/ci-integration).
