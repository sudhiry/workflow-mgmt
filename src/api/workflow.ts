import {Router, Request, Response} from "express";
import logger from "../logger";
import { WorkflowManager } from "../services/workflowServices";
import {WorkflowOne} from "../workflow/WorkflowOne";

const api = Router();

api.post("/", async (req: Request, res: Response) => {
    try {
        const {input} = req.body;
        const id = await WorkflowManager(WorkflowOne).start(input);
        res.status(200).json(id);
    } catch (err: any) {
        logger.info(err, "Error in starting workflow!");
        res.status(500).send({});
    }
})

api.get("/:id", async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const workFlowInfo = await WorkflowManager(WorkflowOne).result(id);
        res.status(200).json(workFlowInfo);
    } catch (err: any) {
        logger.info(err, "Error in running workflow!");
        res.status(500).send({});
    }
})

export default api;