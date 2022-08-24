# Create workflow management from scratch

## Stage 1
Initial stage assume a workflow is just like any other API. 
So the workflow API:
- takes input and gives output
- have internal activities which are expected to run without exceptions, if any exception workflow throws an error.
- no workflow state management
- no persistence