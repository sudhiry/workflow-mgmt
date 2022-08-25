import { nanoid } from "nanoid"
import {WorkflowExecutionState, WorkflowInfo} from "../models/workflow.models";
import client from "../repositories/db";

const WORKFLOW_MGMT_DB = "workflows-mgmt";
const WORKFLOW_COL = "workflows";

export function WorkflowManager(workFlowFn: Function) {
    async function executor(info: WorkflowInfo, input: any) {
        try {
            info.state = WorkflowExecutionState.STARTED;
            info.startedAt = new Date().getTime();
            const output = await workFlowFn(input);
            info.output = Buffer.from(JSON.stringify(output)).toString("base64");
            info.state = WorkflowExecutionState.COMPLETED;
        } catch (e) {
            // @ts-ignore
            info.output = Buffer.from(e.stack).toString("base64");
            info.state = WorkflowExecutionState.FAILED;
        } finally {
            info.finishedAt = new Date().getTime();
            await client.db(WORKFLOW_MGMT_DB).collection(WORKFLOW_COL).insertOne(info);
        }
    }

    async function start(input: any): Promise<string> {
        const info: WorkflowInfo = {
            id: nanoid(),
            input: Buffer.from(JSON.stringify(input)).toString("base64"),
            state: WorkflowExecutionState.PENDING,
            createdAt: new Date().getTime(),
        }
        executor(info, input);
        return info.id;
    }

    async function result(id: string): Promise<WorkflowInfo | null> {
        const res = await client.db(WORKFLOW_MGMT_DB).collection(WORKFLOW_COL).findOne<WorkflowInfo>({ id });
        // @ts-ignore
        delete res._id; // Remove mongo generated _id
        return res;
    }
    return {
        start,
        result,
    }
}