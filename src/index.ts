import * as dotenv from "dotenv";
dotenv.config();
import express, {Express} from "express";
import compression from "compression";
import cors from "cors";
import pinoHttpLogger from "pino-http";
import logger from "./logger";
import api from "./api";

const app: Express = express();
app.use(compression());
app.use(cors({
    origin: "*"
}));

if(process.env.NODE_ENV === 'production') {
    app.use(pinoHttpLogger())
}

app.use('/api', api);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`Server started at port ${PORT}`)
});