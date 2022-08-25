# Workflow management from scratch

## Stage 1
Initial stage assume a workflow is just like any other API. 
Goal:
- takes input and gives output
- have internal activities which are expected to run without exceptions, if any exception workflow throws an error.
- no workflow state management
- no persistence

## Stage 2
Make the workflow state persistent and uniquely identifiable. 
Manage the state of workflow through state to understand success, failure or other states.

**Goal:**
- Workflow execution should be uniquely identifiable
- Should have persistence so that outcome can be retrieved even after execution
- Async execution of workflow, identifier is returned immediately 
- Execution status maintained: PENDING, STARTED, COMPLETED, FAILED

**Limitations:**
- The workflow is still tightly coupled to the API call
- Workflow information is stored once execution is done
- The workflow manager manages state but no intervention can be done.
- The workflow result will give you final state
- No retries
- Workflow manager is a service and not independent workable and deployable module
- Workflow manager may not have any relevance other than running and managing the workflow state. 