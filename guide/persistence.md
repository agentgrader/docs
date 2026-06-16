# Run history & export

Every `agr run` and `agr bench` writes to a local SQLite database. Use it for debugging, baselines, and downstream analytics.

## Database location

**`.agr/db.sqlite`** is created in the directory where you invoke `agr`. History accumulates across sessions until you delete the file.

| Table | Contents |
|---|---|
| `runs` | Pass/fail, cost, duration, metrics JSON, `matrixId`, status |
| `traces` | Per-step events (tool calls, messages, token counts) |
| `test_cases` / `agent_configs` | Definitions seen during runs |

Test case folders on disk are never modified; only the sandbox copy inside the container changes.

## Inspect runs

```bash
agr list
# Most recent run (no ID needed)
agr trace --last
agr trace --last --quality
agr trace --last --tools
# By run ID
agr trace <runId>
agr trace <runId> --quality
agr compare <runIdA> <runIdB> --only-diff
```

Run IDs appear in bench/run output and in `agr list`.

## Baseline snapshots

Save a snapshot after a bench on `main`:

```bash
agr bench --suite tasks/ --config agent.yaml --save-baseline baselines/main.json
```

Compare a PR bench against it:

```bash
agr compare-baseline --current baselines/main.json --format md --output comment.md
agr compare-baseline --current baselines/main.json --fail-on-regression
```

See [CI Integration](/advanced/ci-integration#baseline-comparison-in-pull-requests) for GitHub Actions patterns.

## Export for analytics

```bash
agr export runs --format jsonl --output runs.jsonl
agr export runs --matrix-id <matrixId> --format json --output matrix-runs.json
agr export traces --run-id <runId> --format otlp --output trace.json
```

Set `AGR_EXPORT_ON_BENCH=true` to auto-write run JSON under `.agr/exports/` after each bench.

## Start fresh

Delete `.agr/db.sqlite` to reset history. Keep `.agr/` in `.gitignore` alongside `.env`.
