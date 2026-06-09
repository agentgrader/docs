# CLI Reference

The command line tool for this project is simply called `crucible`. You can easily install it globally by running `npm install -g @crucible-agr/cli`.

## `crucible bench`

This command runs a complete benchmark. It evaluates all of your specified test cases against every agent configuration you provide. It also supports running these tests in parallel to save time. While it runs, you will see a live interactive dashboard right in your terminal to keep track of the progress.

```bash
crucible bench \
  --suite examples/suites/typescript-bugs/ \
  --configs examples/configs/baseline.yaml \
  --concurrency 2
```

### Available Options

| Flag | Default | Description |
|---|---|---|
| `--suite` | Required | The path pointing to a directory filled with test case folders. |
| `--configs` | Required | A comma separated list of paths to your agent configuration YAML files. |
| `--concurrency` | `2` | Determines how many benchmark runs should execute at the same time. |

## `crucible run`

If you want to run just a single test case, this is the command to use. It is especially helpful when you are debugging specific tests or actively developing new agents.

```bash
crucible run examples/suites/typescript-bugs/add-error-handling/crucible.yaml \
  --config examples/configs/baseline.yaml
```

### Available Options

| Flag | Default | Description |
|---|---|---|
| (positional) | Required | The exact path to a specific `crucible.yaml` test case file. |
| `--config` | Optional | The path to your agent config YAML. If you leave this out, it defaults to using `gpt-4o-mini` with a maximum of 20 steps. |
