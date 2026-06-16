# Scoring & quality

Agentgrader separates **pass/fail scorers** (block the run) from **quality scorers** (annotate metrics only).

## Pass/fail scorers

Core scorers determine whether a run passes:

| Scorer | When it runs | What it checks |
|---|---|---|
| **CommandScorer** | Always | Each `success` `run:` criterion and its `expect.exit_code` |
| **AssertionScorer** | Always | `assert:` limits (`steps`, `cost_usd`, `tokens_in`, `tokens_out`) |
| **RegressionScorer** | When `test_command` is set | Per-test TAP outcomes (`fail_to_pass`, `pass_to_pass`) and `forbid_modified` |
| **DiffScorer** | When `solution` is set | Agent diff vs gold patch size |
| **LocalizationScorer** | When `expected_files` is set | File-level precision/recall vs expected touch set |

Define success criteria in [Test Case YAML](/reference/test-case-yaml). SWE-bench-style regression fields require TAP output from `test_command`.

## Quality scorers (additive)

`agr bench` always runs **StaticQualityScorer**. **LlmJudgeScorer** is opt-in via `--llm-judge`. Neither changes `passed` unless you also pass `--judge-gate`.

| Scorer | Package | Metrics key | Default |
|---|---|---|---|
| **StaticQualityScorer** | `@agentgrader/scorer-static` | `metrics["static-quality"]` | Always on in bench |
| **LlmJudgeScorer** | `@agentgrader/scorer-llm-judge` | `metrics["llm-judge"]` | Off unless `--llm-judge` |

Static quality tracks diff size, files touched, TODO markers, and lint violations. The LLM judge rates patch quality; per-test-case [`rubrics:`](/reference/test-case-yaml#rubrics) add weighted dimensions.

### Enable LLM judge on the CLI

```bash
agr bench --suite tasks/ --config agent.yaml --llm-judge --judge-gate --judge-min-score 0.75
agr run my-case --config agent.yaml --llm-judge --llm-judge-provider openai
```

### Inspect metrics

```bash
agr trace --last --quality
# or by run ID:
agr trace <runId> --quality
```

Matrix bench summaries aggregate `llmJudgeScore` into per-config averages when every run recorded judge metrics. See [Optimizer matrices](/guide/optimizer-matrices).

## Budget guardrails

Combine command checks with `assert:` criteria so runaway agents fail fast:

```yaml
success:
  - run: npm test
    expect: { exit_code: 0 }
  - assert: steps <= 15
  - assert: cost_usd <= 0.10
```

See [Best Practices](/guide/best-practices#set-budget-guardrails-in-yaml) for tuning guidance.
