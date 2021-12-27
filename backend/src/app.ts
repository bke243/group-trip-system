import express from "express";
import AccountRoutes from "./routes/AccountRoutes";
import bodyParder from "body-parser";
import morgan from "morgan";
import cors from "cors";

const app = express();

// log requests
app.use(morgan('combined'))

app.use(cors({
    origin: ['*'],
}));

// parse all the request body
app.use(bodyParder.json());

app.use("/auth", AccountRoutes);

module.exports = app;
