export enum WorkflowExecutionState {
    PENDING = "PENDING",
    STARTED = "STARTED",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
}

export interface WorkflowInfo {
    id: string;
    input: string;
    output?: string;
    state: WorkflowExecutionState,
    createdAt: number;
    startedAt?: number;
    finishedAt?: number;
}