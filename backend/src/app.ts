import express from "express";
import bodyParder from "body-parser";
import morgan from "morgan";
import cors from "cors";
import AccountRoutes from "./routes/AccountRoutes";
import PackageRoutes from "./routes/PackageRoutes";

const app = express();

// log requests
app.use(morgan('combined'))

app.use(cors({
    origin: ['*'],
}));

// parse all the request body
app.use(bodyParder.json());

app.use("/auth", AccountRoutes);
app.use("/packages", PackageRoutes);

module.exports = app;
