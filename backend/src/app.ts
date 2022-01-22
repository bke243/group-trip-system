import express from "express";
import bodyParder from "body-parser";
import morgan from "morgan";
import cors from "cors";
import AccountRoutes from "./routes/AccountRoutes";
import PackageRoutes from "./routes/PackageRoutes";
import swaggerUI from "swagger-ui-express";
import LocationRoutes from "./routes/LocationRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import UsersRoutes from "./routes/UsersRoutes";
import GroupRoutes from "./routes/GroupRoutes";
import GroupUserRoutes from "./routes/GroupUserRoutes";
import MessagesRoutes from "./routes/MessagesRoutes";
import PurchaseRoutes from "./routes/PurchaseRoutes";
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

// allow CROS information, allow specific origin addresses
app.use((req, res, next) => {
    // please add a filter to clean access endpoint
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === "OPTIONS") {
        res.header('Access-control-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({});
    }
    next();
})

app.use("/auth", AccountRoutes);
app.use("/packages", PackageRoutes);
app.use("/locations", LocationRoutes);
app.use("/admins", AdminRoutes);
app.use("/users", UsersRoutes);
app.use("/messages", MessagesRoutes);
app.use("/groups", GroupRoutes);
app.use("/groupUser", GroupUserRoutes);
app.use("/purchase", PurchaseRoutes);


// documentation demo command out to see the result
// app.use("/docs/demo", swaggerUI.serve, swaggerUI.setup(swaggerDocumentDemo));

app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

module.exports = app;
