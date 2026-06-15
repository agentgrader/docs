# Troubleshooting

Common failure modes and how to diagnose them.

## Docker and sandbox issues

**Symptom:** `Cannot connect to Docker` or sandbox creation errors.

- Confirm the Docker daemon is running (`docker ps`)
- On CI, ensure the job has Docker-in-Docker or a Docker socket
- Pull base images before large benches to avoid cold-start timeouts

**Symptom:** Leftover containers after killed runs.

```bash
agr cleanup
agr cleanup --yes
```

Containers labeled `agentgrader.sandbox=true` are removed. Set `step_timeout_ms` in agent.yaml to prevent new leftovers. See [Choosing a sandbox](/guide/sandboxes).

## API keys and providers

**Symptom:** Provider auth errors or empty model responses.

| Provider | Environment variable |
|---|---|
| Anthropic (direct) | `ANTHROPIC_API_KEY` |
| OpenAI (direct) | `OPENAI_API_KEY` |
| OpenRouter (default routing) | `OPENROUTER_API_KEY` |
| E2B sandbox | `E2B_API_KEY` |
| GitHub import | `GITHUB_TOKEN` (rate limits) |

Match `provider:` and `model:` in agent.yaml. Native model names require the matching provider.

## TAP and `fail_to_pass`

**Symptom:** RegressionScorer fails unexpectedly or `agr validate` warns about test names.

- `test_command` output must be **TAP**. Examples: `node --test --test-reporter=tap`, `pytest --tap-stream`
- Test names in `fail_to_pass` / `pass_to_pass` must match TAP lines exactly
- `agr validate` does not auto-fill these lists. Run the suite manually and copy names from output

**Symptom:** Agent passes command checks but regression fails.

```bash
agr trace <runId>
agr trace <runId> --quality
```

Check whether the agent modified forbidden paths (`forbid_modified`).

## Fixture `success:` command fails on unmodified code

A `FAIL` may mean the fixture's own `success:` command never passes on the **broken** starting state (broken pin, missing dependency), not that the agent failed.

Before spending bench budget, run the `success:` command once against the unmodified fixture in a throwaway container. Python fixtures: watch for `pip install -e ".[test]"` build-isolation pulling incompatible build tools.

See [Best Practices](/guide/best-practices#validate-a-swe-bench-fixture-s-success-command-before-trusting-fail).

## Hung or slow runs

- Tighten `assert: steps` and `timeout_seconds` in agr.yaml
- Set `step_timeout_ms` in agent.yaml so individual provider calls cannot hang forever
- Reduce `--concurrency` if the runner is CPU-bound
- Use `--verbose` on `agr run` to see where the agent stalls

## E2B vs Docker

| Issue | Docker | E2B |
|---|---|---|
| Requires local daemon | Yes | No |
| Flag | default | `--sandbox e2b` |
| Env var | (none) | `E2B_API_KEY` |
| Sandboxed MCP | `spawnStdio` via Docker | `spawnStdio` via E2B |

If E2B fails to start, verify the API key and network egress from CI.

## LLM judge unavailable

**Symptom:** `llm-judge unavailable` in trace quality output.

- Set `ANTHROPIC_API_KEY` or `OPENAI_API_KEY` matching `--llm-judge-provider`
- Without `--judge-gate`, judge failures are non-blocking
- Empty diffs skip judging (`no diff to judge`)

## Baseline comparison surprises

**Symptom:** `compare-baseline --current` shows unexpected regressions.

- Ensure the PR bench used the same suite and configs as the saved baseline
- `--current` compares recent DB runs to baseline entry count. Run bench on the PR branch first
- Use two explicit snapshot files for reproducible comparisons:

```bash
agr compare-baseline baselines/main.json baselines/pr.json
```

## Still stuck?

1. `agr trace <runId> --quality`: scorer breakdown
2. `agr compare <idA> <idB> --only-diff`: divergent steps
3. [Debugging failed runs](/guide/debugging)
4. [GitHub issues](https://github.com/agentgrader/agr/issues)
