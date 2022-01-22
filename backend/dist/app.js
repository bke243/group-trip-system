"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const AccountRoutes_1 = __importDefault(require("./routes/AccountRoutes"));
const PackageRoutes_1 = __importDefault(require("./routes/PackageRoutes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const LocationRoutes_1 = __importDefault(require("./routes/LocationRoutes"));
const AdminRoutes_1 = __importDefault(require("./routes/AdminRoutes"));
const UsersRoutes_1 = __importDefault(require("./routes/UsersRoutes"));
const GroupRoutes_1 = __importDefault(require("./routes/GroupRoutes"));
const GroupUserRoutes_1 = __importDefault(require("./routes/GroupUserRoutes"));
const MessagesRoutes_1 = __importDefault(require("./routes/MessagesRoutes"));
const PurchaseRoutes_1 = __importDefault(require("./routes/PurchaseRoutes"));
const swaggerDocumentDemo = require("../src/swagger-demo.json");
const swaggerDocument = require("../src/swagger.json");
const app = (0, express_1.default)();
// log requests
app.use((0, morgan_1.default)('combined'));
app.use((0, cors_1.default)({
    origin: ['*'],
}));
// parse all the request body
app.use(body_parser_1.default.json());
// allow CROS information, allow specific origin addresses
app.use((req, res, next) => {
    // please add a filter to clean access endpoint
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === "OPTIONS") {
        res.header('Access-control-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
app.use("/auth", AccountRoutes_1.default);
app.use("/packages", PackageRoutes_1.default);
app.use("/locations", LocationRoutes_1.default);
app.use("/admins", AdminRoutes_1.default);
app.use("/users", UsersRoutes_1.default);
app.use("/messages", MessagesRoutes_1.default);
app.use("/groups", GroupRoutes_1.default);
app.use("/groupUser", GroupUserRoutes_1.default);
app.use("/purchase", PurchaseRoutes_1.default);
// documentation demo command out to see the result
// app.use("/docs/demo", swaggerUI.serve, swaggerUI.setup(swaggerDocumentDemo));
app.use("/api/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
module.exports = app;
