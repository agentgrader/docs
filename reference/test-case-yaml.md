# Test Case (crucible.yaml)

A test case is how you define the problem you want your agent to solve. It also sets the rules for figuring out if the agent actually succeeded. Everything is defined in a simple `crucible.yaml` manifest file.

```yaml
name: add-error-handling
description: fetchWithRetry() crashes on network timeout. Please make it resilient.
fixture: ./fixture
prompt: |
  The function fetchWithRetry() in src/client.ts throws an unhandled error when
  the network times out. Add proper error handling so it retries up to 3 times
  (total of 4 attempts: 1 initial and 3 retries), then throws the error if all fail.
  Please do not change the signature of fetchWithRetry.
success:
  - run: npm install && npm test
    expect: { exit_code: 0 }
  - assert: steps <= 10
  - assert: cost_usd <= 0.05
timeout_seconds: 300
```

## Schema Reference

### `name`
**Type:** `string`  
A unique string that identifies this specific test case.

### `description`
**Type:** `string`  
A short and easy to read summary explaining what the test is about.

### `fixture`
**Type:** `string`  
This is the path to the directory that holds the base code for the task. It is relative to where the `crucible.yaml` file is located. When a test runs, the contents of this directory will be copied straight into the container sandbox.

### `prompt`
**Type:** `string`  
The specific instructions and context that will be handed over to the agent.

### `success`
**Type:** `Array<SuccessCriterion>`  
A list of specific checks to determine if the agent successfully completed the task.  

*   **Run Criteria**:
    *   `run`: A bash script to execute inside the sandbox environment.
    *   `expect`: These are your assertions on the command output, like expecting `exit_code: 0`.
*   **Assert Criteria**:
    *   `assert`: This is a mathematical or logical expression that looks at run statistics like `steps`, `cost_usd`, `tokens_in`, and `tokens_out`.

### `timeout_seconds`
**Type:** `number`  
The absolute maximum time allowed for the run, measured in seconds. If the agent does not finish its work or submit within this time limit, the run is considered a failure.
