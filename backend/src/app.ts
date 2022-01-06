import express from "express";
import bodyParder from "body-parser";
import morgan from "morgan";
import cors from "cors";
import AccountRoutes from "./routes/AccountRoutes";
import PackageRoutes from "./routes/PackageRoutes";
import swaggerUI from "swagger-ui-express";
const swaggerDocumentDemo =  require("./swagger-demo.json");
const swaggerDocument =  require("./swagger.json");


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

// documentation demo command out to see the result
// app.use("/docs/demo", swaggerUI.serve, swaggerUI.setup(swaggerDocumentDemo));

app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

module.exports = app;
