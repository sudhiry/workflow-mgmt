import {Router, Request, Response} from "express";
import logger from "../logger";
import * as wf from "../workflow/WorkflowOne";

const api = Router();

api.post("/", async (req: Request, res: Response) => {
    try {
        const {input} = req.body;
        const outcome = await wf.WorkflowOne(input);
        res.status(200).json(outcome);
    } catch (err: any) {
        logger.info(err, "Error in running workflow!");
        res.status(500).send({});
    }
})

export default api;