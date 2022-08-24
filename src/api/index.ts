import express, {Router} from "express";
import workflow from "./workflow";

const api = Router();
api.use(express.json());
api.use('/workflow', workflow);

export default api;